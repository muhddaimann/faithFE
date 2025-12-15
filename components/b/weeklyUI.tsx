import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type WeeklyState = "normal" | "partial" | "absentHeavy";

export default function WeeklyUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [state, setState] = useState<WeeklyState>("normal");

  const nextState = () => {
    const order: WeeklyState[] = ["normal", "partial", "absentHeavy"];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const week = {
    range: "Mon, 11 Sep – Fri, 15 Sep",
    summary: {
      workingDays: 5,
      onTime: state === "absentHeavy" ? 1 : 3,
      late: state === "normal" ? 1 : 2,
      absent: state === "normal" ? 0 : state === "partial" ? 1 : 2,
    },
    days:
      state === "absentHeavy"
        ? [
            { day: "Mon", status: "Absent" },
            { day: "Tue", status: "On time" },
            { day: "Wed", status: "Absent" },
            { day: "Thu", status: "Late" },
            { day: "Fri", status: "Absent" },
          ]
        : [
            { day: "Mon", status: "On time" },
            { day: "Tue", status: "Late" },
            { day: "Wed", status: "On time" },
            { day: "Thu", status: state === "partial" ? "Absent" : "On time" },
            { day: "Fri", status: "On time" },
          ],
  };

  const statusMeta = {
    "On time": {
      icon: CheckCircle2,
      color: theme.colors.primary,
    },
    Late: {
      icon: Clock,
      color: theme.colors.secondary,
    },
    Absent: {
      icon: XCircle,
      color: theme.colors.error,
    },
  };

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
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
                {week.range}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Weekly Attendance Overview
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
                {week.summary.onTime}
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
                {week.summary.late}
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
                {week.summary.absent}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Daily breakdown */}
      <Card
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.md, gap: design.spacing.sm }}>
          {week.days.map((item, idx) => {
            const meta = statusMeta[item.status as keyof typeof statusMeta];
            const Icon = meta.icon;

            return (
              <View key={item.day}>
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
                    {item.day}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Icon size={14} color={meta.color} />
                    <Text variant="labelSmall" style={{ color: meta.color }}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                {idx < week.days.length - 1 && (
                  <Divider style={{ marginVertical: design.spacing.sm }} />
                )}
              </View>
            );
          })}
        </View>
      </Card>

      {state === "absentHeavy" && (
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
              High absence detected this week.
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
