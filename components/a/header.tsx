import React from "react";
import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type HeaderProps = {
  name?: string;
  status?: "online" | "offline";
};

export default function Header({
  name = "Rockstar",
  status = "online",
}: HeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const statusColor =
    status === "online" ? theme.colors.tertiary : theme.colors.outlineVariant;

  return (
    <View
      style={{
        paddingBottom: design.spacing.lg,
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
          FAITH
        </Text>

        <Text
          variant="headlineSmall"
          style={{ color: theme.colors.onBackground, marginTop: 2 }}
        >
          Hello {name}
        </Text>

        <Text
          variant="bodySmall"
          style={{
            color: theme.colors.onSurfaceVariant,
            marginTop: 2,
          }}
        >
          Here’s your work overview today
        </Text>
      </View>

      <View>
        <Avatar.Icon
          size={40}
          icon="account"
          style={{ backgroundColor: theme.colors.surfaceVariant }}
          color={theme.colors.onSurfaceVariant}
        />
        <View
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: statusColor,
            borderWidth: 2,
            borderColor: theme.colors.background,
          }}
        />
      </View>
    </View>
  );
}
