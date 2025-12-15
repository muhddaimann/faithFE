import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AppState = {
  isReady: boolean;
  isFirstLaunch: boolean;
  markLaunched: () => Promise<void>;
};

const AppContext = createContext<AppState>({
  isReady: false,
  isFirstLaunch: false,
  markLaunched: async () => {},
});

const FIRST_LAUNCH_KEY = "hasLaunchedBefore";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const launched = await SecureStore.getItemAsync(FIRST_LAUNCH_KEY);
      if (!launched) {
        setIsFirstLaunch(true);
      }
      setIsReady(true);
    })();
  }, []);

  const markLaunched = async () => {
    await SecureStore.setItemAsync(FIRST_LAUNCH_KEY, "1");
    setIsFirstLaunch(false);
  };

  return (
    <AppContext.Provider
      value={{
        isReady,
        isFirstLaunch,
        markLaunched,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
