import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useAppTheme } from "../contexts/themeContext";
import { DesignProvider } from "../contexts/designContext";

function Providers() {
  const { theme } = useAppTheme();
  const dark = theme.dark;

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        style={dark ? "light" : "dark"}
        backgroundColor={theme.colors.background}
      />

      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <Slot />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DesignProvider>
          <Providers />
        </DesignProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
