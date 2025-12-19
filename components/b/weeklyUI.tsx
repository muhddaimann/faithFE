import React, { useMemo } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider, useTheme } from "react-native-paper";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  PalmTree,
  Sun,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import useAttendance from "../../hooks/useAttendance";

type DayType = "Work day" | "Leave" | "Public holiday" | "Off day" | "Absent";

type AttendanceStatus = "On time" | "Late" | "Absent";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

export default function WeeklyUI() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { weekly, nextState } = useAttendance();

  const days = useMemo(() => {
    const dayTypes: DayType[] = [
      "Work day",
      "Leave",
      "Public holiday",
      "Off day",
      "Absent",
    ];

    const attendanceStatuses: AttendanceStatus[] = [
      "On time",
      "Late",
      "Absent",
    ];

    return WEEKDAYS.map((day) => {
      const type = dayTypes[Math.floor(Math.random() * dayTypes.length)];

      return {
        day,
        type,
        attendance:
          type === "Work day"
            ? attendanceStatuses[
                Math.floor(Math.random() * attendanceStatuses.length)
              ]
            : undefined,
      };
    });
  }, [weekly]);

  const summary = useMemo(() => {
    return {
      onTime: days.filter(
        (d) => d.type === "Work day" && d.attendance === "On time"
      ).length,
      late: days.filter((d) => d.type === "Work day" && d.attendance === "Late")
        .length,
      absent: days.filter(
        (d) =>
          d.type === "Absent" ||
          (d.type === "Work day" && d.attendance === "Absent")
      ).length,
    };
  }, [days]);

  const dayTypeMeta: Record<
    DayType,
    { label: string; color: string; icon: any }
  > = {
    "Work day": {
      label: "Work day",
      color: colors.primaryContainer,
      icon: Calendar,
    },
    Leave: {
      label: "Leave",
      color: colors.tertiaryContainer,
      icon: PalmTree,
    },
    "Public holiday": {
      label: "Public holiday",
      color: colors.secondaryContainer,
      icon: Sun,
    },
    "Off day": {
      label: "Off day",
      color: colors.surfaceVariant,
      icon: Calendar,
    },
    Absent: {
      label: "Absent",
      color: colors.errorContainer,
      icon: XCircle,
    },
  };

  const attendanceMeta: Record<
    AttendanceStatus,
    { label: string; color: string; icon: any }
  > = {
    "On time": {
      label: "On time",
      color: colors.primary,
      icon: CheckCircle2,
    },
    Late: {
      label: "Late",
      color: colors.secondary,
      icon: Clock,
    },
    Absent: {
      label: "Absent",
      color: colors.error,
      icon: XCircle,
    },
  };

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
      {/* Header */}
      <Card
        style={{
          backgroundColor: colors.surface,
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
              <Text variant="titleMedium" style={{ color: colors.onSurface }}>
                {weekly.weekLabel}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Weekly attendance
              </Text>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.primary,
              }}
            >
              <Calendar size={18} color={colors.onPrimary} />
            </View>
          </View>

          <Divider />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                On time
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                {summary.onTime}
              </Text>
            </View>

            <View>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Late
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                {summary.late}
              </Text>
            </View>

            <View>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Absent
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                {summary.absent}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Daily breakdown */}
      <Card
        style={{
          backgroundColor: colors.surface,
          borderRadius: design.radii.lg,
        }}
      >
        <View style={{ padding: design.spacing.md, gap: design.spacing.sm }}>
          {days.map((item, idx) => {
            const dayMeta = dayTypeMeta[item.type];
            const attendance =
              item.attendance && attendanceMeta[item.attendance];

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
                    style={{ color: colors.onSurface }}
                  >
                    {item.day}
                  </Text>

                  <View style={{ flexDirection: "row", gap: 8 }}>
                    {/* Day type pill */}
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999,
                        backgroundColor: dayMeta.color,
                      }}
                    >
                      <Text variant="labelSmall">{dayMeta.label}</Text>
                    </View>

                    {/* Attendance pill (only for work day) */}
                    {attendance && (
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 999,
                          backgroundColor: attendance.color + "22",
                        }}
                      >
                        <Text
                          variant="labelSmall"
                          style={{ color: attendance.color }}
                        >
                          {attendance.label}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {idx < days.length - 1 && (
                  <Divider style={{ marginVertical: design.spacing.sm }} />
                )}
              </View>
            );
          })}
        </View>
      </Card>

      <Button mode="elevated" onPress={nextState}>
        Randomize week
      </Button>
    </View>
  );
}
