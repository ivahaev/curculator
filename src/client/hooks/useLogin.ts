import { useSyncExternalStore } from "react";
import { useApp } from "../AppContext";

export const useLogin = () => {
  const app = useApp();
  const key = useSyncExternalStore(app.subscribe, app.getAPIKey);
  const { fetching, error } = useSyncExternalStore(app.subscribe, () =>
    app.getSupportedCodes()
  );

  return {
    key,
    fetching,
    error,
    setKey: app.setAPIKey,
  };
};
