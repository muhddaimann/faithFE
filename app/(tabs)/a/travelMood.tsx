import React, { useEffect, useState } from "react";
import { ScrollView, View, TextInput } from "react-native";
import { Search } from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import SectionHeader from "../../../components/shared/sectionHeader";
import useDiscover from "../../../hooks/useDiscover";
import AppHeader from "../../../components/shared/header";
import MasonryGrid from "../../../components/shared/masonryGrid";

export default function TravelMood() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();
  const { sections } = useDiscover();

  const moods = sections.find((s) => s.key === "moods");
  const [query, setQuery] = useState("");

  useEffect(() => {
    hide();
    return () => {
      reveal();
    };
  }, [hide, reveal]);

  const data =
    query.length > 0
      ? moods?.items?.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        ) ?? []
      : moods?.items ?? [];

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 3,
      }}
      scrollEventThrottle={16}
    >
      <AppHeader title="Travel Moods" subtitle="Soundtracks for every moment" />

      <View
        style={{
          marginBottom: design.spacing.lg,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: design.radii.lg,
            paddingHorizontal: design.spacing.md,
          }}
        >
          <Search size={18} color={theme.colors.onSurfaceVariant} />
          <TextInput
            placeholder="Search mood"
            placeholderTextColor={theme.colors.onSurfaceVariant}
            value={query}
            onChangeText={setQuery}
            style={{
              flex: 1,
              marginLeft: design.spacing.sm,
              color: theme.colors.onSurface,
              height: 44,
            }}
          />
        </View>
      </View>

      <View>
        <SectionHeader
          title="Choose Your Mood"
          subtitle="Match music with how you travel"
        />
      </View>

      <MasonryGrid data={data} />
    </ScrollView>
  );
}
