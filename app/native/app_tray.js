'use strict';

const {app, Menu, nativeImage, Tray} = require('electron');
const path                           = require('path');

class AppappIcon {
    constructor(splashWindow, mainWindow) {
        this.splashWindow   = splashWindow;
        this.mainWindow     = mainWindow;
        this.contextMenu    = null;
        this.createappIcon();
        this.initBalloonEvent();
    }

    createappIcon() {
        let image;
        console.log("app_tray: " + process.platform);
        if (process.platform === 'win32') {
            image = nativeImage.createFromPath(path.join(__dirname, `../../assets/app.ico`));
            this.appIconIcon = image;
        } else {
            image = nativeImage.createFromPath(path.join(__dirname, '../../assets/status_bar.png'));
        }
        image.setTemplateImage(true);

        this.appIcon = new Tray(image);
        this.appIcon.setToolTip("Eceder");

        if (process.platform === 'linux' || process.platform === 'win32') {
            this.contextMenu = Menu.buildFromTemplate([
                { label: '显示',    type: 'normal',click:() => { this.ShowMain_Window() }},
                { label: '开机启动', type: 'checkbox' ,checked:false, click:() => { this.switchStartOnBoot() }},
                { label: '退出',     type: 'normal', click:() => { this.appExit() }},
            ]);
            this.appIcon.setContextMenu(this.contextMenu);
        }
        this.appIcon.on('click', () => this.ShowMain_Window());
        this.initStartOnBoot();
    }

    initStartOnBoot () {
        if (process.platform === 'win32') { // 只在windows开启开机启动设置
            const startOnBoot = require("./startOnBoot");
            startOnBoot.getAutoStartValue("Ecder", (value, err) => {
                if (value) {
                    this.contextMenu.items[1].checked = true;
                }else{
                    this.contextMenu.items[1].checked = false;
                }
            });
        }
    }

    switchStartOnBoot () {
        if (process.platform === 'win32') {
            const startOnBoot = require("./startOnBoot");
            startOnBoot.getAutoStartValue("Ecder", function(value, err){
                if (value) {
                    startOnBoot.disableAutoStart('Ecder');
                } else {
                    startOnBoot.enableAutoStart('Ecder', process.execPath + ' -autorun');
                }
            });
        }
    }

    setTitle(title) {
        this.appIcon.setTitle(title);
    }

    ShowMain_Window() {
        this.mainWindow.show();
    }

    initBalloonEvent () {
        this.appIcon.on('balloon-show', this.onBalloonShow.bind(this));
        this.appIcon.on('balloon-click', this.onBalloonClick.bind(this));
        this.appIcon.on('balloon-closed', this.onBalloonClosed.bind(this));
    }

    // 显示 appIcon 通知
    showBalloon (title, content) {
        this.appIcon.displayBalloon({
            title: title || '',
            content: content || ''
        });
    }

    onBalloonShow () {
        console.log("onBalloonShow");
    }

    onBalloonClick () {
        console.log("onBalloonClick");
    }

    onBalloonClosed () {
        console.log("onBalloonClosed");
    }

    appExit () {
        console.log("call exit");
        //ipc.send('close-all-win');
        //app.exit(0);
        app.quit();
    }
}

module.exports = AppappIcon;
