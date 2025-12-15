import { useState, useMemo } from "react";

export type WorkStatus = "completed" | "in_progress" | "blocked";

export type WorkSummary = {
  completed: number;
  inProgress: number;
};

export type WorkItem = {
  id: string;
  title: string;
  date: string;
  hours: number;
  status: WorkStatus;
};

export type LogWorkForm = {
  title: string;
  date: string;
  hours: number;
};

const mockSummary: WorkSummary = {
  completed: 18,
  inProgress: 4,
};

const mockItems: WorkItem[] = [
  {
    id: "w1",
    title: "Attendance module UI",
    date: "18 Mar 2025",
    hours: 6,
    status: "completed",
  },
  {
    id: "w2",
    title: "Leave flow refinement",
    date: "16 Mar 2025",
    hours: 4,
    status: "completed",
  },
  {
    id: "w3",
    title: "Claim module skeleton",
    date: "14 Mar 2025",
    hours: 3,
    status: "in_progress",
  },
  {
    id: "w4",
    title: "API integration",
    date: "12 Mar 2025",
    hours: 2,
    status: "blocked",
  },
];

export default function useWork() {
  const [useMock, setUseMock] = useState(true);

  const [realSummary, setRealSummary] = useState<WorkSummary>({
    completed: 0,
    inProgress: 0,
  });
  const [realItems, setRealItems] = useState<WorkItem[]>([]);

  const summary = useMemo(
    () => (useMock ? mockSummary : realSummary),
    [useMock, realSummary]
  );

  const items = useMemo(
    () => (useMock ? mockItems : realItems),
    [useMock, realItems]
  );

  const initialForm: LogWorkForm = {
    title: "",
    date: "",
    hours: 0,
  };

  const submitWork = async (form: LogWorkForm) => {
    if (useMock) return true;

    const newItem: WorkItem = {
      id: `w${realItems.length + 1}`,
      title: form.title,
      date: form.date,
      hours: form.hours,
      status: "in_progress",
    };

    setRealItems((prev) => [newItem, ...prev]);
    setRealSummary((prev) => ({
      completed: prev.completed,
      inProgress: prev.inProgress + 1,
    }));

    return true;
  };

  const toggleMock = () => setUseMock((prev) => !prev);

  return {
    useMock,
    toggleMock,
    summary,
    items,
    initialForm,
    submitWork,
  };
}
