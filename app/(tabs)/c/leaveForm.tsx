import React, { useEffect, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Calendar, FileText } from "lucide-react-native";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";

export default function LeaveForm() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();

  const [leaveType, setLeaveType] = useState<string | null>(null);

  useEffect(() => {
    hide();
    return () => reveal();
  }, [hide, reveal]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 2,
        gap: design.spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader
        title="Apply Leave"
        subtitle="Fill in your leave details"
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: colors.surface,
          gap: design.spacing.sm,
        }}
      >
        <Text variant="labelMedium">Leave type</Text>

        <Pressable
          onPress={() => setLeaveType("Annual Leave")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.sm,
            padding: design.spacing.md,
            borderRadius: design.radii.md,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <FileText size={18} color={colors.onSurfaceVariant} />
          <Text variant="bodyMedium">
            {leaveType ?? "Select leave type"}
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: colors.surface,
          gap: design.spacing.sm,
        }}
      >
        <Text variant="labelMedium">Date</Text>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.sm,
            padding: design.spacing.md,
            borderRadius: design.radii.md,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <Calendar size={18} color={colors.onSurfaceVariant} />
          <Text variant="bodyMedium">Select date range</Text>
        </Pressable>
      </View>

      <Button
        mode="contained"
        style={{ width: "100%" }}
        contentStyle={{ paddingVertical: design.spacing.xs }}
      >
        Submit leave
      </Button>
    </ScrollView>
  );
}
