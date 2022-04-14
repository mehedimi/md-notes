const {get} = require("../db");
const tables = require("./tables");

module.exports = {
    get(query) {
        const data = get(tables.TAG);
        return { data }
    }
}