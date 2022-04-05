import { ActionCreator, ThunkAction, Action } from "@reduxjs/toolkit";
import { FieldsThunkExtension, RootState } from "../types";
import { actions } from "./supportedCodesReducer";
import { actions as latestRatesActions } from "./ratesReducer";
import {
  apiSelectors,
  supportedCodesSelectors,
  latestRatesSelectors,
} from "./store";

type AsyncThunkAction = ActionCreator<
  ThunkAction<void, RootState, FieldsThunkExtension, Action>
>;

export const loadSupportedCodes: AsyncThunkAction =
  () => async (dispatch, getState, args) => {
    const { fetching } = supportedCodesSelectors.getSupportedCodes(getState());
    if (fetching) return;

    dispatch(actions.setError(""));
    const apiKey = apiSelectors.getKey(getState());
    dispatch(actions.setFetching(true));
    try {
      const result = await args.api.getSupportedCodes(apiKey);
      dispatch(actions.setData(result));
    } catch (err) {
      dispatch(
        actions.setError(err instanceof Error ? err.message : "unknown error")
      );
    }
    dispatch(actions.setFetching(false));
  };

export const loadLatestRates: AsyncThunkAction =
  () => async (dispatch, getState, args) => {
    const currentRateState = latestRatesSelectors.getRates(getState());
    if (currentRateState.fetching) return;

    dispatch(actions.setError(""));
    const apiKey = apiSelectors.getKey(getState());
    dispatch(latestRatesActions.setFetching(true));
    try {
      const result = await args.api.getLatestRates(
        apiKey,
        currentRateState.currentCode
      );
      dispatch(latestRatesActions.setData(result));
    } catch (err) {
      dispatch(
        latestRatesActions.setError(
          err instanceof Error ? err.message : "unknown error"
        )
      );
    }
    dispatch(latestRatesActions.setFetching(false));
  };
