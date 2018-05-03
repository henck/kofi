#!/bn/bash
set -e

# Clean all packages in the file releasable-packages.txt
for PKG in $(cat ./releasable-packages.txt) ; do
    rm -rf ./packages/${PKG}/.dist 
    rm -rf ./packages/${PKG}/.bundle
done

