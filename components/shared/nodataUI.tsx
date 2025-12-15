import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { Inbox } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type NoDataUIProps = {
  title: string;
  description?: string;
};

export default function NoDataUI({ title, description }: NoDataUIProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: design.radii.lg,
      }}
    >
      <View
        style={{
          paddingVertical: design.spacing.lg,
          paddingHorizontal: design.spacing.md,
          alignItems: "center",
          justifyContent: "center",
          gap: design.spacing.xs,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.primaryContainer,
            marginBottom: design.spacing.sm,
          }}
        >
          <Inbox size={24} color={theme.colors.onPrimaryContainer} />
        </View>

        <Text
          variant="titleMedium"
          style={{
            color: theme.colors.onSurface,
            textAlign: "center",
          }}
        >
          {title}
        </Text>

        {description && (
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: "center",
              maxWidth: "90%",
            }}
          >
            {description}
          </Text>
        )}
      </View>
    </Card>
  );
}
