import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function Welcome() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/a");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: design.spacing.lg,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="headlineMedium" style={{ color: theme.colors.onBackground }}>
        Welcome back!
      </Text>

      <Text
        variant="bodyLarge"
        style={{ marginTop: design.spacing.md, color: theme.colors.onBackground }}
      >
        Loading your journeys…
      </Text>
    </ScrollView>
  );
}
