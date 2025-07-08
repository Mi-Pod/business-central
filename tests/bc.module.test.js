const { getAccessToken } = require("../src/config/OAuth");
const BC = require("../src/modules/BC.v1.module");
const BCv2 = require("../src/modules/BC.v2.module");

describe("Business Central Integration Tests", () => {
  let token;

  beforeAll(async () => {
    token = await getAccessToken();
    expect(token).toBeTruthy();
  });

  test("should retrieve 10 items from BC Web Services", async () => {
    const items = await BC.findItems({ $top: 10 }, token);
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
  });

  test("should fetch V2.0 API endpoints", async () => {
    const endpoints = await BCv2.getEndpoints("v2.0");
    expect(Array.isArray(endpoints)).toBe(true);
    expect(endpoints.length).toBeGreaterThan(0);
  });
});
