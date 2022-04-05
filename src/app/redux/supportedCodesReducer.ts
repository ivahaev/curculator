import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Code } from "./reducer";

export type SupportedCodesState = {
  data: Record<string, string>;
  fetching: boolean;
  error: string;
};

const initialState: SupportedCodesState = {
  data: {},
  fetching: false,
  error: "",
};

const supportedCodesSlice = createSlice({
  name: "supportedCodes",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<Code[]>) {
      state.data = action.payload.reduce((res: Record<string, string>, cur) => {
        res[cur.code] = cur.label;
        return res;
      }, {});
    },
    setFetching(state, action: PayloadAction<boolean>) {
      state.fetching = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { reducer, actions } = supportedCodesSlice;

export const makeSelectors = <T>(
  baseSelector: (state: T) => SupportedCodesState
) => {
  return {
    getSupportedCodes: baseSelector,
  };
};
