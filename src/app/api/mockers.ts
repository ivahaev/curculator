import { API } from "../types";

export const mockAPI = (value: Partial<API> = {}) => ({
  getSupportedCodes: jest.fn(),
  getLatestRates: jest.fn(),
  getHistoryRates: jest.fn(),
  ...value,
});
