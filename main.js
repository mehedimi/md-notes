const { app, BrowserWindow, protocol } = require("electron");
const path = require("path");
const { isMac } = require("./electron/platforms");
const { requestListener } = require('./electron/http-handler')
const databaseMigration = require('./electron/data/migration')

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: false,
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        },
    });

    win.loadFile("dist/index.html");

    databaseMigration()
}

app.whenReady().then(() => {
    protocol.registerHttpProtocol('md-notes', (request, callback) => {
        callback('Response');
    })

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });


});

app.on("window-all-closed", () => {
    if (! isMac()) {
        app.quit();
    }
});