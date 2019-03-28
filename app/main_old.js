http = require("http");
url = require("url");
util = require("util");

function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { } 
}

http.createServer(function(req, res) {
	res.writeHead( 200 ,{"Content-Type":"text/main"});
	var test = require('./winapi/lib/winapi');

	//var arg = url.parse(req.url).query;
    //console.log(arg.event);
    //console.log(arg.sleep);

	test.SetDesktop('hello');
	console.log(__dirname);

}).listen(3000);
console.log("HTTP server is listening at port 3000.");

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  //mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow = new BrowserWindow({frame: false, fullscreen: true});

  mainWindow.on('close', function () { win = null });

  mainWindow.loadURL(`file://${__dirname}/views/web_frame.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })
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


