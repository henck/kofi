let assert = require("assert");
let kofi = require("../index.js");

describe("uniqueId", function () {
    it("generates unique ids", function (done) {
        let ids = [];
        let j = 0;
        while (j < 100) {
            let id = kofi.iniqueId();
            assert.equal(ids.indexOf(id), -1);
            ids.push(id);
            j++
        }
        return done();
    });
});

