'use strict';

const electron      = require('electron');
const BrowserWindow = electron.BrowserWindow;
const _package      = require("../../package.json");

function sleep(sleepTime) {
    for(var start = +new Date; new Date - start <= sleepTime; ) { }
}

class Main_Window {
    constructor() {
        this.createWindow();
        this.initWindowEvents();
    }

    createWindow() {
        this.mainWindow = new BrowserWindow({
            transparent: true,
            frame: false,
            width: 1120,
            height: 760,
            center: true,
            show: false,
            autoHideMenuBar: true,
            icon: 'assets/app.ico',
            titleBarStyle: 'hidden',
        });

        this.mainWindow.loadURL(`file://${__dirname}/../views/main_window.html`);
		// 打开调试窗口
		if (_package.env === 'dev' || _package.env === 'debug') {
			this.mainWindow.webContents.openDevTools();
		}
    }

    initWindowEvents() {
        this.mainWindow.on('closed', (event, arg) => {
            console.log("Main_Window closed");
            //this.mainWindow = null;
        });

        this.mainWindow.webContents.on( 'did-finish-load', (event, arg) => {
            this.mainWindow.webContents.send('volume_vale', 52);
            //this.mainWindow.webContents.send('obj_test', {'a1':'123', 'b1':'456'});
        });
    }

    show() {
        console.log("main_window show()");
        this.mainWindow.show();
    }

    minimize() {
        this.mainWindow.minimize();
    }

    close() {
        console.log("main_window close ...");
        this.mainWindow.hide();
        //this.mainWindow.destroy();
    }

    hide() {
        console.log("main_window hide");
        this.mainWindow.hide();
    }
}

module.exports = Main_Window;