import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import {
  CalendarCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import StatusFilter from "../shared/statusFilter";
import NoDataUI from "../shared/nodataUI";
import useLeave from "../../hooks/useLeave";
import { router } from "expo-router";

type Status = "all" | "pending" | "approved" | "cancelled";

export default function LeaveUI() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { balances, applications, initialForm } = useLeave();
  const [expanded, setExpanded] = useState(false);
  const [form] = useState(initialForm);
  const [statusFilter, setStatusFilter] = useState<Status>("all");

  const primaryBalance = balances[0];
  const pendingCount = applications.filter(
    (a) => a.status === "pending"
  ).length;

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter((a) => a.status === statusFilter);

  const displayApplications = expanded
    ? filteredApplications
    : filteredApplications.slice(0, 3);

  return (
    <View>
      <View style={{ gap: design.spacing.sm }}>
        <View style={{ flexDirection: "row", gap: design.spacing.md }}>
          <View
            style={{
              flex: 1.2,
              padding: design.spacing.md,
              borderRadius: design.radii.xl,
              backgroundColor: colors.primaryContainer,
              justifyContent: "space-between",
              minHeight: 160,
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
                {primaryBalance?.remaining ?? 0}
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
            }}
          >
            <Clock
              size={32}
              color={colors.onSecondaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: colors.onSecondaryContainer }}
              >
                {pendingCount}
              </Text>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Pending requests
              </Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => router.push("/(tabs)/c/leaveForm")}
          icon={({ size, color }) => <Plus size={size} color={color} />}
          contentStyle={{ gap: design.spacing.xs }}
          style={{ width: "100%" }}
        >
          Apply leave
        </Button>
      </View>

      <View style={{ paddingVertical: design.spacing.md }}>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />

        {filteredApplications.length === 0 ? (
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
                  backgroundColor: colors.surface,
                }}
              >
                <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                  {item.type}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  {item.dateRange}
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: colors.primary, marginTop: 4 }}
                >
                  {item.status}
                </Text>
              </View>
            ))}

            {filteredApplications.length > 3 && (
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
              >
                {expanded ? "Show less" : "See more"}
              </Button>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
