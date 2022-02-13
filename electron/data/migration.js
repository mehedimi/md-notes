const config = require('./config')
const fs = require('fs')
const path = require('path')
const { db } = require('../db')

function createDatabase() {
    if (! fs.existsSync(path.join(config.home, config.rootPath))) {
        fs.mkdirSync(path.join(config.home, config.rootPath));
    }

    if (! fs.existsSync(path.join(config.home, config.rootPath, config.filename))) {

        const file = fs.openSync(path.join(config.home, config.rootPath, config.filename), 'w');
        fs.closeSync(file);
        
        db.exec(`CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title varchar NULL,
            content text NULL,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL
         )`)
    }
}

function isDBExists() {
    return fs.existsSync(path.join(config.home, config.rootPath, config.filename))
}

module.exports = () => {
    // if(isDBExists()) return;

    createDatabase()
}