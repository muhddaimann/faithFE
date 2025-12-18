import React from "react";
import { View, Pressable } from "react-native";
import { Text, Avatar, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";

type AttendanceTab = "daily" | "weekly" | "monthly";
type UserStatus = "online" | "offline";

type HeaderProps = {
  activeTab: AttendanceTab;
  onTabChange: (tab: AttendanceTab) => void;
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { colors } = useTheme();
  const { design } = useDesign();

  const tabs: AttendanceTab[] = ["daily", "weekly", "monthly"];
  const status: UserStatus = "online";

  const statusColor =
    status === "online" ? colors.tertiary : colors.outlineVariant;

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.md }}>
      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: colors.surface,
          gap: design.spacing.md,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", gap: design.spacing.md }}>
            <View>
              <Avatar.Icon
                size={44}
                icon="account"
                style={{ backgroundColor: colors.surfaceVariant }}
                color={colors.onSurfaceVariant}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 2,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: statusColor,
                  borderWidth: 2,
                  borderColor: colors.background,
                }}
              />
            </View>

            <View>
              <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                Muhammad Aiman bin Othman
              </Text>

              <Text
                variant="bodySmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Executive, Mobile Engineer
              </Text>

              <Text
                variant="labelSmall"
                style={{ color: colors.primary, marginTop: 2 }}
              >
                #DAY09248
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: design.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: colors.outlineVariant,
          }}
        >
          <View>
            <Text
              variant="labelSmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              Joined
            </Text>
            <Text variant="bodySmall" style={{ color: colors.primary }}>
              12 Mar 2022
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              variant="labelSmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              Tenure
            </Text>
            <Text variant="bodySmall" style={{ color: colors.primary }}>
              3 yrs 6 mos
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: colors.surfaceVariant,
          borderRadius: design.radii.lg,
          padding: design.spacing.xs,
        }}
      >
        {tabs.map((tab) => {
          const active = tab === activeTab;

          return (
            <Pressable
              key={tab}
              onPress={() => onTabChange(tab)}
              style={{
                flex: 1,
                paddingVertical: design.spacing.sm,
                borderRadius: design.radii.md,
                backgroundColor: active ? colors.surface : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                variant="labelMedium"
                style={{
                  color: active ? colors.onSurface : colors.onSurfaceVariant,
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
