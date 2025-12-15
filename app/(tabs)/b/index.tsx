import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import useAttendance from "../../../hooks/useAttendance";
import { Clock, Calendar } from "lucide-react-native";

export default function Attendance() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const { today, summary, records } = useAttendance();

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
      <SectionHeader
        title="Today"
        subtitle="Your attendance status"
        icon={Clock}
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
          marginBottom: design.spacing.lg,
        }}
      >
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          {today.checkedIn
            ? `Checked in at ${today.checkInTime} (${today.workType})`
            : "You have not checked in yet."}
        </Text>
      </View>

      <SectionHeader
        title="This Month"
        subtitle="Attendance summary"
        icon={Calendar}
      />

      <View
        style={{
          padding: design.spacing.md,
          borderRadius: design.radii.lg,
          backgroundColor: theme.colors.surfaceVariant,
          marginBottom: design.spacing.lg,
        }}
      >
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Working days: {summary.workingDays}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          On time: {summary.onTime}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Late: {summary.late}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          WFH: {summary.wfh}
        </Text>
        <Text
          variant="bodySmall"
          style={{ color: theme.colors.onSurfaceVariant }}
        >
          Absent: {summary.absent}
        </Text>
      </View>

      <SectionHeader
        title="Records"
        subtitle="Daily attendance"
        icon={Calendar}
      />

      {records.map((item) => (
        <View
          key={item.id}
          style={{
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surfaceVariant,
            marginBottom: design.spacing.sm,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onBackground }}
            >
              {item.date}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {item.status}
            </Text>
          </View>

          {item.note && (
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginTop: 4,
              }}
            >
              {item.note}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
