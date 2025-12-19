import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import {
  Timer,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
  Calendar,
} from "lucide-react-native";
import { router } from "expo-router";
import { useDesign } from "../../contexts/designContext";
import StatusFilter from "../shared/statusFilter";
import NoDataUI from "../shared/nodataUI";
import useOvertime from "../../hooks/useOvertime";

type Status = "all" | "pending" | "approved" | "cancelled";

export default function OvertimeUI() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { summary, records, initialForm, toggleMock } = useOvertime();

  const [expanded, setExpanded] = useState(false);
  const [form] = useState(initialForm);
  const [statusFilter, setStatusFilter] = useState<Status>("all");

  const totalOT = summary?.totalHours ?? 0;
  const pendingOT = records.filter((r) => r.status === "pending").length;

  const filteredRecords =
    statusFilter === "all"
      ? records
      : records.filter((r) => r.status === statusFilter);

  const displayRecords = expanded
    ? filteredRecords
    : filteredRecords.slice(0, 3);

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
            <Clock
              size={32}
              color={colors.onPrimaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: colors.onPrimaryContainer }}
              >
                {totalOT}
              </Text>
              <Text
                variant="labelMedium"
                style={{ color: colors.onSurfaceVariant }}
              >
                OT hours
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
            <Calendar
              size={24}
              color={colors.onSecondaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: colors.onSecondaryContainer }}
              >
                {pendingOT}
              </Text>
              <Text
                variant="labelSmall"
                style={{ color: colors.onSurfaceVariant }}
              >
                Pending
              </Text>
            </View>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => router.push("/(tabs)/c/otForm")}
          icon={({ size, color }) => <Plus size={size} color={color} />}
          contentStyle={{ gap: design.spacing.xs }}
          style={{ width: "100%" }}
        >
          Log overtime
        </Button>
      </View>

      <View style={{ paddingVertical: design.spacing.md }}>
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />

        {filteredRecords.length === 0 ? (
          <NoDataUI
            title="No overtime records"
            description="No records match the selected status."
          />
        ) : (
          <View style={{ gap: design.spacing.sm }}>
            {displayRecords.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: design.spacing.md,
                  borderRadius: design.radii.lg,
                  backgroundColor: colors.surface,
                }}
              >
                <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                  {item.reason}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                >
                  {item.date} · {item.hours}h
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: colors.primary, marginTop: 4 }}
                >
                  {item.status}
                </Text>
              </View>
            ))}

            {filteredRecords.length > 3 && (
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
    </View>
  );
}
