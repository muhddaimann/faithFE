import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
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
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
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
