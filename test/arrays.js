let assert = require("assert");
let kofi = require("../index.js");

describe("concat", function () {
    it("concatenates arrays", function (done) {
        let arr1 = [1, 2, 3];
        let arr2 = [4, 5, 6, 7];
        let arr3 = [8];
        let concat = kofi.concat(arr1, arr2, arr3);
        assert.equal(Array.isArray(concat), true);
        assert.equal(concat.length, 8);
        assert.equal(concat[0], 1);
        assert.equal(concat[7], 8);
        assert.equal(concat[5], 6);
        return done();
    });

    it("concatenates non-array values", function (done) {
        let v1 = true;
        let v2 = null;
        let v3 = 0;
        let v4 = [1, 2, 3];
        let concat = kofi.concat(v1, v2, v3, v4);
        assert.equal(Array.isArray(concat), true);
        assert.equal(concat.length, 6);
        assert.equal(concat[0], true);
        assert.equal(concat[3], 1);
        return done();
    });
});

describe("each", function () {
    it("calls a function with each value in the array", function (done) {
        let list = [0, 1, 2, 3];
        kofi.each(list, function (value, index) {
            assert.equal(value, list[index]);
        });
        return done();
    });

    it("stops the loop when a false value is returned", function (done) {
        let list = [0, 1, 2, 3];
        let executed = 0;
        kofi.each(list, function (value, index) {
            executed = executed + 1;
            if (index === 2) {
                return false;
            }
        });
        assert.equal(executed, 3);
        return done();
    });
});

describe("has", function () {
    it("returns true if item exists in the array", function (done) {
        let list = [0, 1, 2, 3];
        assert.equal(kofi.has(list, 3), true);
        return done();
    });
    it("returns false if item does not exists in the array", function (done) {
        let list = [0, 1, 2, 3];
        assert.equal(kofi.has(list, 4), false);
        return done();
    });
});




