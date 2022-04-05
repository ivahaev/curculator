import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type APIState = {
  key: string;
  fetching: boolean;
  currentCode: string;
  error: string;
  codeLabels: Record<string, string>;
  rates?: Rates;
};

export type Code = { code: string; label: string };
export type Rate = { code: string; rate: number };

export type Rates = {
  year: number;
  month: number;
  day: number;
  base: string;
  rates: Rate[];
};

const initialState: APIState = {
  key: "",
  fetching: false,
  currentCode: "",
  error: "",
  codeLabels: {},
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
    },
  },
});

export const { reducer, actions } = apiSlice;
