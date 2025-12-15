import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, Button } from "react-native-paper";
import {
  CalendarCheck,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";
import SectionHeader from "../shared/sectionHeader";
import NoDataUI from "../shared/nodataUI";
import useLeave from "../../hooks/useLeave";

export default function LeaveUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const { balances, applications, initialForm, submitLeave, toggleMock } =
    useLeave();

  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState(initialForm);

  const primaryBalance = balances[0];
  const pendingCount = applications.filter(
    (a) => a.status === "pending"
  ).length;

  const displayApplications = expanded
    ? applications
    : applications.slice(0, 3);

  return (
    <View>
      <View style={{ flexDirection: "row", gap: design.spacing.md }}>
        <View
          style={{
            flex: 1,
            padding: design.spacing.lg,
            borderRadius: design.radii.xl,
            backgroundColor: theme.colors.primaryContainer,
            justifyContent: "space-between",
            minHeight: 140,
          }}
        >
          <CalendarCheck
            size={32}
            color={theme.colors.onPrimaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="displaySmall"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {primaryBalance?.remaining ?? 0}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Annual leave remaining
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, gap: design.spacing.md }}>
          <View
            style={{
              flex: 1,
              padding: design.spacing.md,
              borderRadius: design.radii.lg,
              backgroundColor: theme.colors.secondaryContainer,
              justifyContent: "space-between",
            }}
          >
            <Clock
              size={24}
              color={theme.colors.onSecondaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {pendingCount}
              </Text>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Pending requests
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => submitLeave(form)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: design.spacing.xs,
              paddingVertical: design.spacing.md,
              borderRadius: design.radii.lg,
              backgroundColor: theme.colors.primary,
            }}
          >
            <Plus size={18} color={theme.colors.onPrimary} />
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.onPrimary }}
            >
              Apply leave
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingVertical: design.spacing.md }}>
        <SectionHeader
          title="Leave"
          subtitle="Balance & applications"
          icon={CalendarCheck}
          rightSlot={
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.surfaceVariant,
              }}
            >
              <Menu size={18} color={theme.colors.onSurfaceVariant} />
            </View>
          }
        />

        {applications.length === 0 ? (
          <NoDataUI
            title="No leave applications"
            description="Your leave history will appear here once you apply."
          />
        ) : (
          <View style={{ gap: design.spacing.sm }}>
            {displayApplications.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: design.spacing.md,
                  borderRadius: design.radii.lg,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {item.type}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.dateRange}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.primary, marginTop: 4 }}
                >
                  {item.status}
                </Text>
              </View>
            ))}

            {applications.length > 3 && (
              <Button
                mode="contained"
                onPress={() => setExpanded(!expanded)}
                icon={({ size, color }) =>
                  expanded ? (
                    <ChevronUp size={size} color={color} />
                  ) : (
                    <ChevronDown size={size} color={color} />
                  )
                }
                style={{ width: "100%" }}
              >
                {expanded ? "Show less" : "See more"}
              </Button>
            )}
          </View>
        )}
      </View>

      <Button mode="elevated" onPress={toggleMock} style={{ width: "100%" }}>
        Next state
      </Button>
    </View>
  );
}
