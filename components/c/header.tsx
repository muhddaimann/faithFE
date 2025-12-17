import React from "react";
import { View, Pressable } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { CalendarCheck, Receipt, Clock, Shuffle } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type ManageTab = "leave" | "claim" | "overtime" | "work";
type UserStatus = "online" | "offline";

type HeaderProps = {
  activeTab: ManageTab;
  onTabChange: (tab: ManageTab) => void;
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const status: UserStatus = "online";
  const statusColor =
    status === "online" ? theme.colors.tertiary : theme.colors.outlineVariant;

  const tabs: {
    key: ManageTab;
    label: string;
    icon: any;
  }[] = [
    { key: "leave", label: "Leave", icon: CalendarCheck },
    { key: "claim", label: "Claim", icon: Receipt },
    { key: "overtime", label: "Overtime", icon: Clock },
    { key: "work", label: "Work", icon: Shuffle },
  ];

  return (
    <View style={{ marginBottom: design.spacing.md }}>
      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surface,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
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
            gap: design.spacing.sm,
            marginTop: design.spacing.sm,
          }}
        >
          {tabs.map(({ key, label, icon: Icon }) => {
            const active = key === activeTab;

            return (
              <Pressable
                key={key}
                onPress={() => onTabChange(key)}
                style={{
                  flex: 1,
                  paddingVertical: design.spacing.sm,
                  borderRadius: design.radii.md,
                  backgroundColor: active
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Icon
                  size={16}
                  color={
                    active
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant
                  }
                />
                <Text
                  variant="labelSmall"
                  style={{
                    color: active
                      ? theme.colors.onPrimary
                      : theme.colors.onSurfaceVariant,
                  }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}
