import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import useProfile from "../../../hooks/useProfile";
import { User, FileText, Settings } from "lucide-react-native";

export default function Profile() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const { profile, payslips, documents, preferences } = useProfile();

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 3,
      }}
      onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <SectionHeader
        title="My Profile"
        subtitle="Personal information"
        icon={User}
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
          marginBottom: design.spacing.lg,
        }}
      >
        <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
          {profile.name}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {profile.role} · {profile.department}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
        >
          {profile.email}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
        >
          Employee ID: {profile.employeeId}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
        >
          Joined: {profile.joinDate}
        </Text>
      </View>

      <SectionHeader
        title="Payslips"
        subtitle="Salary records"
        icon={FileText}
      />

      {payslips.map((item) => (
        <View
          key={item.id}
          style={{
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: design.spacing.sm,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onBackground }}
          >
            {item.month}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Net Pay: {item.netPay}
          </Text>
        </View>
      ))}

      <SectionHeader
        title="Documents"
        subtitle="Company files"
        icon={FileText}
      />

      {documents.map((item) => (
        <View
          key={item.id}
          style={{
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: design.spacing.sm,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onBackground }}
          >
            {item.title}
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            {item.date}
          </Text>
        </View>
      ))}

      <SectionHeader
        title="Preferences"
        subtitle="App settings"
        icon={Settings}
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
        }}
      >
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Dark mode: {preferences.darkMode ? "Enabled" : "Disabled"}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
        >
          Notifications: {preferences.notifications ? "Enabled" : "Disabled"}
        </Text>

        <Button
          mode="contained"
          style={{ marginTop: design.spacing.md }}
          onPress={() => {}}
        >
          Edit Preferences
        </Button>
      </View>
    </ScrollView>
  );
}
