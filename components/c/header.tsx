import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { CalendarCheck, Receipt, Clock, Briefcase } from "lucide-react-native";
import { useDesign } from "../../contexts/designContext";
import SectionSwitcher, {
  SectionItem,
} from "../../components/shared/sectionSwitch";

type ManageTab = "leave" | "claim" | "overtime" | "work";

type HeaderProps = {
  activeTab: ManageTab;
  onTabChange: (tab: ManageTab) => void;
};

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { colors } = useTheme();
  const { design } = useDesign();

  const sections: SectionItem<ManageTab>[] = [
    {
      key: "leave",
      label: "Leave",
      hint: "Balance & applications overview",
      icon: CalendarCheck,
    },
    {
      key: "claim",
      label: "Claim",
      hint: "Expenses & reimbursement status",
      icon: Receipt,
    },
    {
      key: "overtime",
      label: "Overtime",
      hint: "Extra hours & approvals",
      icon: Clock,
    },
    {
      key: "work",
      label: "Work",
      hint: "Work requests & logs",
      icon: Briefcase,
    },
  ];

  return (
    <View style={{ marginBottom: design.spacing.md }}>
      <SectionSwitcher
        value={activeTab}
        items={sections}
        onChange={onTabChange}
        title="You’re viewing"
      />
    </View>
  );
}
