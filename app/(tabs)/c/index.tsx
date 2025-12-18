import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/c/header";
import LeaveUI from "../../../components/c/leaveUI";
import ClaimUI from "../../../components/c/claimUI";
import OvertimeUI from "../../../components/c/overtimeUI";
import WorkUI from "../../../components/c/workUI";

type ManageTab = "leave" | "claim" | "overtime" | "work";

export default function Apply() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const [activeTab, setActiveTab] = useState<ManageTab>("leave");

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

      {activeTab === "leave" && (
        <>
          <LeaveUI />
        </>
      )}

      {activeTab === "claim" && <ClaimUI />}

      {activeTab === "overtime" && <OvertimeUI />}

      {activeTab === "work" && <WorkUI />}
    </ScrollView>
  );
}
