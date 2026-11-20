jest.mock("../src/api/BC.api", () => ({
  getBC: jest.fn(),
  patchBC: jest.fn(),
}));
jest.mock("../src/config/OAuth", () => ({
  getAccessToken: jest.fn(),
}));

const { getBC, patchBC } = require("../src/api/BC.api");
const { getAccessToken } = require("../src/config/OAuth");
const BCv2 = require("../src/modules/BC.v2.module");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("order state changes", () => {
  const orderNumber = "SO-123";
  const token = "test-token";
  const endpoint = {
    api: "Silverware/apiGroup/v1.0",
    target: "salesHeaders(documentType='Order',no='SO-123')",
  };
  const firstETag = 'W/"1"';
  const nextETag = 'W/"2"';

  beforeEach(() => {
    getAccessToken.mockResolvedValue(token);
    getBC.mockResolvedValue({ "@odata.etag": firstETag });
    patchBC.mockResolvedValue("");
  });

  test("opens an order using a fresh ETag for the second update", async () => {
    getBC.mockResolvedValueOnce({ "@odata.etag": firstETag });
    getBC.mockImplementationOnce(async () => {
      expect(patchBC).toHaveBeenCalledTimes(1);
      return { "@odata.etag": nextETag };
    });

    await expect(BCv2.openOrder(orderNumber)).resolves.toBeUndefined();

    expect(getBC.mock.calls).toEqual([
      [endpoint, {}, token],
      [endpoint, {}, token],
    ]);
    expect(patchBC.mock.calls).toEqual([
      [endpoint, firstETag, { swcSVReleaseOrder: true }, token],
      [endpoint, nextETag, { swcSVReleaseOrder: false }, token],
    ]);
  });

  test("releases the order with a single update", async () => {
    await expect(BCv2.releaseOrder(orderNumber)).resolves.toBeUndefined();

    expect(getBC.mock.calls).toEqual([[endpoint, {}, token]]);
    expect(patchBC.mock.calls).toEqual([
      [endpoint, firstETag, { swcSVIGENCalced: true, swcSVReleaseOrder: true }, token],
    ]);
  });

  test.each(["openOrder", "releaseOrder"])(
    "%s rejects a failed update and stops writing",
    async (method) => {
      const error = new Error("Order update failed");
      patchBC.mockRejectedValueOnce(error);

      await expect(BCv2[method](orderNumber)).rejects.toBe(error);
      expect(getBC).toHaveBeenCalledTimes(1);
      expect(patchBC).toHaveBeenCalledTimes(1);
    },
  );

  test("reports failure of the second update when opening an order", async () => {
    const error = new Error("Second order update failed");
    patchBC.mockResolvedValueOnce("").mockRejectedValueOnce(error);

    await expect(BCv2.openOrder(orderNumber)).rejects.toBe(error);
    expect(patchBC).toHaveBeenCalledTimes(2);
  });

  test("rejects a failed order lookup without attempting an update", async () => {
    const error = new Error("Order lookup failed");
    getBC.mockRejectedValueOnce(error);

    await expect(BCv2.releaseOrder(orderNumber)).rejects.toBe(error);
    expect(patchBC).not.toHaveBeenCalled();
  });
});

describe("bin reassignment reads", () => {
  const endpoint = {
    api: "mioneBrands/warehouse/v1.0",
    target: "binReassignments",
  };

  test("uses the warehouse endpoint and returns the rows", async () => {
    const rows = [{ id: "example-reassignment", newBinCode: "BIN-2" }];
    getBC.mockResolvedValue({ value: rows, "@odata.count": 1 });

    await expect(BCv2.getBinRassignments()).resolves.toBe(rows);
    expect(getBC).toHaveBeenCalledWith(endpoint, { $top: 10, $count: true }, null);
  });

  test("passes through query parameters and the caller's token", async () => {
    const params = { $top: 5, $skip: 10 };
    getBC.mockResolvedValue({ value: [] });

    await expect(BCv2.getBinRassignments(params, "test-token")).resolves.toEqual(
      [],
    );
    expect(getBC).toHaveBeenCalledWith(endpoint, params, "test-token");
  });
});
