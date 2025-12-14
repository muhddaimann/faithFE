import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type MasonryItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type MasonryGridProps = {
  data: MasonryItem[];
};

export default function MasonryGrid({ data }: MasonryGridProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const { left, right } = useMemo(() => {
    const left: MasonryItem[] = [];
    const right: MasonryItem[] = [];

    let leftHeight = 0;
    let rightHeight = 0;

    data.forEach((item) => {
      const estimatedHeight = item.subtitle ? 220 : 200;

      if (leftHeight <= rightHeight) {
        left.push(item);
        leftHeight += estimatedHeight;
      } else {
        right.push(item);
        rightHeight += estimatedHeight;
      }
    });

    return { left, right };
  }, [data]);

  const renderCard = (item: MasonryItem) => (
    <Card
      key={item.id}
      style={{
        marginBottom: design.spacing.md,
        borderRadius: design.radii.lg,
        backgroundColor: theme.colors.surface,
      }}
      elevation={3}
    >
      <View
        style={{
          borderRadius: design.radii.lg,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: "100%",
            aspectRatio: Math.random() * (1.4 - 0.8) + 0.8,
          }}
        />

        <View style={{ padding: design.spacing.sm }}>
          <Text
            variant="titleSmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurface }}
          >
            {item.title}
          </Text>

          {item.subtitle && (
            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>
      </View>
    </Card>
  );

  return (
    <View
      style={{
        flexDirection: "row",
        gap: design.spacing.md,
      }}
    >
      <View style={{ flex: 1 }}>{left.map(renderCard)}</View>

      <View style={{ flex: 1 }}>{right.map(renderCard)}</View>
    </View>
  );
}
