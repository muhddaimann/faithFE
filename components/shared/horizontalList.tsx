import React from "react";
import { ScrollView, View, Image } from "react-native";
import { Card, Text } from "react-native-paper";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";

type HorizontalItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
};

type HorizontalListProps = {
  data?: HorizontalItem[];
};

export default function HorizontalList({ data }: HorizontalListProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: design.spacing.md,
        paddingBottom: design.spacing.sm,
      }}
      style={{
        marginHorizontal: -design.spacing.md,
        marginBottom: design.spacing.lg,
      }}
    >
      {data?.map((item) => (
        <Card
          key={item.id}
          style={{
            width: 200,
            marginRight: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surface,
          }}
          elevation={4}
        >
          <View
            style={{
              borderRadius: design.radii.lg,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 120 }}
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
                  numberOfLines={1}
                  style={{ color: theme.colors.onSurfaceVariant }}
                >
                  {item.subtitle}
                </Text>
              )}
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}
