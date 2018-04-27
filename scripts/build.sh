#!/bin/bash

# Ask the package name to build
echo "[kofi:build] Type the package to build: "
read -p "[kofi:build] " pkg
# check if directory exists
dir="./packages/${pkg}/"
echo "[kofi:build] Checking if directory ${dir} exists..."
if [ -d "$dir" ]; then
    # Get the current package version
    pkgVersion="$(node scripts/version.js --package ${pkg})"
    # Check for an invalid version
    if ! [[ $pkgVersion =~ ^v ]]; then
        echo "[kofi:build] Invalid version for package ${pkg}"
        exit 1
    fi
    # Ask for confirmation
    echo "[kofi:build] You are going to build version ${pkgVersion}. Are you sure? [Y/n]"
    read -r -p "[kofi:build] " pkgConfirm
    if [[ $pkgConfirm =~ ^[Yy]$ ]]; then
        echo "[kofi:build] Building..."
        # Generating bundle
        ./node_modules/.bin/rollup -c rollup.config.js --environment PKG:${pkg},VERSION:${pkgVersion} 
        # Generating minified bundle
        ./node_modules/.bin/rollup -c rollup.config.js --environment MINIFY,PKG:${pkg},VERSION:${pkgVersion}
        echo "[kofi:build] Build finished"
    fi
fi

