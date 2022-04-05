import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rate, Rates } from "./reducer";

export type RatesState = {
  data?: Rates;
  fetching: boolean;
  error: string;
  currentCode: string;
  baseAmount: number;
  calculatedRates: Rate[];
};

const initialState: RatesState = {
  fetching: false,
  error: "",
  currentCode: "",
  baseAmount: 1,
  calculatedRates: [],
};

const calculateRates = (amount: number, rates: Rate[]) =>
  rates.map((rate) => {
    return {
      ...rate,
      rate: rate.rate * amount,
    };
  });

const ratesSlice = createSlice({
  name: "latestRates",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Rates>) {
      state.data = action.payload;
      state.calculatedRates = calculateRates(
        state.baseAmount,
        state.data.rates
      );
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.fetching = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setCurrentCode(state, action: PayloadAction<string>) {
      state.currentCode = action.payload;
    },
    setBaseAmount(state, action: PayloadAction<number>) {
      state.baseAmount = action.payload;
      if (state.data?.rates) {
        state.calculatedRates = calculateRates(
          state.baseAmount,
          state.data.rates
        );
      }
    },
  },
});

export const { reducer, actions } = ratesSlice;

export const makeSelectors = <T>(baseSelector: (state: T) => RatesState) => {
  return {
    getRates: baseSelector,
    getCalculatedRates: (state: T) => baseSelector(state).calculatedRates,
  };
};
