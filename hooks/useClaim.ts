import { useState, useMemo } from "react";

export type ClaimCategory = "travel" | "meal" | "medical" | "other";

export type ClaimStatus = "pending" | "approved" | "rejected";

export type ClaimBalance = {
  category: ClaimCategory;
  label: string;
  remaining: number;
};

export type ClaimItem = {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: ClaimStatus;
};

export type ApplyClaimForm = {
  category: ClaimCategory;
  amount: number;
  date: string;
  remark?: string;
};

const mockBalances: ClaimBalance[] = [
  {
    category: "travel",
    label: "Travel Claim",
    remaining: 800,
  },
];

const mockClaims: ClaimItem[] = [
  {
    id: "c1",
    title: "Client meeting transport",
    amount: 120,
    date: "12 Mar 2025",
    status: "pending",
  },
  {
    id: "c2",
    title: "Team lunch",
    amount: 85,
    date: "02 Feb 2025",
    status: "approved",
  },
  {
    id: "c3",
    title: "Medical receipt",
    amount: 200,
    date: "10 Jan 2025",
    status: "rejected",
  },
  {
    id: "c4",
    title: "Taxi reimbursement",
    amount: 60,
    date: "18 Dec 2024",
    status: "approved",
  },
];

export default function useClaim() {
  const [useMock, setUseMock] = useState(true);

  const [realBalances, setRealBalances] = useState<ClaimBalance[]>([]);
  const [realClaims, setRealClaims] = useState<ClaimItem[]>([]);

  const balances = useMemo(
    () => (useMock ? mockBalances : realBalances),
    [useMock, realBalances]
  );

  const claims = useMemo(
    () => (useMock ? mockClaims : realClaims),
    [useMock, realClaims]
  );

  const initialForm: ApplyClaimForm = {
    category: "travel",
    amount: 0,
    date: "",
    remark: "",
  };

  const submitClaim = async (form: ApplyClaimForm) => {
    if (useMock) return true;

    const newClaim: ClaimItem = {
      id: `c${realClaims.length + 1}`,
      title: form.remark || "New claim",
      amount: form.amount,
      date: form.date,
      status: "pending",
    };

    setRealClaims((prev) => [newClaim, ...prev]);
    return true;
  };

  const toggleMock = () => setUseMock((prev) => !prev);

  return {
    useMock,
    toggleMock,
    balances,
    claims,
    initialForm,
    submitClaim,
  };
}
