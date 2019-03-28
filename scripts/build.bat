set PLATFORM=%1%
set ARCH=%2%
set APP_NAME=%3%

set ignore_list="build|scripts|build\.sh|binding\.gyp|\.gitignore|\.idea|.*\.md|.*\.yml"

electron-packager ./ %APP_NAME% --platform=%PLATFORM% --arch=%ARCH% --electron-version 1.8.2  --app-version 1.0.0 --asar --icon=assets\app.ico --overwrite --out=.\OutApp --ignore=%ignore_list% 
