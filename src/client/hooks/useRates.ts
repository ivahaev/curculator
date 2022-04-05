import { useMemo, useSyncExternalStore } from "react";
import { useApp } from "../AppContext";

export const useRates = () => {
  const app = useApp();
  const { baseAmount, fetching } = useSyncExternalStore(app.subscribe, () =>
    app.getRates()
  );
  const { data: supportedCodesMap } = useSyncExternalStore(app.subscribe, () =>
    app.getSupportedCodes()
  );
  const currentRates = useSyncExternalStore(app.subscribe, () =>
    app.getCalculatedRates()
  );
  const currentRatesData = useMemo(() => {
    return currentRates.map((rate) => ({
      ...rate,
      label: supportedCodesMap[rate.code],
    }));
  }, [currentRates, supportedCodesMap]);

  return {
    baseAmount,
    fetching,
    currentRates: currentRatesData,
    getSupportedCodes: app.loadSupportedCodes,
    setAmount: app.setBaseAmount,
  };
};
