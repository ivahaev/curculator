import { makeAPI } from "./api/api";
import fetcher from "./fetcher/fetcher";
import {
  makeStore,
  apiSelectors,
  supportedCodesSelectors,
  latestRatesSelectors,
} from "./redux/store";
import { actions } from "./redux/reducer";
import { actions as rateActions } from "./redux/ratesReducer";
import * as asyncActions from "./redux/asyncActions";

export type App = ReturnType<typeof makeApp>;

export const makeApp = (api = makeAPI(fetcher)) => {
  const store = makeStore(api);

  return {
    subscribe(cb: () => void) {
      return store.subscribe(cb);
    },
    setAPIKey(key: string) {
      store.dispatch(actions.setKey(key));
    },
    getAPIKey: () => apiSelectors.getKey(store.getState()),
    loadSupportedCodes() {
      store.dispatch(asyncActions.loadSupportedCodes());
    },
    getSupportedCodes: () =>
      supportedCodesSelectors.getSupportedCodes(store.getState()),
    setCurrentCode: (code: string) => {
      store.dispatch(rateActions.setCurrentCode(code));
      store.dispatch(asyncActions.loadLatestRates(code));
    },
    getRates: () => latestRatesSelectors.getRates(store.getState()),
    setBaseAmount: (amount: number) => {
      store.dispatch(rateActions.setBaseAmount(amount));
    },
    getCalculatedRates: () =>
      latestRatesSelectors.getCalculatedRates(store.getState()),
  };
};
