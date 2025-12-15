export type LeaveType =
  | "annual"
  | "medical"
  | "emergency"
  | "unpaid"
  | "wfh";

export type LeaveBalance = {
  type: LeaveType;
  label: string;
  remaining: number;
};

export type LeaveApplication = {
  id: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: "pending" | "approved" | "rejected";
};

export type ApplyFormState = {
  type: LeaveType;
  startDate?: string;
  endDate?: string;
  reason: string;
};

export default function useApply() {
  const balances: LeaveBalance[] = [
    { type: "annual", label: "Annual Leave", remaining: 8 },
    { type: "medical", label: "Medical Leave", remaining: 12 },
    { type: "emergency", label: "Emergency Leave", remaining: 3 },
    { type: "unpaid", label: "Unpaid Leave", remaining: 999 },
    { type: "wfh", label: "Work From Home", remaining: 5 },
  ];

  const applications: LeaveApplication[] = [
    {
      id: "l1",
      type: "annual",
      startDate: "18 Sep 2025",
      endDate: "19 Sep 2025",
      days: 2,
      reason: "Family matters",
      status: "approved",
    },
    {
      id: "l2",
      type: "medical",
      startDate: "10 Sep 2025",
      endDate: "10 Sep 2025",
      days: 1,
      reason: "Clinic visit",
      status: "pending",
    },
  ];

  const initialForm: ApplyFormState = {
    type: "annual",
    reason: "",
  };

  const submitLeave = async (form: ApplyFormState) => {
    return true;
  };

  return {
    balances,
    applications,
    initialForm,
    submitLeave,
  };
}
