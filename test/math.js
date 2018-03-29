let assert = require("assert");
let kofi = require("../dist/index.js");

describe("average", function() { 
    it("returns the average of the values in an array", function(done) {
        let array = [8, 2, 16, 40];
        assert.equal(kofi.average(array), 16.5);
        return done();
    });
});

describe("max", function () {
    it("returns the max value in an array", function (done) {
        let array = [0, -10, 5, 2, 4, 0];
        assert.equal(kofi.max(array), 5);
        return done();
    });
});

describe("min", function () {
    it("returns the min value in an array", function (done) {
        let array = [-1, 0, 4, -5, 7];
        assert.equal(kofi.min(array), -5);
        return done();
    });
});

describe("range", function () {
    it("generates a correct array range", function (done) {
        let range = kofi.range(0, 5);
        assert.equal(range.length, 5);
        assert.equal(range[0], 0);
        assert.equal(range[4], 4);
        return done();
    });
});

