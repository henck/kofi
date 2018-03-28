let assert = require("assert");
let kofi = require("../dist/index.js");

describe("range", function () {
    it("generates a correct array range", function (done) {
        let range = kofi.range(0, 5);
        assert.equal(range.length, 5);
        assert.equal(range[0], 0);
        assert.equal(range[4], 4);
        return done();
    });
});

