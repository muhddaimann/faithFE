import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/b/header";
import DailyUI from "../../../components/b/dailyUI";
import WeeklyUI from "../../../components/b/weeklyUI";
import MonthlyUI from "../../../components/b/monthlyUI";

type AttendanceTab = "daily" | "weekly" | "monthly";

export default function Attendance() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const [activeTab, setActiveTab] = useState<AttendanceTab>("daily");

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 3,
      }}
      onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "daily" && <DailyUI />}
      {activeTab === "weekly" && <WeeklyUI />}
      {activeTab === "monthly" && <MonthlyUI />}
    </ScrollView>
  );
}
