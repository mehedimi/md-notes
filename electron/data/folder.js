const tables = require('./tables')
const { get } = require('../db')

module.exports = {
    get(query) {
        return get(tables.FOLDER, {
            orderBy: 'name asc'
        });
    }
}