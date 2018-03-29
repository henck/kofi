let assert = require("assert");
let kofi = require("../dist/index.js");

describe("camelCase", function () {
    it("converts a string to camel-case format", function (done) {
        assert.equal(kofi.camelCase("hello world"), "helloWorld");
        return done();
    });

    it("keeps a string in camel-case format intact", function (done) {
        assert.equal(kofi.camelCase("helloWorld"), "helloWorld");
        return done();
    });
});

describe("capitalize", function () {
    it("capitalizes a string", function (done) {
        assert.equal(kofi.capitalize("hello world"), "Hello world");
        return done();
    });
});

describe("kebabCase", function () {
    it("converts a string to kebab-case format", function (done) {
        assert.equal(kofi.kebabCase("hello world"), "hello-world");
        return done();
    });
});

describe("repeat", function () {
    it("repeats a string a provided number of times", function (done) {
        assert.equal(kofi.repeat("x", 5), "xxxxx");
        assert.equal(kofi.repeat("abc", 3), "abcabcabc");
        return done();
    });
});

describe("snakeCase", function () {
    it("converts a string to snake-case format", function (done) {
        assert.equal(kofi.snakeCase("hello world"), "hello_world");
        return done();
    });
});

describe("uniqueId", function () {
    it("generates unique ids", function (done) {
        let ids = [];
        let j = 0;
        while (j < 100) {
            let id = kofi.uniqueId();
            assert.equal(ids.indexOf(id), -1);
            ids.push(id);
            j++
        }
        return done();
    });
});

