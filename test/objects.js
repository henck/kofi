let assert = require("assert");
let kofi = require("../index.js");

//Testing object
let obj = {
    name: "Bob",
    age: 30,
    city: "Tokio"
};

describe("keys", function () {
    it("returns all keys of an object", function (done) {
        let keys = kofi.keys(obj);
        assert.equal(keys.length, 3);
        assert.equal(keys[0], "name");
        return done();
    });
});

