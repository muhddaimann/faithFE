import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import useApply from "../../../hooks/useApply";
import { CalendarPlus, FileText } from "lucide-react-native";

export default function Apply() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const { balances, applications, submitLeave, initialForm } = useApply();
  const [form, setForm] = useState(initialForm);

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
        title="Apply Leave"
        subtitle="Submit a new request"
        icon={CalendarPlus}
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
          marginBottom: design.spacing.lg,
        }}
      >
        {balances.map((item) => (
          <View
            key={item.type}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: design.spacing.xs,
            }}
          >
            <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
              {item.label}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.remaining} left
            </Text>
          </View>
        ))}
      </View>

      <Button
        mode="contained"
        onPress={async () => {
          await submitLeave(form);
        }}
        style={{ marginBottom: design.spacing.xl }}
      >
        Submit Leave Request
      </Button>

      <SectionHeader
        title="My Applications"
        subtitle="Leave history"
        icon={FileText}
      />

      {applications.map((item) => (
        <View
          key={item.id}
          style={{
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: design.spacing.sm,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
              {item.type.toUpperCase()} · {item.days} day(s)
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.status}
            </Text>
          </View>

          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
          >
            {item.startDate} → {item.endDate}
          </Text>

          {item.reason && (
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
            >
              Reason: {item.reason}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
