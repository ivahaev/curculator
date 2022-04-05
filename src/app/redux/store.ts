import { configureStore } from "@reduxjs/toolkit";
import { API, RootState } from "../types";
import { reducer as apiReducer } from "./reducer";
import { reducer as supportedCodesReducer } from "./supportedCodesReducer";
import { reducer as latestRatesReducer } from "./ratesReducer";
import { makeSelectors } from "./selectors";
import { makeSelectors as makeSupportedCodesSelectors } from "./supportedCodesReducer";
import { makeSelectors as makeLatestRatesSelectors } from "./ratesReducer";

export const apiSelectors = makeSelectors((state: RootState) => state.api);
export const supportedCodesSelectors = makeSupportedCodesSelectors(
  (state: RootState) => state.supportedCodes
);
export const latestRatesSelectors = makeLatestRatesSelectors(
  (state: RootState) => state.latestRates
);

export const makeStore = (api: API, preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      api: apiReducer,
      supportedCodes: supportedCodesReducer,
      latestRates: latestRatesReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: { api } },
      }),
  });
