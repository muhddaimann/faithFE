import { useState, useMemo } from "react";

export type LeaveBalance = {
  type: string;
  label: string;
  remaining: number;
};

export type LeaveApplicationStatus = "pending" | "approved" | "rejected";

export type LeaveApplication = {
  id: string;
  type: string;
  dateRange: string;
  status: LeaveApplicationStatus;
};

export type ApplyLeaveForm = {
  type: string;
  startDate: string;
  endDate: string;
  reason?: string;
};

const mockBalances: LeaveBalance[] = [
  {
    type: "annual",
    label: "Annual Leave",
    remaining: 12,
  },
];

const mockApplications: LeaveApplication[] = [
  {
    id: "l1",
    type: "Annual Leave",
    dateRange: "12 Mar 2025 → 14 Mar 2025",
    status: "pending",
  },
  {
    id: "l2",
    type: "Annual Leave",
    dateRange: "02 Feb 2025 → 03 Feb 2025",
    status: "approved",
  },
  {
    id: "l3",
    type: "Annual Leave",
    dateRange: "10 Jan 2025 → 10 Jan 2025",
    status: "rejected",
  },
  {
    id: "l4",
    type: "Annual Leave",
    dateRange: "18 Dec 2024 → 20 Dec 2024",
    status: "approved",
  },
];

export default function useLeave() {
  const [useMock, setUseMock] = useState(true);

  const [realBalances, setRealBalances] = useState<LeaveBalance[]>([]);
  const [realApplications, setRealApplications] = useState<LeaveApplication[]>(
    []
  );

  const balances = useMemo(
    () => (useMock ? mockBalances : realBalances),
    [useMock, realBalances]
  );

  const applications = useMemo(
    () => (useMock ? mockApplications : realApplications),
    [useMock, realApplications]
  );

  const initialForm: ApplyLeaveForm = {
    type: "annual",
    startDate: "",
    endDate: "",
    reason: "",
  };

  const submitLeave = async (form: ApplyLeaveForm) => {
    if (useMock) return true;

    const newApplication: LeaveApplication = {
      id: `l${realApplications.length + 1}`,
      type: "Annual Leave",
      dateRange: `${form.startDate} → ${form.endDate}`,
      status: "pending",
    };

    setRealApplications((prev) => [newApplication, ...prev]);
    return true;
  };

  const toggleMock = () => setUseMock((prev) => !prev);

  return {
    useMock,
    toggleMock,
    balances,
    applications,
    initialForm,
    submitLeave,
  };
}
