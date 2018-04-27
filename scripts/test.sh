#!/bin/bash
set -e

# Ask the package name to build
echo "[kofi:test] Type the package to test: "
read -p "[kofi:test] " pkg
# check if directory exists
pkgDir="./packages/${pkg}/"
echo "[kofi:test] Checking if directory ${pkgDir} exists..."
if [ -d "$pkgDir" ]; then
    echo "[kofi:test] Running tests..."
    cd $pkgDir && ../../node_modules/.bin/mocha --reporter spec
    echo "[kofi:test] Tests finished"
fi

