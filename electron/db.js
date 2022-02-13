const sqlite3 = require('better-sqlite3')
const config = require('./data/config')
const path = require('path')

const database = path.join(config.home, config.rootPath, config.filename)

const db = sqlite3(database)

exports.db = db;

/**
 * Create record
 * 
 * @param {String} table 
 * @param {Object} data 
 */
exports.create = (table, data) => {
    const columns = Object.keys(data).join(', ');
    const values = Object.keys(data).map((column) => {
        return '@'+column;
    }).join(', ');

    const statement = db.prepare(`INSERT INTO ${table} (${columns}) VALUES(${values})`)

    return statement.run(data)
}

/**
 * Get all rows
 * 
 * @param {String} table 
 * @param {Object} paramiters 
 * @returns {Database.RunResult}
 */
exports.get = (table, paramiters = {}) => {
    let sql = 'SELECT ';
    const values = [];

    if(Array.isArray(typeof paramiters.columns)) {
        sql += paramiters.columns.join(', ')
    } else {
        sql += '*';
    }

    sql += ' FROM '+table;

    if(paramiters.limit) {
        sql += ' LIMIT = ?'
        values.push(paramiters.limit)
    }

    return db.prepare(sql).get(...values);
}