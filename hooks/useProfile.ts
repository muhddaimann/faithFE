export type EmployeeProfile = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  employeeId: string;
  joinDate: string;
};

export type Payslip = {
  id: string;
  month: string;
  netPay: string;
};

export type Document = {
  id: string;
  title: string;
  type: "payslip" | "contract" | "policy";
  date: string;
};

export type AppPreference = {
  darkMode: boolean;
  notifications: boolean;
};

export default function useProfile() {
  const profile: EmployeeProfile = {
    id: "u1",
    name: "Aiman Rahman",
    role: "UI/UX Designer",
    department: "Product",
    email: "aiman@company.com",
    employeeId: "EMP-042",
    joinDate: "12 Feb 2024",
  };

  const payslips: Payslip[] = [
    { id: "p1", month: "August 2025", netPay: "MYR 4,200" },
    { id: "p2", month: "July 2025", netPay: "MYR 4,180" },
    { id: "p3", month: "June 2025", netPay: "MYR 4,150" },
  ];

  const documents: Document[] = [
    {
      id: "d1",
      title: "Employment Contract",
      type: "contract",
      date: "12 Feb 2024",
    },
    {
      id: "d2",
      title: "Remote Work Policy",
      type: "policy",
      date: "01 Aug 2025",
    },
  ];

  const preferences: AppPreference = {
    darkMode: true,
    notifications: true,
  };

  const updatePreferences = async (prefs: AppPreference) => {
    return true;
  };

  return {
    profile,
    payslips,
    documents,
    preferences,
    updatePreferences,
  };
}
