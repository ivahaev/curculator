import { makeAPI } from "../api";

describe("api", () => {
  describe("getSupportedCodes", () => {
    const fetcherStub = {
      fetch: jest.fn().mockResolvedValue({
        supported_codes: [
          ["AED", "UAE Dirham"],
          ["AFN", "Afghan Afghani"],
        ],
      }),
    };
    const api = makeAPI(fetcherStub);
    it("calls fetcher.fetch with properly url", async () => {
      await api.getSupportedCodes("apiKey");

      expect(fetcherStub.fetch).toHaveBeenCalledWith(
        `https://v6.exchangerate-api.com/v6/apiKey/codes`
      );
    });

    it("calls returns transformed response", async () => {
      const result = await api.getSupportedCodes("apiKey");

      expect(result).toEqual([
        { code: "AED", label: "UAE Dirham" },
        { code: "AFN", label: "Afghan Afghani" },
      ]);
    });
  });

  describe("getLatestRates", () => {
    const fetcherStub = {
      fetch: jest.fn().mockResolvedValue({
        result: "success",
        time_last_update_utc: "Fri, 27 Mar 2020 00:00:00 +0000",
        base_code: "USD",
        conversion_rates: {
          USD: 1,
          AUD: 1.4817,
          BGN: 1.7741,
        },
      }),
    };
    const api = makeAPI(fetcherStub);

    it("calls fetcher.fetch with properly url", async () => {
      await api.getLatestRates("apiKey", "USD");

      expect(fetcherStub.fetch).toHaveBeenCalledWith(
        `https://v6.exchangerate-api.com/v6/apiKey/latest/USD`
      );
    });

    it("calls returns transformed response", async () => {
      const result = await api.getLatestRates("apiKey", "USD");

      expect(result).toEqual({
        year: 2020,
        month: 3,
        day: 27,
        base: "USD",
        rates: [
          { code: "USD", rate: 1 },
          { code: "AUD", rate: 1.4817 },
          { code: "BGN", rate: 1.7741 },
        ],
      });
    });
  });
});
