let assert = require("assert");
let kofi = require("../dist/index.js");

describe("camelCase", function () {
    it("converts a string to camel-case format", function (done) {
        assert.equal(kofi.camelCase("hello world"), "helloWorld");
        return done();
    });
});

describe("capitalize", function () {
    it("capitalizes a string", function (done) {
        assert.equal(kofi.capitalize("hello world"), "Hello world");
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

