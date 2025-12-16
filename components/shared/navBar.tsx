import React from "react";
import { View, TouchableOpacity } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, Text } from "react-native-paper";
import { useTabsUi } from "../../contexts/tabContext";
import { useDesign } from "../../contexts/designContext";

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { design } = useDesign();
  const insets = useSafeAreaInsets();
  const { opacity, scale, mode } = useTabsUi();

  if (mode === "hidden") return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + design.spacing.sm,
        left: design.spacing.lg,
        right: design.spacing.lg,
        paddingVertical: design.spacing.sm,
        paddingHorizontal: design.spacing.lg,
        borderRadius: design.radii.pill,
        backgroundColor: colors.surface,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        opacity,
        transform: [{ scale }],
        elevation: design.elevation.level3,
        shadowColor: colors.shadow,
        shadowOpacity: 0.12,
        shadowRadius: design.spacing.sm,
        shadowOffset: { width: 0, height: design.spacing.xxs },
      }}
      pointerEvents={opacity === 0 ? "none" : "auto"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const Icon = options.tabBarIcon as React.ComponentType<{
          color: string;
          size: number;
        }>;

        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        const onPress = () => {
          if (!isFocused) navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={{
              flex: 1,
              minHeight: design.sizes.touch.minHeight,
              alignItems: "center",
              justifyContent: "center",
              gap: design.spacing.xxs,
            }}
          >
            {Icon && (
              <Icon
                size={design.sizes.icon.md}
                color={isFocused ? colors.primary : colors.onSurfaceVariant}
              />
            )}

            <Text
              variant="labelSmall"
              style={{
                color: isFocused ? colors.primary : colors.onSurfaceVariant,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
