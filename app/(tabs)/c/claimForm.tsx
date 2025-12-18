import React, { useEffect, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Receipt, Calendar } from "lucide-react-native";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";

export default function ClaimForm() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();

  const [claimType, setClaimType] = useState<string | null>(null);

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
      <AppHeader title="Claim" subtitle="Submit your expense claim" />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: colors.surface,
          gap: design.spacing.sm,
        }}
      >
        <Text variant="labelMedium">Claim type</Text>

        <Pressable
          onPress={() => setClaimType("Travel")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: design.spacing.sm,
            padding: design.spacing.md,
            borderRadius: design.radii.md,
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <Receipt size={18} color={colors.onSurfaceVariant} />
          <Text variant="bodyMedium">{claimType ?? "Select claim type"}</Text>
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
          <Text variant="bodyMedium">Select claim date</Text>
        </Pressable>
      </View>

      <Button mode="contained" style={{ width: "100%" }}>
        Submit claim
      </Button>
    </ScrollView>
  );
}
