import React, { useRef, useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { Text, Card, useTheme } from "react-native-paper";
import { useDesign } from "../../contexts/designContext";
import NoDataUI from "../shared/nodataUI";
import useAnnouncement, {
  AnnouncementItem,
  AnnouncementPriority,
} from "../../hooks/useAnnouncement";

const { width } = Dimensions.get("window");

const CARD_WIDTH = Math.round(width * 0.82);
const CARD_GAP = 16;
const START_PADDING = 16;
const END_GUTTER = width - CARD_WIDTH - START_PADDING;
const AUTO_SCROLL_INTERVAL = 4000;

const PRIORITY_LABEL: Record<AnnouncementPriority, string> = {
  high: "High priority",
  normal: "Announcement",
  low: "FYI",
};

type AnnouncementUIProps = {
  items?: AnnouncementItem[];
};

function toRelativeTime(date?: string) {
  if (!date) return "";
  const diff = Math.max(0, Date.now() - new Date(date).getTime());
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} min ago`;
  return "Just now";
}

export default function AnnouncementUI({ items }: AnnouncementUIProps) {
  const { colors } = useTheme();
  const { design } = useDesign();
  const listRef = useRef<FlatList<AnnouncementItem>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { announcements } = useAnnouncement();
  const data = (items ?? announcements).slice(0, 3);

  useEffect(() => {
    if (data.length <= 1) return;

    const timer = setInterval(() => {
      const next = (activeIndex + 1) % data.length;
      listRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIndex(next);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, data.length]);

  if (data.length === 0) {
    return (
      <NoDataUI
        title="No announcements"
        description="Company updates will appear here when available."
      />
    );
  }
  return (
    <View>
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingLeft: START_PADDING,
          paddingRight: END_GUTTER,
          alignItems: "center",
        }}
        style={{
          alignSelf: "stretch",
        }}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH + CARD_GAP,
          offset: (CARD_WIDTH + CARD_GAP) * index,
          index,
        })}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP)
          );
          setActiveIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: CARD_WIDTH,
              marginRight: index === data.length - 1 ? 0 : CARD_GAP,
              paddingBottom: design.spacing.sm,
            }}
          >
            <Card
              style={{
                borderRadius: design.radii.xl,
                backgroundColor: colors.surface,
                opacity: item.read ? 0.65 : 1,
              }}
            >
              <View
                style={{
                  padding: design.spacing.md,
                  gap: design.spacing.sm,
                }}
              >
                <Text
                  variant="titleSmall"
                  style={{ color: colors.onSurface }}
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <Text
                  variant="bodySmall"
                  style={{ color: colors.onSurfaceVariant }}
                  numberOfLines={3}
                >
                  {item.summary}
                </Text>

                <View
                  style={{
                    marginTop: design.spacing.xs,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    variant="labelSmall"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    {PRIORITY_LABEL[item.priority]} · {item.department}
                  </Text>

                  <Text
                    variant="labelSmall"
                    style={{ color: colors.onSurfaceVariant }}
                  >
                    {toRelativeTime(item.date)}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
      />

      <View
        style={{
          marginBottom: design.spacing.sm,
          flexDirection: "row",
          justifyContent: "center",
          gap: design.spacing.xs,
        }}
      >
        {data.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: idx === activeIndex ? 16 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                idx === activeIndex ? colors.primary : colors.outlineVariant,
            }}
          />
        ))}
      </View>
    </View>
  );
}
