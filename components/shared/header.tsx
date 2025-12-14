import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function AppHeader({
  title,
  subtitle,
  leftSlot,
  rightSlot,
}: AppHeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const router = useRouter();

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
      <View style={{ width: 40 }}>
        {leftSlot ?? (
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.surfaceVariant,
            }}
          >
            <ChevronLeft size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          paddingHorizontal: design.spacing.sm,
        }}
      >
        <Text
          variant="titleMedium"
          numberOfLines={1}
          style={{ color: theme.colors.onBackground }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={{ width: 40, alignItems: "flex-end" }}>{rightSlot}</View>
    </View>
  );
}
