#!/bn/bash
set -e

# Clean all packages in the file releasable-packages.txt
for PKG in $(cat ./releasable-packages.txt) ; do
    #echo "Cleaning package ${PKG}..."
    #rm -rf ./packages/${PKG}/.dist 
    #rm -rf ./packages/${PKG}/.bundle
    make clean ${PKG}
done

