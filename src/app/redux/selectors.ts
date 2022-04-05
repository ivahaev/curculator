import { APIState } from "./reducer";

export const makeSelectors = <T>(baseSelector: (state: T) => APIState) => {
  return {
    getKey: (state: T) => baseSelector(state).key,
  };
};
