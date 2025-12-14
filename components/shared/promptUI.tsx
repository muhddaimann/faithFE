import React from "react";
import { View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { MapPin } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type PromptUIProps = {
  title: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
};

export default function PromptUI({
  title,
  description,
  actionLabel,
  onAction,
}: PromptUIProps) {
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
            marginBottom: design.spacing.md,
          }}
        >
          <MapPin size={24} color={theme.colors.onPrimaryContainer} />
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
              marginTop: design.spacing.xs,
              marginBottom: design.spacing.md,
              maxWidth: "90%",
            }}
          >
            {description}
          </Text>
        )}

        <Button mode="contained" onPress={onAction}>
          {actionLabel}
        </Button>
      </View>
    </Card>
  );
}
