import React from "react";
import { View, Pressable } from "react-native";
import { Text, Card, Button, Divider, useTheme } from "react-native-paper";
import {
  Clock,
  LogIn,
  LogOut,
  AlertCircle,
  CalendarCheck,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import useAttendance from "../../hooks/useAttendance";

export default function DailyUI() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const {
    daily,
    canCheckIn,
    canCheckOut,
    statusLabel,
    checkIn,
    checkOut,
    nextState,
  } = useAttendance();

  const statusMeta = {
    scheduled: {
      icon: CalendarCheck,
      color: colors.primary,
      description: "Your workday is scheduled. Please check in when ready.",
    },
    working: {
      icon: LogIn,
      color: colors.primary,
      description: "You’re currently working.",
    },
    completed: {
      icon: LogOut,
      color: colors.secondary,
      description: "Your workday is completed.",
    },
    autoCompleted: {
      icon: LogOut,
      color: colors.secondary,
      description: "Workday was auto-completed by the system.",
    },
    absent: {
      icon: AlertCircle,
      color: colors.error,
      description: "No attendance was recorded for today.",
    },
    onLeave: {
      icon: CalendarCheck,
      color: colors.tertiary,
      description: "You’re on approved leave today.",
    },
  }[daily.state];

  const StatusIcon = statusMeta.icon;
  const showSchedule = daily.state !== "onLeave";

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
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
                {daily.date}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Daily attendance
              </Text>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: statusMeta.color,
              }}
            >
              <StatusIcon size={18} color={colors.onPrimary} />
            </View>
          </View>

          <Divider />

          <View style={{ gap: 4 }}>
            <Text variant="bodyMedium" style={{ color: statusMeta.color }}>
              {statusLabel}
            </Text>

            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              {statusMeta.description}
            </Text>

            {showSchedule && (
              <Text
                variant="bodySmall"
                style={{ color: colors.onSurfaceVariant, marginTop: 4 }}
              >
                Schedule: {daily.schedule.start} – {daily.schedule.end}
              </Text>
            )}
          </View>
        </View>
      </Card>

      {(daily.state === "onLeave" || daily.state === "absent") && (
        <Card
          style={{
            backgroundColor: colors.surfaceVariant,
            borderRadius: design.radii.lg,
          }}
        >
          <View style={{ padding: design.spacing.md }}>
            <Text
              variant="bodyMedium"
              style={{ color: colors.onSurfaceVariant }}
            >
              {daily.state === "onLeave"
                ? "No attendance actions are required today."
                : "This day will be recorded as absent."}
            </Text>
          </View>
        </Card>
      )}

      {(daily.state === "scheduled" ||
        daily.state === "working" ||
        daily.state === "completed" ||
        daily.state === "autoCompleted") && (
        <View style={{ flexDirection: "row", gap: design.spacing.md }}>
          {/* Check in */}
          <Pressable
            disabled={!canCheckIn}
            onPress={canCheckIn ? checkIn : undefined}
            style={{
              flex: 1,
              padding: design.spacing.md,
              borderRadius: design.radii.xl,
              backgroundColor: canCheckIn
                ? colors.primaryContainer
                : colors.surfaceVariant,
              justifyContent: "space-between",
              minHeight: 140,
              opacity: canCheckIn ? 1 : 0.6,
            }}
          >
            <LogIn
              size={28}
              color={
                canCheckIn ? colors.onPrimaryContainer : colors.onSurfaceVariant
              }
              style={{ alignSelf: "flex-end" }}
            />

            <View>
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
                variant="titleMedium"
                style={{
                  color: canCheckIn
                    ? colors.onPrimaryContainer
                    : colors.onSurface,
                }}
              >
                {daily.checkIn ?? "Tap to check in"}
              </Text>
            </View>
          </Pressable>

          {/* Check out */}
          <Pressable
            disabled={!canCheckOut}
            onPress={canCheckOut ? checkOut : undefined}
            style={{
              flex: 1,
              padding: design.spacing.md,
              borderRadius: design.radii.xl,
              backgroundColor: canCheckOut
                ? colors.secondaryContainer
                : colors.surfaceVariant,
              justifyContent: "space-between",
              minHeight: 140,
              opacity: canCheckOut ? 1 : 0.6,
            }}
          >
            <LogOut
              size={28}
              color={
                canCheckOut
                  ? colors.onSecondaryContainer
                  : colors.onSurfaceVariant
              }
              style={{ alignSelf: "flex-end" }}
            />

            <View>
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
                variant="titleMedium"
                style={{
                  color: canCheckOut
                    ? colors.onSecondaryContainer
                    : colors.onSurface,
                }}
              >
                {daily.checkOut ?? "Tap to check out"}
              </Text>
            </View>
          </Pressable>
        </View>
      )}

      <Button mode="elevated" onPress={nextState}>
        Next state
      </Button>
    </View>
  );
}
