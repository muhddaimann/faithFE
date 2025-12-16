import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { Bell } from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";
import useAnnouncement, {
  AnnouncementPriority,
  AnnouncementDepartment,
} from "../../../hooks/useAnnouncement";

export default function AnnouncementPage() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();
  const { announcements } = useAnnouncement();
  const [priority, setPriority] = useState<AnnouncementPriority | "all">("all");
  const [department, setDepartment] = useState<AnnouncementDepartment | "all">(
    "all"
  );

  useEffect(() => {
    hide();
    return () => reveal();
  }, [hide, reveal]);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      if (priority !== "all" && a.priority !== priority) return false;
      if (department !== "all" && a.department !== department) return false;
      return true;
    });
  }, [announcements, priority, department]);

  const tabItem = (active: boolean) => ({
    paddingVertical: design.spacing.sm,
    paddingHorizontal: design.spacing.md,
    borderRadius: design.radii.md,
    backgroundColor: active
      ? theme.colors.primaryContainer
      : theme.colors.surface,
    borderWidth: active ? 0 : 1,
    borderColor: theme.colors.outlineVariant,
  });

  const tabText = (active: boolean) => ({
    color: active
      ? theme.colors.onPrimaryContainer
      : theme.colors.onSurfaceVariant,
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ padding: design.spacing.md }}>
        <AppHeader
          title="Broadcast"
          subtitle="Stay updated with company news"
        />

        <View style={{ gap: design.spacing.sm }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: design.spacing.xs }}>
              {(["all", "high", "normal", "low"] as const).map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPriority(p)}
                  style={tabItem(priority === p)}
                >
                  <Text variant="labelMedium" style={tabText(priority === p)}>
                    {p === "all" ? "All priority" : p.toUpperCase()}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: design.spacing.xs }}>
              {(["all", "HR", "IT", "Management"] as const).map((d) => (
                <Pressable
                  key={d}
                  onPress={() => setDepartment(d)}
                  style={tabItem(department === d)}
                >
                  <Text variant="labelMedium" style={tabText(department === d)}>
                    {d === "all" ? "All departments" : d}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ paddingVertical: design.spacing.sm, gap: design.spacing.sm }}>
          {filteredAnnouncements.map((item) => (
            <View
              key={item.id}
              style={{
                padding: design.spacing.md,
                borderRadius: design.radii.lg,
                backgroundColor: theme.colors.surface,
                gap: design.spacing.xs,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: design.spacing.sm,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      item.priority === "high"
                        ? theme.colors.errorContainer
                        : theme.colors.primaryContainer,
                  }}
                >
                  <Bell
                    size={18}
                    color={
                      item.priority === "high"
                        ? theme.colors.onErrorContainer
                        : theme.colors.onPrimaryContainer
                    }
                  />
                </View>

                <View style={{ flex: 1, gap: 2 }}>
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
                    {item.summary}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {item.date && (
                  <Text
                    variant="labelSmall"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    {item.date}
                  </Text>
                )}

                <Text
                  variant="labelSmall"
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.department}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
