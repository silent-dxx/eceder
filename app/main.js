'use strict';

const path = require('path');
const {app, ipcMain} = require('electron');

const SplashWindow   = require('./handlers/splash_winodw');
const MainWindow     = require('./handlers/main_window');
const AppTray        = require('./native/app_tray');
const Web_Window     = require('./handlers/web_window');

class Eceder {
    constructor() {
        this.mainWindow         = null;
        this.splashWindow       = null;
        this.webFrame           = null;
    }

    check_startup_mode() {
        const options = require('process').argv.splice(2);
        if (options.length == 0) {
            console.log("No start parameters.");
        } else {
            console.log("argv: " + options);
            if (options[0] == "-autorun") {
                console.log("self turn on");
            }
        }
    }

    init() {
        this.check_startup_mode();
        this.initApp();
        this.initIPC();
    }

    initApp() {
        app.on('ready', (event, arg) => {
            this.createSplashWindow();
            this.createMainWindow();
            this.createTray();
        });
    };

    initIPC() {
        // **************************************************************************
        // main window opend event
        ipcMain.on('main-window-opend', (event, arg) => {
            console.log("main-window-opend " + arg);
            if (this.splashWindow) {
                console.log("splashWindow set hide");
                this.splashWindow.hide();
            }
            if (this.mainWindow) {
                console.log("mainWindow set show");
                this.mainWindow.show();
            }
            //this.tray.showBalloon("提示", "Eceder 启动成功");
        });

        // main window min event
        ipcMain.on('main-window-min', (event, arg) => {
            this.mainWindow.minimize();
        });

        // main window close event
        ipcMain.on('main-window-close', (event, arg) => {
            this.mainWindow.close();
        });

        // **************************************************************************
        // web window opend event
        ipcMain.on('web-frame-opend', (event, arg) => {
            this.webFrame.set_desktop();
        });

        // web window show event
        ipcMain.on('web-frame-show', (event, arg) => {
            console.log("web-frame-opend " + arg);
            if (!this.webFrame) {
                this.webFrame = new Web_Window();
                this.webFrame.show();
            }
        });

        // **************************************************************************
        // close all window event
        ipcMain.on('close-all-win', (event, arg) => {
            console.log("close-all-win");
            this.webFrame.close();
            this.mainWindow.close();
            app.quit();
        });
    };

    createTray() {
        this.tray = new AppTray(this.splashWindow, this.mainWindow);
    }

    createSplashWindow() {
        this.splashWindow = new SplashWindow();
        this.splashWindow.show();
    }

    createMainWindow() {
        this.mainWindow = new MainWindow();
        //this.mainWindow.show();
    }
}

new Eceder().init();

console.log(process.execPath);
console.log(__dirname);
console.log(process.cwd());

const Common     = require('./common');
const fs		 = require('fs');

try {
    let Config = require(process.cwd() + '\\' + Common.app_config);

    console.log(process.cwd() + '\\' + Common.app_config);
    console.log(Config.workspace);


    if (Config.workspace == undefined) {
        console.log('Config No');
    } else {
        console.log('Config Yes');
    }

    console.log(Config);

    fs.exists(Config.workspace, function(exists) {
        console.log(exists ? "Yes" : "No");
    });

    const root = path.join(Config.workspace);

    readDirSync(root, 1);

    function readDirSync(path, depth) {
        var pa = fs.readdirSync(path);
        pa.forEach(function(ele, index){
            var info = fs.statSync(path + "/" + ele);
            if (info.isDirectory()) {
                //console.log("dir: " + ele);
                if (depth <= 2) {
                    readDirSync(path + "/" + ele, depth + 1);
                }
            } else {
                if (ele == 'project.json') {
                    console.log("file: " + path + "/" + ele)
                }
            }
        })
    }

    var outputFilename = process.cwd() + '\\config3.json';

    fs.writeFile(outputFilename, JSON.stringify(Config, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });

} catch (err) {
    console.log('Config: ' + err);
}

let dict = [{a: 3, b:1, c:2}];

for (let key of Object.keys(dict).sort()) {
	console.log(key, dict[key]);
}

const AppConfig     = require('./app_config');

//AppConfig.config_file_check();


const AConfig = new AppConfig(5, 5, 5);
AConfig.config_file_check();


