import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, Divider } from "react-native-paper";
import { Calendar, Clock, Home, AlertCircle } from "lucide-react-native";
import { useAppTheme } from "../../contexts/themeContext";
import { useDesign } from "../../contexts/designContext";
import NoDataUI from "../shared/nodataUI";

export type AttendanceStatus = "onTime" | "late" | "wfh" | "absent";

export type AttendanceItem = {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
};

type AttendanceState = "empty" | "normal" | "partial" | "absentOnly";

type AttendanceUIProps = {
  records: AttendanceItem[];
};

export default function AttendanceUI({ records }: AttendanceUIProps) {
  const { theme } = useAppTheme();
  const { design } = useDesign();

  const [state, setState] = useState<AttendanceState>("normal");

  const nextState = () => {
    const order: AttendanceState[] = [
      "empty",
      "normal",
      "partial",
      "absentOnly",
    ];
    const idx = order.indexOf(state);
    setState(order[(idx + 1) % order.length]);
  };

  const demoRecords: Record<AttendanceState, AttendanceItem[]> = {
    empty: [],
    normal: records.slice(0, 3),
    partial: [
      {
        id: "p1",
        date: "Mon, Sep 11",
        checkIn: "09:18 AM",
        status: "onTime",
      },
      {
        id: "p2",
        date: "Tue, Sep 12",
        status: "absent",
      },
    ],
    absentOnly: [
      {
        id: "a1",
        date: "Wed, Sep 13",
        status: "absent",
      },
    ],
  };

  const displayRecords = demoRecords[state];

  const statusMeta = {
    onTime: {
      label: "On time",
      icon: Clock,
      color: theme.colors.primary,
    },
    late: {
      label: "Late",
      icon: AlertCircle,
      color: theme.colors.error,
    },
    wfh: {
      label: "WFH",
      icon: Home,
      color: theme.colors.secondary,
    },
    absent: {
      label: "Absent",
      icon: Calendar,
      color: theme.colors.onSurfaceVariant,
    },
  };

  return (
    <View style={{ marginBottom: design.spacing.lg }}>
      {displayRecords.length === 0 ? (
        <NoDataUI
          title="No attendance records"
          description="Your recent attendance will appear here once available."
        />
      ) : (
        <Card
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: design.radii.lg,
          }}
        >
          <View style={{ padding: design.spacing.md, gap: design.spacing.md }}>
            {displayRecords.map((item, idx) => {
              const meta = statusMeta[item.status];
              const Icon = meta.icon;

              return (
                <View key={item.id}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        variant="bodyMedium"
                        style={{ color: theme.colors.onSurface }}
                      >
                        {item.date}
                      </Text>

                      <Text
                        variant="bodySmall"
                        style={{ color: theme.colors.onSurfaceVariant }}
                      >
                        {item.checkIn && item.checkOut
                          ? `${item.checkIn} → ${item.checkOut}`
                          : item.checkIn
                          ? `Checked in at ${item.checkIn}`
                          : "No record"}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Icon size={14} color={meta.color} />
                      <Text variant="labelSmall" style={{ color: meta.color }}>
                        {meta.label}
                      </Text>
                    </View>
                  </View>

                  {idx < displayRecords.length - 1 && (
                    <Divider style={{ marginVertical: design.spacing.sm }} />
                  )}
                </View>
              );
            })}
          </View>
        </Card>
      )}

      <Button
        mode="elevated"
        onPress={nextState}
        style={{ marginTop: design.spacing.md }}
      >
        Next state
      </Button>
    </View>
  );
}
