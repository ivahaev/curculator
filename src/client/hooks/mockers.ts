import * as useRatesHook from "./useRates";
import * as useLoginHook from "./useLogin";
import * as useCodesHook from "./useCodes";
import * as apiModule from "../../app/api/api";

export const mockUseRates = (
  value: Partial<ReturnType<typeof useRatesHook.useRates>> = {}
) => {
  const returnValue = {
    setAmount: jest.fn(),
    getSupportedCodes: jest.fn(),
    baseAmount: 1,
    currentRates: [],
    fetching: false,
    ...value,
  };
  jest.spyOn(useRatesHook, "useRates").mockReturnValue(returnValue);

  return returnValue;
};

export const mockUseLogin = (
  value: Partial<ReturnType<typeof useLoginHook.useLogin>> = {}
) => {
  const returnValue = {
    key: "",
    fetching: false,
    error: "",
    setKey: jest.fn(),
    ...value,
  };

  jest.spyOn(useLoginHook, "useLogin").mockReturnValue(returnValue);

  return returnValue;
};

export const mockUseCodes = (
  value: Partial<ReturnType<typeof useCodesHook.useCodes>> = {}
) => {
  const returnValue = {
    setBaseCode: jest.fn(),
    supportedCodes: [],
    currentCode: "",
    ...value,
  };
  jest.spyOn(useCodesHook, "useCodes").mockReturnValue(returnValue);

  return returnValue;
};

export const mockMakeAPI = (
  value: Partial<ReturnType<typeof apiModule.makeAPI>> = {}
) => {
  const returnValue = {
    getHistoryRates: jest.fn(),
    getLatestRates: jest.fn(),
    getSupportedCodes: jest.fn(),
    ...value,
  };
  jest.spyOn(apiModule, "makeAPI").mockReturnValue(returnValue);

  return returnValue;
};
