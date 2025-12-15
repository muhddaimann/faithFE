import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { Text, Button } from "react-native-paper";
import {
  Briefcase,
  CheckCircle,
  Plus,
  ChevronDown,
  ChevronUp,
  Menu,
} from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";
import SectionHeader from "../shared/sectionHeader";
import NoDataUI from "../shared/nodataUI";
import useWork from "../../hooks/useWork";

export default function WorkUI() {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const { summary, items, initialForm, submitWork, toggleMock } = useWork();

  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState(initialForm);

  const displayItems = expanded ? items : items.slice(0, 3);

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
          <Briefcase
            size={32}
            color={theme.colors.onPrimaryContainer}
            style={{ alignSelf: "flex-end" }}
          />

          <View>
            <Text
              variant="displaySmall"
              style={{ color: theme.colors.onPrimaryContainer }}
            >
              {summary.completed}
            </Text>
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Tasks completed
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
            <CheckCircle
              size={24}
              color={theme.colors.onSecondaryContainer}
              style={{ alignSelf: "flex-end" }}
            />

            <View>
              <Text
                variant="headlineLarge"
                style={{ color: theme.colors.onSecondaryContainer }}
              >
                {summary.inProgress}
              </Text>
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                In progress
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => submitWork(form)}
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
              Log work
            </Text>
          </Pressable>
        </View>
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
                backgroundColor: theme.colors.surfaceVariant,
              }}
            >
              <Menu size={18} color={theme.colors.onSurfaceVariant} />
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
                  backgroundColor: theme.colors.surface,
                }}
              >
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onSurface }}
                >
                  {item.title}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.date} · {item.hours}h
                </Text>
                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.primary, marginTop: 4 }}
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
