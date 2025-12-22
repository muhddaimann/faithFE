import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { CalendarCheck, Hourglass } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type LeaveUIProps = {
  annualBalance: number;
  pendingCount: number;
};

export default function LeaveUI({ annualBalance, pendingCount }: LeaveUIProps) {
  const { colors } = useTheme();
  const { design } = useDesign();

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
            elevation: design.elevation.level3,
            shadowColor: colors.shadow,
            shadowOpacity: 0.12,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 4 },
          }}
        >
          <CalendarCheck
            size={32}
            color={colors.onPrimaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="displaySmall"
              style={{ color: colors.onPrimaryContainer }}
            >
              {annualBalance}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              AL remaining
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
            elevation: design.elevation.level2,
            shadowColor: colors.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 3 },
          }}
        >
          <Hourglass
            size={32}
            color={colors.onSecondaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="displaySmall"
              style={{ color: colors.onSecondaryContainer }}
            >
              {pendingCount}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              Pending requests
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
