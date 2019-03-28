const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

let mainWindow;

function createWindow () {
  //mainWindow = new BrowserWindow({transparent: true, frame: false, fullscreen: true});
  mainWindow = new BrowserWindow({transparent: true, frame: false, width: 1120, height: 760});

  mainWindow.on('close', function () { win = null });

  mainWindow.loadURL(`file://${__dirname}/../main_window.html`);

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.webContents.on( 'did-finish-load', function () {
      mainWindow.show();
      mainWindow.webContents.send('volume_vale', 52);
      //mainWindow.webContents.send('obj_test', {'a1':'123', 'b1':'456'});
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  shell.beep();
  if (mainWindow === null) {
    createWindow()
  }
});

//登录窗口最小化
ipc.on('window-min',function(){
    mainWindow.minimize();
});

ipc.on('window-close',function(){
    mainWindow.close();
});
