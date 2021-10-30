"use strict";
let redis

describe('# Test Redis connection', function () {
    let channel = null;
    let redis = null;
    beforeEach(async function () {
        redis = require("../index")({
            appName: "test-file",
            url: ""
        })
    });

    it("Should Create A Connection", async () => {
        expect(redis).not.toBe(null);
    });

    it("Should Set a  Command", async () => {
        const response = await redis.set("new", "old");
        expect(response).toBe("OK");
    });


    it("Should Get a command", async () => {
        await redis.set("new", "old");
        const response = await redis.get("new");
        expect(response).toBe("old");
    });
    it("Should Be backward compatible a command", async () => {
        await redis.setAsync("new", "old");
        const response = await redis.getAsync("new");
        expect(response).toBe("old");
    });

    afterEach(async () => {
        await redis.disconnect();
    });
});
