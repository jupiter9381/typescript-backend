/**
 * MySql pool middleware - just one instance of pool to be used.
 * Refs:
 *      https://medium.com/@matthagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
 *      https://gist.github.com/matthagemann/30cfee724d047007a031eb12b3a95a23
 */

const mysql = require("mysql");
const config = require("config");
const util = require("util");

const pool = mysql.createPool(config.get("mysql"));

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection was closed.");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connections.");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused.");
        }
    }
    if (connection) connection.release();
    return;
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

export default pool;