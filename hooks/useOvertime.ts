import { useState, useMemo } from "react";

export type OvertimeStatus = "pending" | "approved" | "rejected";

export type OvertimeSummary = {
  totalHours: number;
};

export type OvertimeRecord = {
  id: string;
  date: string;
  hours: number;
  reason: string;
  status: OvertimeStatus;
};

export type ApplyOvertimeForm = {
  date: string;
  hours: number;
  reason?: string;
};

const mockSummary: OvertimeSummary = {
  totalHours: 18,
};

const mockRecords: OvertimeRecord[] = [
  {
    id: "o1",
    date: "15 Mar 2025",
    hours: 3,
    reason: "Release support",
    status: "pending",
  },
  {
    id: "o2",
    date: "05 Mar 2025",
    hours: 2,
    reason: "Bug fixing",
    status: "approved",
  },
  {
    id: "o3",
    date: "22 Feb 2025",
    hours: 4,
    reason: "Client deployment",
    status: "approved",
  },
  {
    id: "o4",
    date: "10 Feb 2025",
    hours: 1.5,
    reason: "Production hotfix",
    status: "rejected",
  },
];

export default function useOvertime() {
  const [useMock, setUseMock] = useState(true);

  const [realSummary, setRealSummary] = useState<OvertimeSummary>({
    totalHours: 0,
  });
  const [realRecords, setRealRecords] = useState<OvertimeRecord[]>([]);

  const summary = useMemo(
    () => (useMock ? mockSummary : realSummary),
    [useMock, realSummary]
  );

  const records = useMemo(
    () => (useMock ? mockRecords : realRecords),
    [useMock, realRecords]
  );

  const initialForm: ApplyOvertimeForm = {
    date: "",
    hours: 0,
    reason: "",
  };

  const submitOvertime = async (form: ApplyOvertimeForm) => {
    if (useMock) return true;

    const newRecord: OvertimeRecord = {
      id: `o${realRecords.length + 1}`,
      date: form.date,
      hours: form.hours,
      reason: form.reason || "Overtime",
      status: "pending",
    };

    setRealRecords((prev) => [newRecord, ...prev]);
    setRealSummary((prev) => ({
      totalHours: prev.totalHours + form.hours,
    }));

    return true;
  };

  const toggleMock = () => setUseMock((prev) => !prev);

  return {
    useMock,
    toggleMock,
    summary,
    records,
    initialForm,
    submitOvertime,
  };
}
