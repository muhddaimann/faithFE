import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { Bell, ChevronDown, ChevronUp } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";
import NoDataUI from "../shared/nodataUI";

export type AnnouncementItem = {
  id: string;
  title: string;
  summary: string;
  date?: string;
};

type AnnouncementUIProps = {
  items: AnnouncementItem[];
};

export default function AnnouncementUI({ items }: AnnouncementUIProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [expanded, setExpanded] = useState(false);
  const displayItems = expanded ? items : items.slice(0, 3);

  if (items.length === 0) {
    return (
      <NoDataUI
        title="No announcements"
        description="Company updates will appear here when available."
      />
    );
  }

  return (
    <View style={{ gap: design.spacing.sm }}>
      {displayItems.map((item) => (
        <Card
          key={item.id}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: design.radii.lg,
          }}
        >
          <View style={{ padding: design.spacing.md, gap: 6 }}>
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
                style={{
                  color: theme.colors.onSurface,
                  flex: 1,
                }}
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

      {items.length > 3 && (
        <Button
          mode="contained"
          icon={() =>
            expanded ? (
              <ChevronUp size={16} color={theme.colors.onPrimary} />
            ) : (
              <ChevronDown size={16} color={theme.colors.onPrimary} />
            )
          }
          onPress={() => setExpanded(!expanded)}
          style={{ width: "100%", marginTop: design.spacing.xs }}
        >
          {expanded ? "Show less" : "See more"}
        </Button>
      )}
    </View>
  );
}
