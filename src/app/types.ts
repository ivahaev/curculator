import { APIState, Code, Rates } from "./redux/reducer";
import { RatesState } from "./redux/ratesReducer";
import { SupportedCodesState } from "./redux/supportedCodesReducer";

export type RootState = {
  api: APIState;
  supportedCodes: SupportedCodesState;
  latestRates: RatesState;
};

export interface API {
  getSupportedCodes: (apiKey: string) => Promise<Code[]>;
  getLatestRates: (apiKey: string, base: string) => Promise<Rates>;
  getHistoryRates: (apiKey: string, base: string, date: Date) => Promise<Rates>;
}

export interface Fetcher {
  fetch: <T>(url: string) => Promise<T>;
}

export type FieldsThunkExtension = { api: API };
