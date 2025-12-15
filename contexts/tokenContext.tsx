import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type TokenState = {
  accessToken: string | null;
  refreshToken: string | null;
  isReady: boolean;
  setTokens: (access: string, refresh?: string) => Promise<void>;
  clearTokens: () => Promise<void>;
};

const TokenContext = createContext<TokenState>({
  accessToken: null,
  refreshToken: null,
  isReady: false,
  setTokens: async () => {},
  clearTokens: async () => {},
});

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const access = await SecureStore.getItemAsync(ACCESS_KEY);
      const refresh = await SecureStore.getItemAsync(REFRESH_KEY);
      setAccessToken(access);
      setRefreshToken(refresh);
      setIsReady(true);
    })();
  }, []);

  const setTokens = async (access: string, refresh?: string) => {
    await SecureStore.setItemAsync(ACCESS_KEY, access);
    if (refresh) await SecureStore.setItemAsync(REFRESH_KEY, refresh);
    setAccessToken(access);
    setRefreshToken(refresh ?? null);
  };

  const clearTokens = async () => {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return (
    <TokenContext.Provider
      value={{
        accessToken,
        refreshToken,
        isReady,
        setTokens,
        clearTokens,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export const useToken = () => useContext(TokenContext);
