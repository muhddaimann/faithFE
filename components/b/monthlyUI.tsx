import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider, useTheme } from "react-native-paper";
import {
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type MonthlyState = "healthy" | "watch" | "attention";

export default function MonthlyUI() {
  const { colors } = useTheme();
  const { design } = useDesign();

  const [state, setState] = useState<MonthlyState>("healthy");

  const nextState = () => {
    const order: MonthlyState[] = ["healthy", "watch", "attention"];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const month = {
    label: "September 2025",
    health:
      state === "healthy"
        ? {
            label: "Good standing",
            color: colors.primary,
            description: "Attendance is within acceptable range.",
          }
        : state === "watch"
        ? {
            label: "Mixed attendance",
            color: colors.secondary,
            description: "Late arrivals or absences detected.",
          }
        : {
            label: "Action required",
            color: colors.error,
            description: "Attendance breaches detected this month.",
          },
    summary: {
      workingDays: 22,
      present: state === "attention" ? 12 : state === "watch" ? 16 : 18,
      late: state === "healthy" ? 3 : 6,
      absent: state === "healthy" ? 1 : state === "watch" ? 3 : 7,
      leave: 2,
    },
    weeks: [
      { week: "Week 1", present: 4, late: 1, absent: 0 },
      { week: "Week 2", present: 4, late: 1, absent: 0 },
      { week: "Week 3", present: 3, late: 1, absent: 1 },
      {
        week: "Week 4",
        present: state === "attention" ? 1 : 3,
        late: 1,
        absent: state === "attention" ? 3 : 1,
      },
    ],
  };

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
      <Card
        style={{
          backgroundColor: colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.lg, gap: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text variant="titleLarge" style={{ color: colors.onSurface }}>
                {month.label}
              </Text>
              <Text variant="labelMedium" style={{ color: month.health.color }}>
                {month.health.label}
              </Text>
            </View>

            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: month.health.color,
              }}
            >
              r
              <Calendar size={20} color={colors.onPrimary} />
            </View>
          </View>

          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {month.health.description}
          </Text>
        </View>
      </Card>

      <Card
        style={{
          backgroundColor: colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View
          style={{
            padding: design.spacing.md,
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: 16,
          }}
        >
          {[
            { label: "Working days", value: month.summary.workingDays },
            { label: "Present", value: month.summary.present },
            { label: "Late", value: month.summary.late },
            { label: "Absent", value: month.summary.absent },
            { label: "Leave", value: month.summary.leave },
          ].map((item) => (
            <View key={item.label} style={{ width: "33%" }}>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                {item.label}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </Card>

      <Card
        style={{
          backgroundColor: colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.md, gap: design.spacing.sm }}>
          {month.weeks.map((week, idx) => {
            const weekRisk =
              week.absent >= 2
                ? colors.error
                : week.late >= 2
                ? colors.secondary
                : colors.primary;

            return (
              <View key={week.week}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    variant="bodyMedium"
                    style={{ color: colors.onSurface }}
                  >
                    {week.week}
                  </Text>

                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <CheckCircle2 size={14} color={colors.primary} />
                      <Text variant="labelSmall">{week.present}</Text>
                    </View>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Clock size={14} color={colors.secondary} />
                      <Text variant="labelSmall">{week.late}</Text>
                    </View>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <XCircle size={14} color={colors.error} />
                      <Text variant="labelSmall">{week.absent}</Text>
                    </View>
                  </View>
                </View>

                {idx < month.weeks.length - 1 && (
                  <Divider style={{ marginVertical: design.spacing.sm }} />
                )}
              </View>
            );
          })}
        </View>
      </Card>

      {state === "attention" && (
        <Card
          style={{
            backgroundColor: colors.surfaceVariant,
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
            <AlertTriangle size={18} color={colors.error} />
            <Text
              variant="bodyMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              This month’s attendance may require HR review.
            </Text>
          </View>
        </Card>
      )}
    </View>
  );
}
