.PHONY: setup build dist test version

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
	@echo "  make bump-major <package>     Bump to a new major version of <package>"
	@echo "  make bump-minor <package>     Bump to a new minor version of <package>"
	@echo "  make bump-patch <package>     Bump to a new patch version of <package>"
	@echo "  make bundle <package>         Build bundles for package <package>" 
	@echo "  make dist <package>           Build dist for package <package>"
	@echo "  make release <package>        Release a new version of <package>"
	@echo "  make setup                    Install all dependencies"
	@echo "  make test <package>           Run tests of <package>"
	@echo "  male version <package>        Display the version of <package>"
	@echo ""

# Install all dependencies of the repository
setup:
	@set -e ;\
	npm install

# Bump to a major version of the provided package
bump-major:
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make bump-major' with the package to bump" ;\
		exit 1 ;\
	else \
		node ./scripts/bump.js --package ${PKG} --major ;\
		make version ${PKG} ;\
	fi

# Bump to a minor version of the provided package
bump-minor:
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make bump-minor' with the package to bump" ;\
		exit 1 ;\
	else \
		node ./scripts/bump.js --package ${PKG} --minor ;\
		make version ${PKG} ;\
	fi

# Bump to a patch version of the provided package
bump-patch:
	@set -e ;\
	if ["${PKG}" = "" ]; then \
		echo "ERROR: please call 'make bump-patch' with the package to bump" ;\
		exit 1 ;\
	else \
		node ./scripts/bump.js --package ${PKG} --patch ;\
		make version ${PKG} ;\
	fi

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
.DEFAULT :
	@:

