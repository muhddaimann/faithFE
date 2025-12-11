import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";
import * as SecureStore from "expo-secure-store";
import type { MD3Theme } from "react-native-paper";
import { lightTheme, darkTheme } from "../constants/theme";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  theme: MD3Theme;
  isDark: boolean;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
};

const THEME_KEY = "THEME_PREFERENCE";

const ThemeContext = createContext<ThemeContextType>({
  theme: { ...lightTheme, dark: false } as MD3Theme,
  isDark: false,
  mode: "system",
  setMode: async () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(THEME_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setModeState(saved);
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const setMode = async (newMode: ThemeMode) => {
    try {
      await SecureStore.setItemAsync(THEME_KEY, newMode);
    } catch (e) {
      // ignore
    }
    setModeState(newMode);
  };

  const isDark = useMemo(() => {
    return mode === "system" ? systemScheme === "dark" : mode === "dark";
  }, [mode, systemScheme]);

  const theme = useMemo<MD3Theme>(() => {
    const base = isDark ? darkTheme : lightTheme;
    return { ...(base as MD3Theme), dark: isDark };
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);

export default ThemeContext;
