import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type MonthlyState = "normal" | "mixed" | "critical";

export default function MonthlyUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [state, setState] = useState<MonthlyState>("normal");

  const nextState = () => {
    const order: MonthlyState[] = ["normal", "mixed", "critical"];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const month = {
    label: "September 2025",
    summary: {
      workingDays: 22,
      onTime: state === "critical" ? 8 : state === "mixed" ? 12 : 16,
      late: state === "normal" ? 4 : 6,
      absent: state === "normal" ? 2 : state === "mixed" ? 4 : 8,
    },
    weeks: [
      { week: "Week 1", onTime: 4, late: 1, absent: 0 },
      { week: "Week 2", onTime: 3, late: 2, absent: 0 },
      { week: "Week 3", onTime: 3, late: 1, absent: 1 },
      {
        week: "Week 4",
        onTime: state === "critical" ? 1 : 3,
        late: 1,
        absent: state === "critical" ? 3 : 1,
      },
    ],
  };

  const statMeta = {
    onTime: {
      icon: CheckCircle2,
      color: theme.colors.primary,
    },
    late: {
      icon: Clock,
      color: theme.colors.secondary,
    },
    absent: {
      icon: XCircle,
      color: theme.colors.error,
    },
  };

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
      {/* Monthly summary */}
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.md, gap: design.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {month.label}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Monthly attendance overview
              </Text>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.primaryContainer,
              }}
            >
              <Calendar size={18} color={theme.colors.onPrimaryContainer} />
            </View>
          </View>

          <Divider />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                On time
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {month.summary.onTime}
              </Text>
            </View>

            <View>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Late
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {month.summary.late}
              </Text>
            </View>

            <View>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Absent
              </Text>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {month.summary.absent}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Weekly breakdown */}
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.md, gap: design.spacing.sm }}>
          {month.weeks.map((item, idx) => (
            <View key={item.week}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {item.week}
                </Text>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <statMeta.onTime.icon
                      size={14}
                      color={statMeta.onTime.color}
                    />
                    <Text variant="labelSmall">{item.onTime}</Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <statMeta.late.icon size={14} color={statMeta.late.color} />
                    <Text variant="labelSmall">{item.late}</Text>
                  </View>

                  <View style={{ flexDirection: "row", gap: 4 }}>
                    <statMeta.absent.icon
                      size={14}
                      color={statMeta.absent.color}
                    />
                    <Text variant="labelSmall">{item.absent}</Text>
                  </View>
                </View>
              </View>

              {idx < month.weeks.length - 1 && (
                <Divider style={{ marginVertical: design.spacing.sm }} />
              )}
            </View>
          ))}
        </View>
      </Card>

      {state === "critical" && (
        <Card
          style={{
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: design.radii.lg,
          }}
        >
          <View
            style={{
              padding: design.spacing.md,
              flexDirection: "row",
              alignItems: "center",
              gap: design.spacing.sm,
            }}
          >
            <AlertCircle size={18} color={theme.colors.error} />
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Attendance for this month requires attention.
            </Text>
          </View>
        </Card>
      )}

      <Button mode="elevated" onPress={nextState}>
        Next state
      </Button>
    </View>
  );
}
