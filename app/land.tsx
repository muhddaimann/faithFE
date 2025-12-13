import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAppTheme } from "../contexts/themeContext";
import { useDesign } from "../contexts/designContext";
import { router } from "expo-router";

export default function Land() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.lg,
        paddingBottom: design.spacing.xl,
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{ color: theme.colors.onBackground, textAlign: "center" }}
      >
        Welcome to TravelTune
      </Text>

      <Text
        variant="bodyLarge"
        style={{
          marginTop: design.spacing.md,
          marginBottom: design.spacing.xl,
          color: theme.colors.onBackground,
          textAlign: "center",
        }}
      >
        Your soundtrack for every journey.
      </Text>

      <Button
        mode="contained"
        style={{ marginBottom: design.spacing.md }}
        onPress={() => router.push("/signUp")}
      >
        Create Account
      </Button>

      <Button mode="outlined" onPress={() => router.push("/signIn")}>
        Sign In
      </Button>
    </ScrollView>
  );
}
