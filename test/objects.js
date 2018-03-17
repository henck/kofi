let assert = require("assert");
let kofi = require("../index.js");

//Testing object
let obj = {
    name: "Bob",
    age: 30,
    city: "Tokio"
};

describe("eachObj", function () {
    it("executes a function for ach pair key-value", function (done) {
        let keys = ["name", "age", "city"];
        let values = ["Bob", 30, "Tokio"];
        let j = 0;
        kofi.eachObj(obj, function (key, value) {
            assert.equal(keys[j], key);
            assert.equal(values[j], value);
            j = j + 1;;
        });
        assert.equal(j, 3);
        return done();
    });

    it("stops when a false boolean is returned", function (done) {
        let j = 0;
        kofi.eachObj(obj, function () {
            j = j + 1;
            if (j === 2) {
                return false;
            }
        });
        assert.equal(j, 2);
        return done();
    });
});

describe("keys", function () {
    it("returns all keys of an object", function (done) {
        let keys = kofi.keys(obj);
        assert.equal(keys.length, 3);
        assert.equal(keys[0], "name");
        return done();
    });
});

describe("values", function () {
    it("returns all values of an object", function (done) {
        let values = kofi.values(obj);
        assert.equal(values.length, 3);
        assert.equal(values[1], 30);
        return done();
    });
});

