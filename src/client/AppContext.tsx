import React from "react";
import { App } from "../app";

export const AppContext = React.createContext<App | null>(null);

const Provider = AppContext.Provider;

export const AppContextProvider: React.FC<{
  app: App;
  children?: React.ReactNode;
}> = ({ app, children }) => {
  return <Provider value={app}>{children}</Provider>;
};

export const useApp = () => {
  const appContext = React.useContext(AppContext);
  if (!appContext) {
    throw new Error("Please provide App context");
  }
  return appContext;
};
