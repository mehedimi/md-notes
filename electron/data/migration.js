const config = require("./config");
const fs = require("fs");
const path = require("path");

const basePath = path.join(config.home, config.rootPath);
const dbName = path.join(basePath, config.filename);

function createDatabase() {
  const file = fs.openSync(dbName, "w");
  fs.closeSync(file);
}

/**
 * Is database exists
 *
 * @returns boolean
 */
function isDBExists() {
  return fs.existsSync(dbName);
}

/**
 * Is app directory exists
 *
 * @returns boolean
 */
function isAppDirExists() {
  return fs.existsSync(basePath);
}

function createAppDir() {
  return fs.mkdirSync(basePath);
}

module.exports = () => {
  if (!isAppDirExists()) {
    console.log("App directory not found creating app directory.");
    createAppDir();
  }

  if (!isDBExists()) {
    console.log("Database not found creating database.");
    createDatabase();
  }

  const { db, create } = require("../db");

  db.exec(`CREATE TABLE IF NOT EXISTS folders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name varchar NULL
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

  const folder = db.prepare("SELECT count(*) as count from folders").get();

  if (!folder.count) {
    create("folders", {
      name: "My Notes",
    });
  }

  db.exec(`
        CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR UNIQUE
        )
    `);

  db.exec(`
        CREATE TABLE IF NOT EXISTS note_tag (
        tag_id INTEGER,
        note_id INTEGER,
        PRIMARY KEY (tag_id, note_id),
        FOREIGN KEY (note_id) REFERENCES notes ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags ON DELETE CASCADE
        )
    `);
};
