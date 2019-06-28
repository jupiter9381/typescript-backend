export function Table<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        tableName = constructor.name.charAt(0).toLowerCase() + constructor.name.slice(1);
    };
}
export function Collection<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        collectionName = constructor.name.toLowerCase();
    };
}
export function hasMany(model: any) {
    return function (target: Object, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: async function () {
                return await this.joinD(model.charAt(0).toLowerCase() + model.slice(1));
            },
            enumerable: true,
            configurable: false
        });
    };
}
export function hasManytoMany(model: string, manyModel: string) {
    return function (target: Object, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: async function () {
                return await this.joinMany(model.charAt(0).toLowerCase() + model.slice(1), manyModel.charAt(0).toLowerCase() + manyModel.slice(1));
            },
            enumerable: true,
            configurable: false
        });
    };
}
export function belongsTo(model: string) {
    return function (target: Object, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: async function () {
                return await this.belongsTo(model.toLowerCase());
            },
            enumerable: true,
            configurable: false
        });
    };
}
export function hasOne(model: string) {
    return function (target: Object, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: async function () {
                return await this.oneJoin(model.charAt(0).toLowerCase() + model.slice(1));
            },
            enumerable: true,
            configurable: false
        });
    };
}



export function column(model: any) {
    return function (target: Object, propertyKey: string) {
        // do something with the stuff
        // columnsNames.push(propertyKey);
        // Reflect.defineMetadata("design:type", [], target, "columnsNames");
    };
//     console.log("      alda;sla;ldsm    ");
//     // const arr = [];
//     columnsNames.push(propertyKey);
//     let str = "";
//     str += propertyKey;
//     target.constructor.prototype["columnsNames"] = columnsNames;
//     // console.log(target.constructor["xx"] = "aa");
//
//     // console.log(target["columnsNames"]);
// //    // console.log(propertyKey);
// //     Object.defineProperty(target, "columnsNames", {
// //         set: function (va) {
// // console.log(va);
// //             target.columnsNames += propertyKey;
// //             // this.columnsNames.push(propertyKey);
// //         },
// //         get: function () {
// //             return  target.columnsNames;
// //            // console.log(target.constructor.toString());
// //         },
// //         enumerable: true,
// //         configurable: true
// //     });
// //     // target.columnsNames.push(propertyKey);
//     console.log(target.constructor.prototype["columnsNames"]);
//     console.log(target.constructor.prototype.toString());
//     // return target.constructor["columnsNames"];

}

export function filterable(target: any, propertyKey: string) {
    Object.defineProperty(target.constructor.prototype, "filterableColumns", {
        set: function () {
            this.filterableColumnsNames.push(propertyKey);
        },
        enumerable: true,
        configurable: true
    });
}
