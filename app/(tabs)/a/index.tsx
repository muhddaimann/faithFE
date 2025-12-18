import React from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Calendar, CalendarCheck, Bell } from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import useHome from "../../../hooks/useHome";
import TodayUI from "../../../components/a/todayUI";
import AttendanceUI from "../../../components/a/attendanceUI";
import LeaveUI from "../../../components/a/leaveUI";
import AnnouncementUI from "../../../components/a/announcementUI";

export default function Home() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const router = useRouter();
  const { attendance, leave } = useHome();

  const attendanceRecords = attendance.map((item) => ({
    id: item.id,
    date: item.date,
    status: item.status,
    checkIn: item.status !== "absent" ? "09:12 AM" : undefined,
    checkOut:
      item.status === "onTime" || item.status === "late"
        ? "06:04 PM"
        : undefined,
  }));

  return (
    <ScrollView
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding: design.spacing.md,
        paddingBottom: design.spacing["2xl"] * 4,
      }}
      onScroll={(e) => updateByOffset(e.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
    >
      <Header />

      <TodayUI />

      <SectionHeader
        title="Leave"
        subtitle="Balance & other applications"
        icon={CalendarCheck}
        onPress={() => router.push("/(tabs)/c")}
      />
      <LeaveUI annualBalance={leave.balance} pendingCount={leave.pending} />

      <SectionHeader
        title="Announcements"
        subtitle="Company updates"
        icon={Bell}
        onPress={() => router.push("/(tabs)/a/announcement")}
      />
      <AnnouncementUI />
    </ScrollView>
  );
}
