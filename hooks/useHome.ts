export type AttendanceStatus = "onTime" | "late" | "wfh" | "absent";

export type TodayStatus = {
  checkedIn: boolean;
  checkInTime?: string;
};

export type AttendanceRecord = {
  id: string;
  date: string;
  status: AttendanceStatus;
};

export type LeaveSummary = {
  balance: number;
  pending: number;
};

export type Announcement = {
  id: string;
  title: string;
  summary: string;
  date: string;
};

export default function useHome() {
  const today: TodayStatus = {
    checkedIn: true,
    checkInTime: "09:12 AM",
  };

  const attendance: AttendanceRecord[] = [
    { id: "1", date: "Mon, 9 Sep", status: "onTime" },
    { id: "2", date: "Tue, 10 Sep", status: "onTime" },
    { id: "3", date: "Wed, 11 Sep", status: "wfh" },
  ];

  const leave: LeaveSummary = {
    balance: 8,
    pending: 1,
  };

  const announcements: Announcement[] = [
    {
      id: "a1",
      title: "Public Holiday Notice",
      summary: "Office will be closed this Friday due to public holiday.",
      date: "12 Sep",
    },
    {
      id: "a2",
      title: "System Maintenance",
      summary: "FAITH will be unavailable from 10 PM to 12 AM tonight.",
      date: "14 Sep",
    },
    {
      id: "a3",
      title: "Policy Update",
      summary: "Updated remote work policy is now available in Documents.",
      date: "16 Sep",
    },
  ];

  return {
    today,
    attendance,
    leave,
    announcements,
  };
}
