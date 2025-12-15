import React, { useEffect, useRef } from "react";
import { Slot, router, usePathname } from "expo-router";
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
import { TokenProvider } from "../contexts/tokenContext";
import { AuthProvider, useAuthContext } from "../contexts/authContext";
import { AppProvider, useApp } from "../contexts/appContext";

function AuthGate() {
  const { isReady: appReady, isFirstLaunch } = useApp();
  const { isReady: authReady, isAuthenticated } = useAuthContext();
  const pathname = usePathname();

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!appReady || !authReady) return;
    if (hasRedirected.current) return;

    if (isFirstLaunch && pathname !== "/") {
      hasRedirected.current = true;
      router.replace("/");
      return;
    }

    if (
      !isAuthenticated &&
      !["/land", "/signIn", "/signUp", "/forgot"].includes(pathname)
    ) {
      hasRedirected.current = true;
      router.replace("/land");
      return;
    }

    if (
      isAuthenticated &&
      ["/", "/land", "/signIn", "/signUp"].includes(pathname)
    ) {
      hasRedirected.current = true;
      router.replace("/welcome");
      return;
    }
  }, [appReady, authReady, isFirstLaunch, isAuthenticated, pathname]);

  return null;
}

function Providers() {
  const { theme } = useAppTheme();

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        style={theme.dark ? "light" : "dark"}
        backgroundColor={theme.colors.background}
      />

      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <AuthGate />
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
      <AppProvider>
        <TokenProvider>
          <AuthProvider>
            <ThemeProvider>
              <DesignProvider>
                <Providers />
              </DesignProvider>
            </ThemeProvider>
          </AuthProvider>
        </TokenProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
