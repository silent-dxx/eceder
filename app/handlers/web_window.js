'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const winapi = require('./../winapi/lib/winapi');

class Web_Window {
    constructor() {
        this.createWindow();
        this.initWindowEvents();
    }

    createWindow() {
        this.webFrame = new BrowserWindow({
            frame: false,
            fullscreen: true,
            show: false
        });

        this.webFrame.loadURL(`file://${__dirname}/../views/web_frame.html`);
        //this.webFrame.webContents.openDevTools();
    }

    initWindowEvents() {
        this.webFrame.on('closed', (event, arg) => {
            console.log("Events: web_window closed");
            //this.close();
            this.webFrame = null;
        });
    }

    show() {
        this.webFrame.show();
        console.log("web_window show()");
    }

    minimize() {
        this.webFrame.minimize();
    }

    close() {
        console.log("web_window close");
        this.webFrame.destroy();
        //this.webFrame.close();
    }

    hide() {
        console.log("web_window hide");
        this.webFrame.hide();
    }

    set_desktop() {
        winapi.SetDesktop();
    }
}

module.exports = Web_Window;