const config = require('./config')
const fs = require('fs')
const path = require('path')
const { db, create } = require('../db')

const basePath = path.join(config.home, config.rootPath);
const dbName = path.join(basePath, config.filename);

function createDatabase() {
    const file = fs.openSync(dbName, 'w');
                fs.closeSync(file);
}

/**
 * Is database exists
 * 
 * @returns Boolen
 */
function isDBExists() {
    return fs.existsSync(dbName)
}

/**
 * Is app directory exists
 * 
 * @returns Boolend
 */
function isAppDirExists() {
    return fs.existsSync(basePath)
}


function createAppDir() {
    return fs.mkdirSync(basePath);
}


module.exports = () => {
    if (! isAppDirExists()) {
        console.log('App directory not found creating app directory.');
        createAppDir();
    }
    
    if (! isDBExists()) {
        console.log('Database not found creating database.');
        createDatabase()
    }

    db.exec(`CREATE TABLE IF NOT EXISTS folders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar NULL,
        icon varcgar NOT NULL
    )`);

    db.exec(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        folder_id INTEGER NOT NULL,
        title varchar NULL,
        content text NULL,
        created_at datetime NOT NULL,
        updated_at datetime NOT NULL,
        FOREIGN KEY (folder_id) REFERENCES folders ON DELETE CASCADE
        )`);
    
    const folder = db.prepare('SELECT count(*) as count from folders').get();

    if (! folder.count) {
        create('folders', {
            name: 'My Notes',
            icon: 'address-book'
        })
    }
}