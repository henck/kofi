let assert = require("assert");
let kofi = require("../dist/index.js");

describe("dispatch", function () {
    it("calls all listeners associated with the same event name", function (done) {
        let e = kofi.dispatch();
        let call1 = false, call2 = false;
        e.on("my-event", function (value) {
            call1 = true;
            assert.equal(value, true);
        });
        e.on("my-event", function (value) {
            call2 = true;
            assert.equal(value, true);
        });
        e.emit("my-event", true);
        return done();
    });

    it("does nothing if there is not listener registered", function (done) {
        let e = kofi.dispatch();
        e.emit("undef-event", null);
        return done();
    });
});

