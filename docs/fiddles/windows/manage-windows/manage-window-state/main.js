// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

ipcMain.on('create-demo-window', (event) => {
  const win = new BrowserWindow({ width: 400, height: 275 })

  function updateReply () {
    event.sender.send('bounds-changed', {
      size: win.getSize(),
      position: win.getPosition()
    })
  }

  win.on('resize', updateReply)
  win.on('move', updateReply)
  win.loadURL('https://electronjs.org')
})

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
