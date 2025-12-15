import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { Clock, Calendar, CalendarCheck, Bell } from "lucide-react-native";
import { useAppTheme } from "../../../contexts/themeContext";
import { useDesign } from "../../../contexts/designContext";
import { useTabsUi } from "../../../contexts/tabContext";
import Header from "../../../components/a/header";
import SectionHeader from "../../../components/shared/sectionHeader";
import useHome from "../../../hooks/useHome";
import TodayUI from "../../../components/a/todayUI";

export default function Home() {
  const { theme } = useAppTheme();
  const { design } = useDesign();
  const { updateByOffset } = useTabsUi();
  const router = useRouter();
  const { today, attendance, leave, announcements } = useHome();

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
      <Header />
      <View
        style={{
          paddingBottom: design.spacing.lg,
        }}
      >
        <TodayUI />
      </View>

      <SectionHeader
        title="Attendance"
        subtitle="Your recent records"
        icon={Calendar}
        onPress={() => router.push("/(tabs)/b")}
      />

      {attendance.length ? (
        attendance.map((item) => (
          <View
            key={item.id}
            style={{
              padding: design.spacing.md,
              borderRadius: design.radii.lg,
              backgroundColor: theme.colors.surfaceVariant,
              marginBottom: design.spacing.sm,
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
        ))
      ) : (
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
            No recent attendance records.
          </Text>
        </View>
      )}

      <SectionHeader
        title="Leave"
        subtitle="Balance & requests"
        icon={CalendarCheck}
        onPress={() => router.push("/(tabs)/c")}
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
          Leave balance: {leave.balance} days
        </Text>
        {leave.pending > 0 && (
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}
          >
            {leave.pending} request(s) pending approval
          </Text>
        )}
      </View>

      <SectionHeader
        title="Announcements"
        subtitle="Company updates"
        icon={Bell}
      />

      {announcements.length ? (
        announcements.map((item) => (
          <View
            key={item.id}
            style={{
              padding: design.spacing.md,
              borderRadius: design.radii.lg,
              backgroundColor: theme.colors.surfaceVariant,
              marginBottom: design.spacing.sm,
            }}
          >
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onBackground }}
            >
              {item.title}
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginTop: 2,
              }}
            >
              {item.summary}
            </Text>
          </View>
        ))
      ) : (
        <View
          style={{
            padding: design.spacing.md,
            borderRadius: design.radii.lg,
            backgroundColor: theme.colors.surfaceVariant,
          }}
        >
          <Text
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            No new announcements.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
