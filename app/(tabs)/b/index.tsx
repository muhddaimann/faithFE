import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Button, Avatar, Card } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";

export default function Play() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <ScrollView
      bounces={false}
      overScrollMode="never"
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing.xl,
      }}
    >
      <Text
        variant="headlineSmall"
        style={{ color: theme.colors.onBackground, marginBottom: design.spacing.lg }}
      >
        Now Playing
      </Text>

      <Card style={{ padding: design.spacing.md }}>
        <Avatar.Icon
          icon="music"
          size={70}
          style={{
            alignSelf: "center",
            marginBottom: design.spacing.lg,
            backgroundColor: theme.colors.primary,
          }}
          color={theme.colors.onPrimary}
        />

        <Text
          variant="titleLarge"
          style={{ textAlign: "center", color: theme.colors.onSurface }}
        >
          Song Title
        </Text>

        <Text
          variant="bodyMedium"
          style={{
            textAlign: "center",
            marginBottom: design.spacing.lg,
            color: theme.colors.onSurfaceVariant,
          }}
        >
          Artist Name
        </Text>

        <Button mode="contained" style={{ marginBottom: design.spacing.md }}>
          Play / Pause
        </Button>

        <Button mode="outlined">View Playlist</Button>
      </Card>
    </ScrollView>
  );
}
