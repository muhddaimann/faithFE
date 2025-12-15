import React, { useState, useMemo } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import { CalendarOff, Clock, LogIn, LogOut, Plane } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type TodayState =
  | "publicHoliday"
  | "notCheckedIn"
  | "checkedIn"
  | "checkedOut"
  | "onLeave";

export default function TodayUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [state, setState] = useState<TodayState>("publicHoliday");

  const nextState = () => {
    const order: TodayState[] = [
      "publicHoliday",
      "notCheckedIn",
      "checkedIn",
      "checkedOut",
      "onLeave",
    ];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const now = useMemo(() => new Date(), [state]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formatDate = (d: Date) =>
    d.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
    });

  const checkInTime = formatTime(now);
  const checkOutTime = formatTime(new Date(now.getTime() + 9 * 60 * 60 * 1000));

  const config = {
    publicHoliday: {
      icon: CalendarOff,
      label: "Public Holiday",
      subtitle: "No work required",
    },
    notCheckedIn: {
      icon: Clock,
      label: "Not checked in",
      subtitle: "Workday not started",
    },
    checkedIn: {
      icon: LogIn,
      label: "Checked in",
      subtitle: "Work in progress",
    },
    checkedOut: {
      icon: LogOut,
      label: "Checked out",
      subtitle: "Workday completed",
    },
    onLeave: {
      icon: Plane,
      label: "On leave",
      subtitle: "Approved leave",
    },
  }[state];

  const Icon = config.icon;

  return (
    <View style={{ marginBottom: design.spacing.lg }}>
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.onSurface }}
              >
                {formatDate(now)}
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {config.label} · {config.subtitle}
              </Text>
            </View>

            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.primaryContainer,
              }}
            >
              <Icon size={20} color={theme.colors.onPrimaryContainer} />
            </View>
          </View>

          {state === "publicHoliday" && (
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Enjoy your day off. No check-in or check-out required.
            </Text>
          )}

          {state === "onLeave" && (
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              You are on approved leave today.
            </Text>
          )}

          {(state === "notCheckedIn" ||
            state === "checkedIn" ||
            state === "checkedOut") && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: design.spacing.md,
                }}
              >
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Check in
                  </Text>

                  {state === "notCheckedIn" ? (
                    <Button
                      mode="contained"
                      compact
                      icon={() => (
                        <LogIn size={14} color={theme.colors.onPrimary} />
                      )}
                      buttonColor={theme.colors.primary}
                      onPress={nextState}
                    >
                      Check in
                    </Button>
                  ) : (
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.onSurface }}
                    >
                      {checkInTime}
                    </Text>
                  )}
                </View>

                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Check out
                  </Text>

                  {state === "checkedIn" ? (
                    <Button
                      mode="contained-tonal"
                      compact
                      icon={() => (
                        <LogOut size={14} color={theme.colors.onSecondary} />
                      )}
                      onPress={nextState}
                    >
                      Check out
                    </Button>
                  ) : state === "checkedOut" ? (
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.onSurface }}
                    >
                      {checkOutTime}
                    </Text>
                  ) : (
                    <Text
                      variant="bodyMedium"
                      style={{ color: theme.colors.onSurfaceVariant }}
                    >
                      —
                    </Text>
                  )}
                </View>
              </View>

              <Divider />

              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Work type: OFFICE
              </Text>
            </>
          )}
        </View>
      </Card>

      <Button
        mode="elevated"
        onPress={nextState}
        style={{ marginTop: design.spacing.md }}
      >
        Next state
      </Button>
    </View>
  );
}
