import React, { useEffect, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Clock, Calendar } from "lucide-react-native";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";

export default function OvertimeForm() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();

  const [hours, setHours] = useState<number | null>(null);

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
      <AppHeader title="Overtime" subtitle="Log overtime work" />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: colors.surface,
          gap: design.spacing.sm,
        }}
      >
        <Text variant="labelMedium">Overtime hours</Text>

        <Pressable
          onPress={() => setHours(2)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.sm,
            padding: design.spacing.md,
            borderRadius: design.radii.md,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <Clock size={18} color={colors.onSurfaceVariant} />
          <Text variant="bodyMedium">
            {hours ? `${hours} hours` : "Select hours"}
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
          <Text variant="bodyMedium">Select overtime date</Text>
        </Pressable>
      </View>

      <Button mode="contained" style={{ width: "100%" }}>
        Submit overtime
      </Button>
    </ScrollView>
  );
}
