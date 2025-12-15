import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import {
  Clock,
  LogIn,
  LogOut,
  AlertCircle,
  CalendarCheck,
} from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type DailyState = "scheduled" | "checkedIn" | "checkedOut" | "absent";

export default function DailyUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [state, setState] = useState<DailyState>("scheduled");

  const nextState = () => {
    const order: DailyState[] = [
      "scheduled",
      "checkedIn",
      "checkedOut",
      "absent",
    ];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const today = {
    date: new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    schedule: "09:00 AM – 06:00 PM",
    checkIn: state !== "scheduled" ? "09:12 AM" : null,
    checkOut: state === "checkedOut" ? "06:04 PM" : null,
  };

  const statusMeta = {
    scheduled: {
      label: "Scheduled workday",
      icon: CalendarCheck,
      color: theme.colors.primary,
    },
    checkedIn: {
      label: "Working",
      icon: LogIn,
      color: theme.colors.primary,
    },
    checkedOut: {
      label: "Completed",
      icon: LogOut,
      color: theme.colors.secondary,
    },
    absent: {
      label: "Absent",
      icon: AlertCircle,
      color: theme.colors.error,
    },
  }[state];

  const StatusIcon = statusMeta.icon;

  return (
    <View style={{ gap: design.spacing.md, marginBottom: design.spacing.lg }}>
      {/* Summary card */}
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
                {today.date}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Daily attendance overview
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
              <Clock size={18} color={theme.colors.onPrimaryContainer} />
            </View>
          </View>

          <Divider />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: design.spacing.sm,
            }}
          >
            <StatusIcon size={16} color={statusMeta.color} />
            <Text variant="bodyMedium" style={{ color: statusMeta.color }}>
              {statusMeta.label}
            </Text>
          </View>

          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Scheduled: {today.schedule}
          </Text>
        </View>
      </Card>

      {/* Check in / out cards */}
      <View style={{ flexDirection: "row", gap: design.spacing.md }}>
        <Card
          style={{
            flex: 1,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: design.radii.lg,
          }}
        >
          <View style={{ padding: design.spacing.md, gap: 6 }}>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Check in
            </Text>

            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface }}
            >
              {today.checkIn ?? "—"}
            </Text>

            {state === "scheduled" && (
              <Button
                mode="contained"
                compact
                icon={() => <LogIn size={14} color={theme.colors.onPrimary} />}
              >
                Check in
              </Button>
            )}
          </View>
        </Card>

        <Card
          style={{
            flex: 1,
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: design.radii.lg,
          }}
        >
          <View style={{ padding: design.spacing.md, gap: 6 }}>
            <Text
              variant="labelSmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Check out
            </Text>

            <Text
              variant="titleMedium"
              style={{ color: theme.colors.onSurface }}
            >
              {today.checkOut ?? "—"}
            </Text>

            {state === "checkedIn" && (
              <Button
                mode="contained-tonal"
                compact
                icon={() => (
                  <LogOut size={14} color={theme.colors.onSecondary} />
                )}
              >
                Check out
              </Button>
            )}
          </View>
        </Card>
      </View>

      {state === "absent" && (
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
              No attendance recorded for this workday.
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
