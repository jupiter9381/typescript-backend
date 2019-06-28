import pool from "../middleware/Sqldb";

const config = require("config");

export default class Model {
    protected tableName = "";
    protected columnsNames: any[];
    protected id = 0;
    protected filterableColumnsNames = [];

    constructor(obj?, columnsNames?) {
        this.columnsNames = columnsNames;
        if (obj) {
            for (const key in obj) {
                if (this.columnsNames.indexOf(key) !== -1) {
                    this[key] = obj[key];

                }
            }

        }
    }


    async save() {
        const queryStr = `insert into ${this.tableName} set ${this.setFields()}`;
        return await Model.query(queryStr);
    }


    async update() {
        const queryStr = ` UPDATE ${this.tableName} SET ${this.setFields()}  WHERE id = ${this["id"]}`;
        return await Model.query(queryStr);

    }

    async delete() {
        const queryStr = ` DELETE FROM ${this.tableName} WHERE id = ${this["id"]}`;
        return await Model.query(queryStr);

    }

    async joinD(tableName) {
        const queryStr = `select * from ${tableName} where ${tableName}.${this.tableName}_id = ${this.id}`;
        return await Model.query(queryStr);
    }

    async join(tableName) {
        const queryStr = `select * from ${this.tableName} , ${tableName} where  ${this.tableName}.id  = ${tableName}.id and ${tableName}.${this.tableName}_id = ${this.id}`;
        return await Model.query(queryStr);
    }

    async joinMany(tableName, manyTableName) {

        const queryStr = `select * from ${manyTableName} left join ${tableName} on ${manyTableName}.${tableName}_id = ${tableName}.id where storeProduct.${this.tableName}_id =${this.id}`;
        return await Model.query(queryStr);
    }

    async oneJoin(tableName) {

        const queryStr = `select  ${tableName}.* from ${this.tableName} , ${tableName} where  ${this.tableName}.${tableName}_id  = ${tableName}.id and ${this.tableName}.id = ${this.id} limit 1`;
        return await Model.query(queryStr);
    }

    async belongsTo(tableName) {

        const queryStr = `select  ${tableName}.* from ${this.tableName} , ${tableName} where  ${this.tableName}.${tableName}_id  = ${tableName}.id and ${this.tableName}.${tableName}_id = ${this.id} limit 1`;
        // console.log(queryStr);
        const result = await Model.query(queryStr);
        return result[0];
    }

    static async select(fieldsNames?: Array<string>) {
        let queryStr = `select *
        from ${Model.modelInstanse(this).tableName}`;
        if (fieldsNames) {
            queryStr = `select ${fieldsNames.join(",")} from ${Model.modelInstanse(this)["tableName"]}`;
        }
        // return await Model.query(queryStr);
        const result = await Model.query(queryStr);
        return result.map(queryResult => new this(queryResult));

    }

    static async findById(id) {
        const queryStr = `select * from ${Model.modelInstanse(this).tableName} where id = ${id}`;
        const result = await Model.query(queryStr);
        return new this(result[0]);
        // return result[0];
    }

    static async filter(params) {
        const arr = [];
        for (const key in params) {
            arr.push(`${key} = '${params[key]}' `);
        }
        const whereStr = (arr.length == 1) ? "where " + arr[0] : "where " + arr.join(" and ");
        const queryStr = `select * from ${Model.modelInstanse(this).tableName} ${whereStr}`;
        const result = await Model.query(queryStr);
        return result.map(queryResult => new this(queryResult));
        // return await Model.query(queryStr);
    }

    static async filterWithIds(params) {
        const arr = [];
        for (const key in params) {
            arr.push(`${key} in (${params[key].join(",")}) `);
        }
        const whereStr = (arr.length == 1) ? "where " + arr[0] : "where " + arr.join(" and ");
        const queryStr = `select * from ${Model.modelInstanse(this).tableName} ${whereStr}`;
        const result = await Model.query(queryStr);
        return result.map(queryResult => new this(queryResult));
        // return await Model.query(queryStr);
    }

    static async lastModelId(): Promise<number> {
        const queryStr = `SELECT MAX(id) as id
        FROM  ${Model.modelInstanse(this).tableName}`;
        const result = await Model.query(queryStr);
        return result[0]["id"];
    }

    static async whereByIds(ids) {
        const queryStr = `SELECT * FROM  ${Model.modelInstanse(this).tableName} where id in (${ids.join(",")})`;
        const result = await Model.query(queryStr);
        return result.map(queryResult => new this(queryResult));
        // return await Model.query(queryStr);
    }

    /*
    * helpers
    * */
    setFields() {
        const sql = [];
        this["columnsNames"].forEach(column => {
            if (this[column]) {
                sql.push(`${column}='${this[column]}'`);
            }
        });
        return sql.toString();
    }

    static modelInstanse(model) {
        return new model();
    }

    builder() {
        const builder = {};
        this["columnsNames"].forEach(key => {
            if (this[key] && key !== "password") {
                if (key === "image" || key === "header" || key === "logo") {
                    builder[key] = `${config.get("baseUrl")}/${this[key]}`;
                } else {
                    builder[key] = this[key];
                }
            }

        });
        return builder;
    }

    static async query(queryStr: string) {
        try {
            return await pool.query(queryStr);
        } catch (err) {
            throw new Error(err);
        }

    }
}