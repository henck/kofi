.PHONY: setup build dist test version clean clean-all publish

# Extract the package name
# https://stackoverflow.com/a/6273809
#PKG=$(filter-out $@,$(MAKECMDGOALS))

# Package folders 
PKG_FOLDER=./packages/${PKG}
PKG_DIST=./packages/${PKG}/.dist
PKG_BUNDLE=./packages/${PKG}/.bundle

# Binaries folder
NODE_BIN=./node_modules/.bin

# Print help 
help: 
	@echo "Available commands"
	@echo ""
	@echo "  make bundle PKG=<package>         Build bundles for package <package>" 
	@echo "  make clean PKG=<package>          Clean the package <package>"
	@echo "  make clean-all                    Clean all releasable packages"
	@echo "  make dist PKG=<package>           Build dist for package <package>"
	@echo "  make release-major PKG=<package>  Release a new major version of <package>"
	@echo "  make release-minor PKG=<package>  Release a new minor version of <package>"
	@echo "  make release-patch PKG=<package>  Release a new patch version of <package>"
	@echo "  make setup                        Install all dependencies"
	@echo "  make test PKG=<package>           Run tests of <package>"
	@echo "  male version PKG=<package>        Display the version of <package>"
	@echo ""

# Install all dependencies of the repository
setup:
	npm install

# Build bundles for a given package
bundle:
	@echo "Creating folder 'bundle' for package ${PKG}" 
	rm -rf ${PKG_BUNDLE} 
	mkdir -p ${PKG_BUNDLE} 
	@echo "Generating bundle for package ${PKG}" 
	${NODE_BIN}/rollup -c rollup.config.js --environment PKG:${PKG} 
	@echo "Generating minified bundle for package ${PKG}" 
	${NODE_BIN}/rollup -c rollup.config.js --environment MINIFY,PKG:${PKG} 
	@echo "Bundle generated" 
	
# Clean a package
clean: 
	@echo "Cleaning package ${PKG}" 
	rm -rf ${PKG_DIST} 
	rm -rf ${PKG_BUNDLE} 

# Clean all releasable packages
clean-all: 
	@bash ./scripts/clean-all.sh

# Build dist for a given package
dist: 
	make bundle PKG=${PKG} 
	@echo "Creating folder 'dist' for package ${PKG}" 
	rm -rf ./packages/${PKG}/.dist
	mkdir -p ./packages/${PKG}/.dist 
	@echo "Copying package files" 
	cp ./LICENSE ./packages/${PKG}/.dist/ 
	cp ./packages/${PKG}/package.json ./packages/${PKG}/.dist/ 
	cp ./packages/${PKG}/README.md ./packages/${PKG}/.dist/ 
	@echo "Copying bundle files" 
	cp ./packages/${PKG}/.bundle/*.js ./packages/${PKG}/.dist/ 
	@echo "Generating entry file" 
	cat ./generators/npm.js | sed 's/{{package}}/${PKG}/g' > ./packages/${PKG}/.dist/index.js 
	@echo "Dist folder generated" 

# Run tests
test: 
	make bundle PKG=${PKG} 
	@echo "Running tests for package ${PKG}" 
	cd ./packages/${PKG}/ 
	../../node_modules/.bin/mocha --reporter spec 
	cd ../../ 
	@echo "Tests completed" 

# Release a major version
release-major: 
	node ./scripts/bump.js --package ${PKG} --major
	make publish PKG=${PKG}

# Release a minor version
release-minor: 
	node ./scripts/bump.js --package ${PKG} --minor 
	make publish PKG=${PKG} 
	
# Release a patch version
release-patch: 
	node ./scripts/bump.js --package ${PKG} --patch 
	make publish PKG=${PKG} 

# Publish the package 
publish: 
	echo "Publishing version v$(shell make version PKG=${PKG}) of kofi-${PKG}" 
	sleep 5 
	make dist PKG=${PKG}
	git add ./packages/${PKG}/package.json 
	git commit -m "Publish version $(shell make version PKG=${PKG}) of kofi-${PKG}" 
	git push 
	cd ./packages/${PKG}/.dist 
	npm publish --access public 
	cd ../../../ 

# Display the version of a package
version: 
	node ./scripts/version.js --package ${PKG} 

# Catch any target and do nothing
#%: 
#	@:
#.DEFAULT :
#	@:

