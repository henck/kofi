.PHONY: setup build dist test version clean clean-all publish

# Binaries folder
NODE_BIN=./node_modules/.bin

# Print help 
help: 
	@echo "Available commands"
	@echo ""
	@echo "  make build               Build bundles" 
	@echo "  make clean               Clean the bundles of this package"
	@echo "  make setup               Install all dependencies"
	@echo "  make test                Run tests"
	@echo "  male version             Display the current version"
	@echo ""

# Install all dependencies of the repository
setup:
	npm install
	rm package-lock.json

# Build bundles 
build:
	${MAKE} clean
	./node_modules/.bin/rollup -c rollup.config.js 

# Clean a package
clean: 
	rm -rf dist

# Publish the package 
publish: 
	echo "Publishing version v$(shell make version)" 
	sleep 5 
	#make build
	#git add ./packages/${PKG}/package.json 
	#git commit -m "Publish version $(shell make version PKG=${PKG}) of kofi-${PKG}" 
	#git push 
	npm publish

# Display the version of the package
version: 
	node ./scripts/version.js

# Run tests
test: 
	${MAKE} build 
	@echo "Running tests" 
	./node_modules/.bin/mocha --reporter spec 
	@echo "Tests completed" 

