const { app, BrowserWindow } = require("electron");
const path = require("path");
const { isMac } = require("./electron/platforms");
const databaseMigration = require("./electron/data/migration");
require("./electron/ipc-routes");

const isDev = process.env.IS_DEV == "true" ? true : false;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      webSecurity: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(`${path.join(__dirname, "./dist/index.html")}`);
  }

  databaseMigration();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (!isMac()) {
    app.quit();
  }
});
