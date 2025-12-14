import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import AppHeader from "../../../components/shared/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import PromptUI from "../../../components/shared/promptUI";

export default function NearbySuggest() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { hide, reveal } = useTabsUi();

  useEffect(() => {
    hide();
    return () => {
      reveal();
    };
  }, [hide, reveal]);

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 2,
      }}
    >
      <AppHeader
        title="Nearby Suggestions"
        subtitle="Music inspired by where you are"
      />

      <SectionHeader
        title="Location-based discovery"
        subtitle="Enable access to get personalized playlists"
      />

      <PromptUI
        title="Allow location access"
        description="We’ll suggest music based on nearby places, cities, and travel context."
        actionLabel="Enable Location"
        onAction={() => {}}
      />

      <View style={{ height: design.spacing.xl }} />
    </ScrollView>
  );
}
