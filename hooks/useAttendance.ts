import { useMemo, useState } from "react";

export type AttendanceView = "daily" | "weekly" | "monthly";

export type DailyState =
  | "scheduled"
  | "working"
  | "completed"
  | "autoCompleted"
  | "absent"
  | "onLeave";

export type DailyAttendance = {
  date: string;
  schedule: {
    start: string;
    end: string;
  };
  checkIn?: string;
  checkOut?: string;
  state: DailyState;
};

export type WeeklyAttendance = {
  weekLabel: string;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  totalHours: number;
};

export type MonthlyAttendance = {
  monthLabel: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  totalHours: number;
};

const stateOrder: DailyState[] = [
  "scheduled",
  "working",
  "completed",
  "autoCompleted",
  "absent",
  "onLeave",
];

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (mins: number) => {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateCheckIn = (start: string) => {
  const base = toMinutes(start);
  const isLate = Math.random() < 0.6;
  const offset = isLate ? randomBetween(1, 30) : randomBetween(-5, 5);
  return toTime(base + offset);
};

const generateCheckOut = (end: string) => {
  const base = toMinutes(end);
  const offset = randomBetween(-10, 20);
  return toTime(base + offset);
};

export default function useAttendance() {
  const [view, setView] = useState<AttendanceView>("daily");

  const [daily, setDaily] = useState<DailyAttendance>({
    date: "Monday, Mar 18",
    schedule: {
      start: "09:00",
      end: "18:00",
    },
    state: "scheduled",
  });

  const weekly: WeeklyAttendance = {
    weekLabel: "18–22 Mar",
    totalDays: 5,
    presentDays: 4,
    absentDays: 0,
    leaveDays: 1,
    totalHours: 36,
  };

  const monthly: MonthlyAttendance = {
    monthLabel: "March 2025",
    workingDays: 22,
    presentDays: 18,
    absentDays: 2,
    leaveDays: 2,
    totalHours: 144,
  };

  const checkIn = () => {
    setDaily((prev) => ({
      ...prev,
      state: "working",
      checkIn: generateCheckIn(prev.schedule.start),
    }));
  };

  const checkOut = () => {
    setDaily((prev) => ({
      ...prev,
      state: "completed",
      checkOut: generateCheckOut(prev.schedule.end),
    }));
  };

  const autoCompleteDay = () => {
    setDaily((prev) => ({
      ...prev,
      state: "autoCompleted",
      checkOut: "23:59",
    }));
  };

  const nextState = () => {
    setDaily((prev) => {
      const idx = stateOrder.indexOf(prev.state);
      const next = stateOrder[(idx + 1) % stateOrder.length];

      if (next === "scheduled") {
        return {
          ...prev,
          state: next,
          checkIn: undefined,
          checkOut: undefined,
        };
      }

      if (next === "working") {
        return {
          ...prev,
          state: next,
          checkIn: generateCheckIn(prev.schedule.start),
          checkOut: undefined,
        };
      }

      if (next === "completed") {
        return {
          ...prev,
          state: next,
          checkIn: prev.checkIn ?? generateCheckIn(prev.schedule.start),
          checkOut: generateCheckOut(prev.schedule.end),
        };
      }

      if (next === "autoCompleted") {
        return {
          ...prev,
          state: next,
          checkIn: prev.checkIn ?? generateCheckIn(prev.schedule.start),
          checkOut: "23:59",
        };
      }

      if (next === "absent") {
        return {
          ...prev,
          state: next,
          checkIn: undefined,
          checkOut: undefined,
        };
      }

      return {
        ...prev,
        state: "onLeave",
        checkIn: undefined,
        checkOut: undefined,
      };
    });
  };

  const canCheckIn = daily.state === "scheduled";
  const canCheckOut = daily.state === "working";

  const statusLabel = useMemo(() => {
    switch (daily.state) {
      case "scheduled":
        return "Scheduled workday";
      case "working":
        return "Working";
      case "completed":
        return "Completed";
      case "autoCompleted":
        return "Completed (auto)";
      case "absent":
        return "Absent";
      case "onLeave":
        return "On leave";
      default:
        return "";
    }
  }, [daily.state]);

  return {
    view,
    setView,

    daily,
    weekly,
    monthly,

    canCheckIn,
    canCheckOut,
    statusLabel,

    checkIn,
    checkOut,
    autoCompleteDay,
    nextState,
  };
}
