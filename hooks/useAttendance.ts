export type AttendanceStatus = "onTime" | "late" | "wfh" | "absent";

export type TodayAttendance = {
  checkedIn: boolean;
  checkInTime?: string;
  workType?: "office" | "wfh";
};

export type AttendanceRecord = {
  id: string;
  date: string;
  status: AttendanceStatus;
  note?: string;
};

export type AttendanceSummary = {
  workingDays: number;
  onTime: number;
  late: number;
  wfh: number;
  absent: number;
};

export default function useAttendance() {
  const today: TodayAttendance = {
    checkedIn: true,
    checkInTime: "09:12 AM",
    workType: "office",
  };

  const summary: AttendanceSummary = {
    workingDays: 22,
    onTime: 16,
    late: 3,
    wfh: 2,
    absent: 1,
  };

  const records: AttendanceRecord[] = [
    {
      id: "1",
      date: "Mon, 9 Sep",
      status: "onTime",
    },
    {
      id: "2",
      date: "Tue, 10 Sep",
      status: "onTime",
    },
    {
      id: "3",
      date: "Wed, 11 Sep",
      status: "wfh",
      note: "Approved WFH",
    },
    {
      id: "4",
      date: "Thu, 12 Sep",
      status: "late",
      note: "Traffic delay",
    },
    {
      id: "5",
      date: "Fri, 13 Sep",
      status: "absent",
      note: "No record",
    },
  ];

  return {
    today,
    summary,
    records,
  };
}
