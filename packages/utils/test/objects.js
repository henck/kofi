let assert = require("assert");
let kofi = require("../.bundle/kofi-utils.js");

//Testing object
let obj = {
    name: "Bob",
    age: 30,
    city: "Tokio"
};

describe("deepClone", function () {
    it("clones an object", function (done) {
        let cloned = kofi.deepClone(obj);
        cloned.age = 25;
        assert.equal(cloned.name, obj.name);
        assert.notEqual(cloned.age, obj.age);
        return done();
    });

    it("clones recursiverly an object", function (done) {
        let obj1 = {
            "key1": "value1",
            "key2": {
                "key21": true,
                "key22": null
            },
            "key3": {
                "key31": "hello",
                "key32": [1,2,3]
            }
        };
        let obj2 = kofi.deepClone(obj1);
        assert.notEqual(obj1, obj2);
        assert.equal(obj1.key3.key32.length, obj2.key3.key32.length);
        return done();
    });
});

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

describe("extract", function () {
    it("generated a new object with only the provided keys", function (done) {
        let obj = {a: 1, b: 2, c: 3};
        let newObj = kofi.extract(obj, ["a", "c"]);
        assert.equal(newObj["a"], obj["a"]);
        assert.equal(typeof newObj["b"], "undefined");
        assert.equal(newObj["c"], obj["c"]);
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

