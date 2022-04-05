import { useMemo, useSyncExternalStore } from "react";
import { useApp } from "../AppContext";

type Options = { code: string; label: string; disabled?: boolean }[];

export const useCodes = () => {
  const app = useApp();
  const currentCode = useSyncExternalStore(
    app.subscribe,
    () => app.getRates().currentCode
  );
  const supportedCodesMap = useSyncExternalStore(
    app.subscribe,
    () => app.getSupportedCodes().data
  );
  const supportedCodes = useMemo(() => {
    const options = Object.keys(supportedCodesMap).reduce(
      (res: Options, code) => {
        res.push({ code, label: supportedCodesMap[code] });
        return res;
      },
      []
    );
    options.unshift({ code: "", label: "Plz, select code", disabled: true });
    return options;
  }, [supportedCodesMap]);

  return {
    supportedCodes,
    currentCode,
    setBaseCode: app.setCurrentCode,
  };
};
