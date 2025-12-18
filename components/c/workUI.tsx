import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import {
  Briefcase,
  Clock,
  Plus,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react-native";
import { router } from "expo-router";
import { useDesign } from "../../contexts/designContext";
import SectionHeader from "../shared/sectionHeader";
import NoDataUI from "../shared/nodataUI";
import useWork from "../../hooks/useWork";

export default function WorkUI() {
  const { colors } = useTheme();
  const { design } = useDesign();
  const { summary, items, initialForm, submitWork, toggleMock } = useWork();
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState(initialForm);

  const workCount = summary?.total ?? items.length;
  const pendingWork = items.filter((i) => i.status === "pending").length;

  const displayItems = expanded ? items : items.slice(0, 3);

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
            <Briefcase
              size={32}
              color={colors.onPrimaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: colors.onPrimaryContainer }}
              >
                {workCount}
              </Text>
              <Text
                variant="labelMedium"
                style={{ color: colors.onSurfaceVariant }}
              >
                Work requests
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
              size={24}
              color={colors.onSecondaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: colors.onSecondaryContainer }}
              >
                {pendingWork}
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
          onPress={() => router.push("/(tabs)/c/workForm")}
          icon={({ size, color }) => <Plus size={size} color={color} />}
          contentStyle={{ gap: design.spacing.xs }}
          style={{ width: "100%" }}
        >
          Apply work
        </Button>
      </View>

      <View style={{ paddingVertical: design.spacing.md }}>
        <SectionHeader
          title="Work"
          subtitle="Tasks & logs"
          icon={Briefcase}
          rightSlot={
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.surfaceVariant,
              }}
            >
              <Menu size={18} color={colors.onSurfaceVariant} />
            </View>
          }
        />

        {items.length === 0 ? (
          <NoDataUI
            title="No work records"
            description="Your work logs will appear here."
          />
        ) : (
          <View style={{ gap: design.spacing.sm }}>
            {displayItems.map((item) => (
              <View
                key={item.id}
                style={{
                  padding: design.spacing.md,
                  borderRadius: design.radii.lg,
                  backgroundColor: colors.surface,
                }}
              >
                <Text variant="bodyMedium" style={{ color: colors.onSurface }}>
                  {item.title}
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

            {items.length > 3 && (
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
