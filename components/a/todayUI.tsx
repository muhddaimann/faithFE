import React, { useState, useMemo } from "react";
import { View, Pressable } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import {
  CalendarOff,
  LogIn,
  LogOut,
  AlertCircle,
  CalendarCheck,
  Plane,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";

type TodayState =
  | "publicHoliday"
  | "scheduled"
  | "working"
  | "completed"
  | "absent"
  | "onLeave";

export default function TodayUI() {
  const { colors } = useTheme();
  const { design } = useDesign();

  const [state, setState] = useState<TodayState>("scheduled");

  const now = useMemo(() => new Date(), [state]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

  const checkInTime = formatTime(now);
  const checkOutTime = formatTime(new Date(now.getTime() + 9 * 60 * 60 * 1000));

  const STATE_ORDER: TodayState[] = [
    "scheduled",
    "working",
    "completed",
    "absent",
    "onLeave",
    "publicHoliday",
  ];

  const STATUS_META_MAP: Record<
    TodayState,
    {
      icon: React.ComponentType<{ size?: number; color?: string }>;
      color: string;
      label: string;
      subtitle: string;
      extra?: string;
    }
  > = {
    scheduled: {
      icon: CalendarCheck,
      color: colors.primary,
      label: "Scheduled",
      subtitle: "Ready to start work",
      extra: "Shift · 09:00 – 18:00",
    },
    working: {
      icon: LogIn,
      color: colors.primary,
      label: "Working",
      subtitle: "Work in progress",
      extra: "Shift · 09:00 – 18:00",
    },
    completed: {
      icon: LogOut,
      color: colors.secondary,
      label: "Completed",
      subtitle: "Workday finished",
      extra: "Total · 9h",
    },
    absent: {
      icon: AlertCircle,
      color: colors.error,
      label: "Absent",
      subtitle: "No attendance recorded",
    },
    onLeave: {
      icon: Plane,
      color: colors.tertiary,
      label: "On leave",
      subtitle: "Approved leave",
      extra: "Annual Leave",
    },
    publicHoliday: {
      icon: CalendarOff,
      color: colors.secondary,
      label: "Public holiday",
      subtitle: "No work required",
      extra: "Malaysia Day",
    },
  };

  const STATUS_META = STATUS_META_MAP[state] ?? STATUS_META_MAP.publicHoliday;
  const StatusIcon = STATUS_META.icon;

  const canCheckIn = state === "scheduled";
  const canCheckOut = state === "working";

  return (
    <View style={{ marginBottom: design.spacing.lg }}>
      <Card
        style={{
          backgroundColor: colors.surface,
          borderRadius: design.radii.xl,
        }}
      >
        <View style={{ padding: design.spacing.lg, gap: design.spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text variant="titleLarge">{formatDate(now)}</Text>
              <Text
                variant="bodySmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Daily attendance
              </Text>
            </View>

            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: STATUS_META.color,
              }}
            >
              <StatusIcon size={20} color={colors.onPrimary} />
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: design.radii.lg,
            }}
          >
            <View
              style={{
                padding: design.spacing.md,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: design.spacing.md,
              }}
            >
              <View style={{ flex: 1, gap: 2 }}>
                <Text variant="labelLarge" style={{ color: STATUS_META.color }}>
                  {STATUS_META.label}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  {STATUS_META.subtitle}
                </Text>
              </View>

              {STATUS_META.extra && (
                <View
                  style={{
                    paddingHorizontal: design.spacing.sm,
                    paddingVertical: design.spacing.xs,
                    borderRadius: design.radii.full,
                    backgroundColor: colors.surface,
                  }}
                >
                  <Text
                    variant="labelSmall"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    {STATUS_META.extra}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {(state === "scheduled" ||
            state === "working" ||
            state === "completed") && (
            <View style={{ flexDirection: "row", gap: design.spacing.md }}>
              <Pressable
                onPress={canCheckIn ? () => setState("working") : undefined}
                disabled={!canCheckIn}
                style={{
                  flex: 1,
                  padding: design.spacing.md,
                  borderRadius: design.radii.xl,
                  backgroundColor: canCheckIn
                    ? colors.primaryContainer
                    : colors.surfaceVariant,
                  opacity: canCheckIn ? 1 : 0.6,
                }}
              >
                <LogIn
                  size={24}
                  color={
                    canCheckIn
                      ? colors.onPrimaryContainer
                      : colors.onSurfaceVariant
                  }
                  style={{ alignSelf: "flex-end" }}
                />
                <Text
                  variant="labelMedium"
                  style={{
                    color: canCheckIn
                      ? colors.onPrimaryContainer
                      : colors.onSurfaceVariant,
                  }}
                >
                  Check in
                </Text>
                <Text
                  variant="headlineSmall"
                  style={{
                    color: canCheckIn
                      ? colors.onPrimaryContainer
                      : colors.onSurface,
                  }}
                >
                  {state === "working" || state === "completed"
                    ? checkInTime
                    : "Tap to check in"}
                </Text>
              </Pressable>

              {state !== "scheduled" && (
                <Pressable
                  onPress={
                    canCheckOut ? () => setState("completed") : undefined
                  }
                  disabled={!canCheckOut}
                  style={{
                    flex: 1,
                    padding: design.spacing.md,
                    borderRadius: design.radii.xl,
                    backgroundColor: canCheckOut
                      ? colors.secondaryContainer
                      : colors.surfaceVariant,
                    opacity: canCheckOut ? 1 : 0.6,
                  }}
                >
                  <LogOut
                    size={24}
                    color={
                      canCheckOut
                        ? colors.onSecondaryContainer
                        : colors.onSurfaceVariant
                    }
                    style={{ alignSelf: "flex-end" }}
                  />
                  <Text
                    variant="labelMedium"
                    style={{
                      color: canCheckOut
                        ? colors.onSecondaryContainer
                        : colors.onSurfaceVariant,
                    }}
                  >
                    Check out
                  </Text>
                  <Text
                    variant="headlineSmall"
                    style={{
                      color: canCheckOut
                        ? colors.onSecondaryContainer
                        : colors.onSurface,
                    }}
                  >
                    {state === "completed" ? checkOutTime : "Tap to check out"}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {(state === "onLeave" ||
            state === "absent" ||
            state === "publicHoliday") && (
            <Text
              variant="bodyMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              {state === "onLeave"
                ? "No attendance actions are required today."
                : state === "publicHoliday"
                ? "Enjoy your holiday."
                : "This day will be recorded as absent."}
            </Text>
          )}
        </View>
      </Card>
    </View>
  );
}
