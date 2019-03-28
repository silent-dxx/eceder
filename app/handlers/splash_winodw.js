'use strict';

const path = require('path');
const {BrowserWindow} = require('electron');

class SplashWindow {
    constructor() {
        this.createWindow();
        this.initWindowEvents();
    }

    createWindow() {
        this.splashWindow = new BrowserWindow({
            width: 380,
            height: 120,
            title: 'Electron',
            resizable: false,
            center: true,
            show: true,
            frame: false,
            autoHideMenuBar: true,
            alwaysOnTop: true,
            icon: 'assets/app.ico',
            titleBarStyle: 'hidden',
        });

        this.splashWindow.loadURL('file://' + path.join(__dirname, '../views/splash_window.html'));
        this.isShown = false;
    }

    initWindowEvents() {
        this.splashWindow.on('closed', (event, arg) => {
            console.log("splashWindow closed");
            this.splashWindow = null;
        });
    }

    show() {
        this.splashWindow.show();
        this.isShown = true;
        console.log('splash_windows is show')
    }

    hide() {
        this.splashWindow.hide();
        this.isShown = false;
        console.log('splash_windows is hide')
    }
}

module.exports = SplashWindow;
