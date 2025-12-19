import React from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text, useTheme, Divider } from "react-native-paper";
import {
  ChevronRight,
  User,
  Bell,
  Clock,
  CalendarDays,
  Wallet,
  Info,
  LogOut,
} from "lucide-react-native";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/d/header";
import useAuth from "../../../hooks/useAuth";

export default function Settings() {
  const theme = useTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const { logout } = useAuth();

  const Item = ({
    title,
    subtitle,
    icon: Icon,
    danger,
    onPress,
  }: {
    title: string;
    subtitle?: string;
    icon?: React.ComponentType<{ size?: number; color?: string }>;
    danger?: boolean;
    onPress?: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: design.spacing.md,
        paddingHorizontal: design.spacing.md,
        gap: design.spacing.md,
        opacity: onPress ? 1 : 0.9,
      }}
    >
      {Icon && (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: danger
              ? theme.colors.errorContainer
              : theme.colors.surfaceVariant,
          }}
        >
          <Icon
            size={18}
            color={
              danger
                ? theme.colors.onErrorContainer
                : theme.colors.onSurfaceVariant
            }
          />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text
          variant="bodyLarge"
          style={{
            color: danger ? theme.colors.error : theme.colors.onSurface,
          }}
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

      {!danger && (
        <ChevronRight size={18} color={theme.colors.onSurfaceVariant} />
      )}
    </Pressable>
  );

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        paddingBottom: design.spacing["2xl"] * 3,
      }}
      onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <Header />

      <View
        style={{
          marginHorizontal: design.spacing.md,
          borderRadius: design.radii.xl,
          backgroundColor: theme.colors.surface,
          overflow: "hidden",
        }}
      >
        <Item title="Profile" subtitle="Personal information" icon={User} />
        <Divider />
        <Item
          title="Notifications"
          subtitle="Email & push alerts"
          icon={Bell}
        />
        <Divider />
        <Item
          title="Attendance Settings"
          subtitle="Check-in rules"
          icon={Clock}
        />
        <Divider />
        <Item
          title="Leave Preferences"
          subtitle="Leave & entitlement"
          icon={CalendarDays}
        />
        <Divider />
        <Item
          title="Payroll Information"
          subtitle="Salary & bank details"
          icon={Wallet}
        />
        <Divider />
        <Item title="About HRMS" subtitle="Version & legal" icon={Info} />
      </View>

      <View
        style={{
          margin: design.spacing.md,
          borderRadius: design.radii.xl,
          backgroundColor: theme.colors.surface,
          overflow: "hidden",
        }}
      >
        <Item title="Log Out" icon={LogOut} danger onPress={logout} />
      </View>
    </ScrollView>
  );
}
