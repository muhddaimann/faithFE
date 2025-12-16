import React from "react";
import { View, Pressable } from "react-native";
import { Text, Card } from "react-native-paper";
import { Bell, Check } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";
import NoDataUI from "../shared/nodataUI";
import useAnnouncement, { AnnouncementItem } from "../../hooks/useAnnouncement";

type AnnouncementUIProps = {
  items?: AnnouncementItem[];
};

export default function AnnouncementUI({ items }: AnnouncementUIProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const { announcements, markAllAsRead } = useAnnouncement();

  const data = (items ?? announcements).slice(0, 3);

  if (data.length === 0) {
    return (
      <NoDataUI
        title="No announcements"
        description="Company updates will appear here when available."
      />
    );
  }

  return (
    <View style={{ gap: design.spacing.sm }}>
      {data.map((item) => (
        <Card
          key={item.id}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: design.radii.lg,
            opacity: item.read ? 0.6 : 1,
          }}
        >
          <View style={{ padding: design.spacing.md, gap: design.spacing.xs }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: design.spacing.sm,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onSurface, flex: 1 }}
              >
                {item.title}
              </Text>

              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.primaryContainer,
                }}
              >
                <Bell size={14} color={theme.colors.onPrimaryContainer} />
              </View>
            </View>

            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.summary}
            </Text>

            {item.date && (
              <Text
                variant="labelSmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {item.date}
              </Text>
            )}
          </View>
        </Card>
      ))}

      <Pressable
        onPress={markAllAsRead}
        style={{
          paddingVertical: design.spacing.sm,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.secondaryContainer,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: design.spacing.xs,
        }}
      >
        <Check size={16} color={theme.colors.onSecondaryContainer} />
        <Text
          variant="labelMedium"
          style={{ color: theme.colors.onSecondaryContainer }}
        >
          Mark all as read
        </Text>
      </Pressable>
    </View>
  );
}
