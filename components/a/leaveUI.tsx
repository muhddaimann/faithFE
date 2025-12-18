import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { CalendarCheck, Hourglass } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type LeaveState = "empty" | "normal";

type LeaveUIProps = {
  annualBalance: number;
  pendingCount: number;
};

export default function LeaveUI({ annualBalance, pendingCount }: LeaveUIProps) {
  const { colors } = useTheme();
  const { design } = useDesign();
  const [state, setState] = useState<LeaveState>("normal");

  const isEmpty = state === "empty";

  return (
    <View style={{ marginBottom: design.spacing.lg }}>
      <View style={{ flexDirection: "row", gap: design.spacing.md }}>
        <View
          style={{
            flex: 1,
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: colors.primaryContainer,
            justifyContent: "space-between",
            minHeight: 140,
          }}
        >
          <CalendarCheck
            size={20}
            color={colors.onPrimaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="headlineSmall"
              style={{ color: colors.onPrimaryContainer }}
            >
              {isEmpty ? 0 : annualBalance}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              Annual leave remaining
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: colors.secondaryContainer,
            justifyContent: "space-between",
          }}
        >
          <Hourglass
            size={20}
            color={colors.onSecondaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="headlineSmall"
              style={{ color: colors.onSecondaryContainer }}
            >
              {isEmpty ? 0 : pendingCount}
            </Text>
            <Text
              variant="labelSmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              Pending requests
            </Text>
          </View>
        </View>
      </View>

      <Button
        mode="elevated"
        onPress={() =>
          setState((prev) => (prev === "normal" ? "empty" : "normal"))
        }
        style={{ marginTop: design.spacing.md }}
      >
        Next state
      </Button>
    </View>
  );
}
