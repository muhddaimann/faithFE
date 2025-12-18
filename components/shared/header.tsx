import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
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
  const { colors } = useTheme();
  const { design } = useDesign();
  const router = useRouter();

  return (
    <View
      style={{
        paddingBottom: design.spacing.md,
        backgroundColor: colors.background,
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
              width: 44,
              height: 44,
              borderRadius: design.spacing.md,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.surface,
            }}
          >
            <ChevronLeft size={28} color={colors.onSurface} />
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
          style={{ color: colors.onBackground }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: colors.onSurfaceVariant }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={{ width: 40, alignItems: "flex-end" }}>{rightSlot}</View>
    </View>
  );
}
