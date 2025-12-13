import React from "react";
import { ScrollView } from "react-native";
import { Text, List, Switch } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { router } from "expo-router";

export default function Settings() {
  const { theme, mode } = useAppTheme();
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
        style={{
          color: theme.colors.onBackground,
          marginBottom: design.spacing.lg,
        }}
      >
        Settings
      </Text>

      <List.Item
        title="Theme Mode"
        description={`Current: ${mode}`}
        left={(props) => <List.Icon {...props} icon="palette" />}
      />

      <List.Item
        title="Notifications"
        left={(props) => <List.Icon {...props} icon="bell" />}
        right={() => <Switch value={true} onValueChange={() => {}} />}
      />

      <List.Item
        title="About TravelTune"
        left={(props) => <List.Icon {...props} icon="information" />}
      />

      <List.Item
        title="Log Out"
        titleStyle={{ color: theme.colors.error, fontWeight: "600" }}
        left={(props) => (
          <List.Icon {...props} icon="logout" color={theme.colors.error} />
        )}
        onPress={() => router.push("/goodbye")}
        style={{
          marginTop: design.spacing.lg,
          borderTopWidth: 1,
          borderColor: theme.colors.outlineVariant,
        }}
      />
    </ScrollView>
  );
}
