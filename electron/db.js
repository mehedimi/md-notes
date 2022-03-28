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
 * @param ignore
 */
exports.create = (table, data, ignore = false) => {
    const columns = Object.keys(data).join(', ');
    const values = Object.keys(data).map((column) => {
        return '@'+column;
    }).join(', ');

    const statement = db.prepare(`INSERT ${ignore ? 'OR IGNORE': ''} INTO ${table} (${columns}) VALUES(${values})`)

    return statement.run(data)
}

/**
 * Get all rows
 * 
 * @param {String} table 
 * @param {Object} parameters
 * @returns {Database.RunResult}
 */
exports.get = (table, parameters = {}) => {
    let sql = 'SELECT ';
    let values = [];

    sql += parameters.select || '*'

    sql += ' FROM '+table;

    if (Array.isArray(parameters.where)) {
        const w = parseWhere(parameters.where)
        sql += w[0]
        values = values.concat(w[1])
    }

    if(parameters.limit) {
        sql += ' LIMIT = ?'
        values.push(parameters.limit)
    }

    if (parameters.orderBy) {
        sql += ' ORDER BY '+ parameters.orderBy;
    }
    
    return db.prepare(sql).all(...values) || [];
}

exports.find = (table, id) => {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;

    return db.prepare(sql).get(id)
}

exports.delete = (table, params = {}) => {
    let sql = 'DELETE FROM ' + table;
    let values = [];

    if (params.where) {
        const w = parseWhere(params.where)
        sql += w[0]
        values = values.concat(w[1])
    }

    return db.prepare(sql).run(...values)
}


exports.update = (table, id, data = {}) => {
    const values = [];
    const columns = [];
    Object.keys(data).forEach((column) => {
        columns.push(`${column} = ?`)
        values.push(data[column])
    })

    values.push(id)

    let sql = `UPDATE ${table} SET ${columns.join(', ')} WHERE id = ?`

    return db.prepare(sql).run(...values)
}


function parseWhere(where) {
    const values = [];

    const wheres = where.map((w) => {
        const column = w[0]
        const operator = w.length === 2 ? '=' : w[1]
        const value = w[w.length - 1]
        values.push(value)
        return `${column} ${operator} ${w[3] || '?'}`;
    })

    return [' WHERE '.concat(wheres.join(' AND ')), values]
}