.PHONY: setup build dist test version clean clean-all publish

# Extract the package name
# https://stackoverflow.com/a/6273809
PKG=$(filter-out $@,$(MAKECMDGOALS))

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
	@echo "  make build                    Build"
	@echo "  make bundle <package>         Build bundles for package <package>" 
	@echo "  make clean <package>          Clean the package <package>"
	@echo "  make clean-all                Clean all releasable packages"
	@echo "  make dist <package>           Build dist for package <package>"
	@echo "  make release-major <package>  Release a new major version of <package>"
	@echo "  make release-minor <package>  Release a new minor version of <package>"
	@echo "  make release-patch <package>  Release a new patch version of <package>"
	@echo "  make setup                    Install all dependencies"
	@echo "  make test <package>           Run tests of <package>"
	@echo "  male version <package>        Display the version of <package>"
	@echo ""

# Install all dependencies of the repository
setup:
	@set -e ;\
	npm install

# Build bundles for a given package
bundle:
	@set -e ;\
	if [ "${PKG}" = "" ]; then \
		echo "ERROR: please call 'make bundle' with the package to build." ;\
		exit 1 ;\
	else \
		echo "Creating folder 'bundle' for package ${PKG}" ;\
		rm -rf ./packages/${PKG}/.bundle ;\
		mkdir -p ./packages/${PKG}/.bundle ;\
		echo "Generating bundle for package ${PKG}" ;\
		${NODE_BIN}/rollup -c rollup.config.js --environment PKG:${PKG} ;\
		echo "Generating minified bundle for package ${PKG}" ;\
		${NODE_BIN}/rollup -c rollup.config.js --environment MINIFY,PKG:${PKG} ;\
		echo "Bundle generated" ;\
	fi

# Clean a package
clean: 
	@set -e ;\
	if [ "${PKG}" = "" ]; then \
		echo "ERROR: please call 'make clean' with the package to clean." ;\
	else \
		echo "Cleaning package ${PKG}" ;\
		rm -rf ./packages/${PKG}/.dist ;\
		rm -rf ./packages/${PKG}/.bundle ;\
	fi

# Clean all releasable packages
clean-all: 
	@bash ./scripts/clean-all.sh

# Build dist for a given package
dist: 
	@set -e ;\
	if [ "${PKG}" = "" ]; then \
		echo "ERROR: please call 'make dist' with the package to build." ;\
		exit 1 ;\
	else \
		make bundle ${PKG} ;\
		echo "Creating folder 'dist' for package ${PKG}" ;\
		rm -rf ./packages/${PKG}/.dist ;\
		mkdir -p ./packages/${PKG}/.dist ;\
		echo "Copying package files" ;\
		cp ./LICENSE ./packages/${PKG}/.dist/ ;\
		cp ./packages/${PKG}/package.json ./packages/${PKG}/.dist/ ;\
		cp ./packages/${PKG}/README.md ./packages/${PKG}/.dist/ ;\
		echo "Copying bundle files" ;\
		cp ./packages/${PKG}/.bundle/*.js ./packages/${PKG}/.dist/ ;\
		echo "Generating entry file" ;\
		cat ./generators/npm.js | sed 's/{{package}}/${PKG}/g' > ./packages/${PKG}/.dist/index.js ;\
		echo "Dist folder generated" ;\
	fi

# Run tests
test: 
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make test' with the package to test." ;\
		exit 1 ;\
	else \
		make bundle ${PKG} ;\
		echo "Running tests for package ${PKG}" ;\
		cd ./packages/${PKG}/ ;\
		../../node_modules/.bin/mocha --reporter spec ;\
		cd ../../ ;\
		echo "Tests completed" ;\
	fi

# Build the package
build: 
	@set -e ;\
	node ./scripts/merge.js ;\
	echo "Entry file for package 'kofi' generated"

# Release a major version
release-major: 
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make release-major' with the package to publish" ;\
		exit 1 ;\
	else \
		node -/scripts/bump --package ${PKG} --major ;\
		make publish ${PKG} ;\
	fi

# Release a minor version
release-minor: 
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make release-minor' with the package to publish" ;\
		exit 1 ;\
	else \
		node -/scripts/bump --package ${PKG} --minor ;\
		make publish ${PKG} ;\
	fi

# Release a patch version
release-patch: 
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make release-patch' with the package to publish" ;\
		exit 1 ;\
	else \
		node -/scripts/bump --package ${PKG} --patch ;\
		make publish ${PKG} ;\
	fi

# Publish the package 
publish: 
	@set -e ;\
	if [ "${PKG}" = "" ]; then \
		echo "ERROR: please call 'make publish' with the package to publish" ;\
		exit 1; \
	else \
		echo "Publishing version v$(shell make version ${PKG}) of ${PKG}" ;\
		sleep 5 ;\
		make dist ${PKG} ;\
		git add ./packages/${PKG}/package.json ;\
		git commit -m "Publish v$(shell make version ${PKG}) of ${PKG}" ;\
		git push ;\
		cd ./packages/${PKG}/.dist ;\
		npm publish ;\
		cd ../../../ ;\
	fi

# Display the version of a package
version: 
	@set -e ;\
	if [ "${PKG}" = "" ]; then \
		echo "ERROR: please call 'make version' with the package to display the version" ;\
		exit 1 ;\
	else \
		node ./scripts/version.js --package ${PKG} ;\
	fi

# Catch any target and do nothing
dispatch:
	@:
queue:
	@:
request:
	@:
router:
	@:
utils:
	@:
.DEFAULT :
	@:

