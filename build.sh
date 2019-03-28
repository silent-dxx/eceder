#!/bin/bash

export npm_config_target=1.8.2

export npm_config_arch=x64

export npm_config_target_arch=x64

export npm_config_disturl=https://registry.npm.taobao.org

export npm_config_runtime=electron

export npm_config_build_from_source=true

HOME=~/.electron-gyp npm install
