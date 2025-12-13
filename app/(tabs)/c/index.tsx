import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Card, Avatar } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";

export default function Journeys() {
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
        style={{ color: theme.colors.onBackground, marginBottom: design.spacing.md }}
      >
        Your Journeys
      </Text>

      <Card style={{ marginBottom: design.spacing.md }}>
        <Card.Title
          title="Tokyo 2024"
          subtitle="12 songs • 45 photos"
          left={(props) => <Avatar.Icon {...props} icon="airplane" />}
        />
      </Card>

      <Card>
        <Card.Title
          title="Bali Retreat"
          subtitle="8 songs • 22 photos"
          left={(props) => <Avatar.Icon {...props} icon="beach" />}
        />
      </Card>
    </ScrollView>
  );
}
