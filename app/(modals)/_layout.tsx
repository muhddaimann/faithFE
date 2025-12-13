import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function ModalLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
      }}
    />
  );
}
