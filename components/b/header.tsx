import React from "react";
import { View, Pressable } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type AttendanceTab = "daily" | "weekly" | "monthly";
type UserStatus = "online" | "offline";

type HeaderProps = {
  activeTab: AttendanceTab;
  onTabChange: (tab: AttendanceTab) => void;
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const tabs: AttendanceTab[] = ["daily", "weekly", "monthly"];
  const status: UserStatus = "online";

  const statusColor =
    status === "online" ? theme.colors.tertiary : theme.colors.outlineVariant;

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.md }}>
      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surface,
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
                style={{ backgroundColor: theme.colors.surfaceVariant }}
                color={theme.colors.onSurfaceVariant}
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
                  borderColor: theme.colors.background,
                }}
              />
            </View>

            <View>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onSurface }}
              >
                Muhammad Aiman bin Othman
              </Text>

              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Executive, Mobile Engineer
              </Text>

              <Text
                variant="labelSmall"
                style={{ color: theme.colors.primary, marginTop: 2 }}
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
            borderTopColor: theme.colors.outlineVariant,
          }}
        >
          <View>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Joined
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
              12 Mar 2022
            </Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Tenure
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
              3 yrs 6 mos
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: theme.colors.surfaceVariant,
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
                backgroundColor: active ? theme.colors.surface : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                variant="labelMedium"
                style={{
                  color: active
                    ? theme.colors.onSurface
                    : theme.colors.onSurfaceVariant,
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
