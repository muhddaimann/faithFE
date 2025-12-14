import React from "react";
import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type HeaderProps = {
  name?: string;
};

export default function Header({ name = "Traveler" }: HeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        paddingBottom: design.spacing.md,
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
          TravelTune
        </Text>

        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, marginTop: 2 }}
        >
          Hello {name} 👋
        </Text>

        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginTop: 2,
          }}
        >
          Ready for your next journey?
        </Text>
      </View>

      <Avatar.Icon
        size={40}
        icon="account"
        style={{ backgroundColor: theme.colors.surfaceVariant }}
        color={theme.colors.onSurfaceVariant}
      />
    </View>
  );
}
