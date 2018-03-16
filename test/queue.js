let assert = require("assert");
let kofi = require("../index.js");

describe("queue", function () {
    it("executes all functions provided", function (done) {
        let q = kofi.queue();
        let e1 = false, e2 = false, e3 = false;
        q.then(function (next) {
            e1 = true;
            return next();
        });
        q.then(function (next) {
            e2 = true;
            return next();
        });
        q.then(function (next) {
            return kofi.delay(10, function () {
                e3 = true;
                return next();
            });
        });
        q.catch(function (error) {
            return done(new Error("ERROR RUNNING QUEUE"));
        });
        q.finish(function () {
            assert.equal(e1, true);
            assert.equal(e2, true);
            assert.equal(e3, true);
            return done();
        });
    });
});

