import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { ChevronRight } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
  onPress?: () => void;
  rightSlot?: React.ReactNode;
};

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  onPress,
  rightSlot,
}: SectionHeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: design.spacing.sm,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: design.spacing.sm,
        }}
      >
        {Icon && <Icon size={28} color={theme.colors.onSurfaceVariant} />}

        <View>
          <Text
            variant="titleSmall"
            style={{ color: theme.colors.onBackground }}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightSlot ? (
        rightSlot
      ) : onPress ? (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
              See all
            </Text>
            <ChevronRight size={16} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
