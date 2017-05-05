// Modules
const { BrowserWindow } = require('electron')

// BrowserWindow instance
exports.win

// mainWindow createWindow function
exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 500,
        height: 650,
        minWidth: 350,
        maxWidth: 650,
        minHeight: 310
    })

    // Devtools 
    this.win.webContents.openDevTools()

    // Load main window content
    this.win.loadURL(`file://${__dirname}/renderer/main.html`)

    //Handle window closed
    this.win.on('closed', () => {
        this.win = null
    })
}

