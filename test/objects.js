let assert = require("assert");
let kofi = require("../dist/index.js");

//Testing object
let obj = {
    name: "Bob",
    age: 30,
    city: "Tokio"
};

describe("each", function () {
    it("executes a function for ach pair key-value", function (done) {
        let keys = ["name", "age", "city"];
        let values = ["Bob", 30, "Tokio"];
        let j = 0;
        kofi.each(obj, function (key, value) {
            assert.equal(keys[j], key);
            assert.equal(values[j], value);
            j = j + 1;;
        });
        assert.equal(j, 3);
        return done();
    });

    it("stops when a false boolean is returned", function (done) {
        let j = 0;
        kofi.each(obj, function () {
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

describe("omit", function () {
    it("omits the provided keys from the object", function (done) {
        let obj = {a: 1, b: 2, c: 3};
        let newObj = kofi.omit(obj, ["b"]);
        assert.equal(obj["a"], newObj["a"]);
        assert.equal(typeof newObj["b"], "undefined");
        assert.equal(obj["c"], newObj["c"]);
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

