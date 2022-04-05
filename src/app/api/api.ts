import { API, Fetcher } from "../types";

type CodesResponse = {
  result: "success";
  supported_codes: [string, string][];
};

type LatestRateResponse = {
  result: "success";
  time_last_update_utc: string;
  base_code: string;
  conversion_rates: Record<string, number>;
};

export const makeAPI = (fetcher: Fetcher): API => {
  const makeBaseURL = (apiKey: string) =>
    `https://v6.exchangerate-api.com/v6/${apiKey}`;

  return {
    getSupportedCodes: async (apiKey: string) => {
      const url = `${makeBaseURL(apiKey)}/codes`;
      const response = await fetcher.fetch<CodesResponse>(url);
      return response.supported_codes.map(([code, label]) => ({ code, label }));
    },
    getLatestRates: async (apiKey: string, base: string) => {
      const url = `${makeBaseURL(apiKey)}/latest/${base}`;
      const response = await fetcher.fetch<LatestRateResponse>(url);
      return {
        year: 2020,
        month: 3,
        day: 27,
        base,
        rates: Object.entries(response.conversion_rates).map(
          ([code, rate]) => ({ code, rate })
        ),
      };
    },
    getHistoryRates: async (apiKey: string, base: string, date: Date) => {
      return {
        year: 2020,
        month: 3,
        day: 27,
        base,
        rates: [],
      };
    },
  };
};
