#!/bin/bash
set -e

# Ask the package name to build
echo "[kofi:deploy] Type the package to deploy: "
read -p "[kofi:deploy] " pkg
# check if directory exists
pkgDir="./packages/${pkg}/"
echo "[kofi:deploy] Checking if directory ${pkgDir} exists..."
if [ -d "$pkgDir" ]; then
    # Get the current package version
    pkgVersion="$(node scripts/version.js --package ${pkg})"
    # Check for an invalid version
    if ! [[ $pkgVersion =~ ^v ]]; then
        echo "[kofi:deploy] Invalid version for package ${pkg}"
        exit 1
    fi
    # Ask for confirmation
    echo "[kofi:deploy] You are going to deploy version ${pkgVersion}. Are you sure? [Y/n]"
    read -r -p "[kofi:deploy] " pkgConfirm
    if [[ $pkgConfirm =~ ^[Yy]$ ]]; then
        echo "[kofi:deploy] Copying files..."
        cp LICENSE $pkgDir/dist/
        cp $pkgDir/README.md $pkgDir/dist/
        cp $pkgDir/package.json $pkgDir/dist/
        echo "[kofi:deploy] Publishing new version..."
        cd $pkgDir/dist/ && npm publish
        echo "[kofi:deploy] Deploy finished"
    fi
fi

