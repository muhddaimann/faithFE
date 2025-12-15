import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { CalendarCheck, Hourglass } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type LeaveState = "empty" | "normal";

type LeaveUIProps = {
  annualBalance: number;
  pendingCount: number;
};

export default function LeaveUI({ annualBalance, pendingCount }: LeaveUIProps) {
  const { theme } = useAppTheme();
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
            backgroundColor: theme.colors.primaryContainer,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <CalendarCheck size={16} color={theme.colors.onPrimaryContainer} />
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              Annual Leave
            </Text>
          </View>

          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            {isEmpty ? 0 : annualBalance}
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onPrimaryContainer }}
          >
            days remaining
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.secondaryContainer,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <Hourglass size={16} color={theme.colors.onSecondaryContainer} />
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSecondaryContainer }}
            >
              Pending Requests
            </Text>
          </View>

          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.onSecondaryContainer }}
          >
            {isEmpty ? 0 : pendingCount}
          </Text>

          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSecondaryContainer }}
          >
            awaiting approval
          </Text>
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
