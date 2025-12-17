import React from "react";
import { View } from "react-native";
import { Text, Avatar, Button, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

export default function Header() {
  const theme = useTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        padding: design.spacing.lg,
        alignItems: "center",
        gap: design.spacing.sm,
        backgroundColor: theme.colors.background,
      }}
    >
      <Avatar.Icon
        size={72}
        icon="account"
        style={{ backgroundColor: theme.colors.surfaceVariant }}
        color={theme.colors.onSurfaceVariant}
      />

      <View style={{ alignItems: "center", gap: design.spacing.xxs }}>
        <Text variant="titleMedium">Muhammad Aiman bin Othman</Text>

        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Executive, Software Engineer
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.xs,
          }}
        >
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            aiman
          </Text>

          <View
            style={{
              paddingHorizontal: design.spacing.sm,
              paddingVertical: design.spacing.xs,
              borderRadius: 999,
              backgroundColor: theme.colors.primaryContainer,
            }}
          >
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              #DAY0234093
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: design.spacing.sm,
          paddingTop: design.spacing.sm,
        }}
      >
        <Button mode="contained">Edit Profile</Button>
        <Button mode="outlined">Email Us</Button>
      </View>
    </View>
  );
}
