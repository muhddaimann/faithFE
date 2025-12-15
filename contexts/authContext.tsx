import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useToken } from "./tokenContext";

type User = {
  id: string;
  username: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  user: null,
  isAuthenticated: false,
  isReady: false,
  signIn: async () => false,
  signUp: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    accessToken,
    setTokens,
    clearTokens,
    isReady: tokenReady,
  } = useToken();

  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!tokenReady) return;

    if (accessToken) {
      setUser({
        id: "demo-user",
        username: "user",
      });
    }

    setIsReady(true);
  }, [tokenReady, accessToken]);

  const signIn = async (username: string, password: string) => {
    if (username !== "user" || password !== "user") {
      return false;
    }

    await setTokens("mock-access-token");

    setUser({
      id: "demo-user",
      username,
    });

    router.replace("/welcome");
    return true;
  };

  const signUp = async (username: string, password: string) => {
    if (!username || !password) return false;

    router.replace("/signIn");
    return true;
  };

  const logout = async () => {
    Alert.alert("Log out", "Are you sure you want to log out of TravelTune?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await clearTokens();
          setUser(null);
          router.replace("/goodbye");
        },
      },
    ]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isReady,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
