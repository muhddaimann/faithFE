import { useMemo, useState } from "react";

export type AnnouncementPriority = "high" | "normal" | "low";
export type AnnouncementDepartment = "HR" | "IT" | "Management";

export type AnnouncementItem = {
  id: string;
  title: string;
  summary: string;
  date?: string;
  priority: AnnouncementPriority;
  department: AnnouncementDepartment;
  read: boolean;
};

const mockAnnouncements: AnnouncementItem[] = [
  {
    id: "a1",
    title: "Public Holiday Announcement",
    summary: "Office will be closed on 16 September for Malaysia Day.",
    date: "10 Sep 2025",
    priority: "high",
    department: "HR",
    read: false,
  },
  {
    id: "a2",
    title: "System Maintenance",
    summary: "HR system will be unavailable from 12AM–4AM this Saturday.",
    date: "08 Sep 2025",
    priority: "normal",
    department: "IT",
    read: false,
  },
  {
    id: "a3",
    title: "Policy Update",
    summary: "New leave encashment policy will take effect next month.",
    date: "05 Sep 2025",
    priority: "normal",
    department: "HR",
    read: true,
  },
  {
    id: "a4",
    title: "Townhall Meeting",
    summary: "Company-wide townhall scheduled for next Friday.",
    date: "01 Sep 2025",
    priority: "low",
    department: "Management",
    read: true,
  },
];

export default function useAnnouncement() {
  const [useMock, setUseMock] = useState(true);

  const [realAnnouncements, setRealAnnouncements] = useState<
    AnnouncementItem[]
  >([]);

  const announcements = useMemo(
    () => (useMock ? mockAnnouncements : realAnnouncements),
    [useMock, realAnnouncements]
  );

  const toggleMock = () => setUseMock((prev) => !prev);

  const addAnnouncement = (item: AnnouncementItem) => {
    if (useMock) return;
    setRealAnnouncements((prev) => [item, ...prev]);
  };

  const markAllAsRead = () => {
    if (useMock) {
      mockAnnouncements.forEach((a) => {
        a.read = true;
      });
      return;
    }

    setRealAnnouncements((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  return {
    useMock,
    toggleMock,
    announcements,
    addAnnouncement,
    markAllAsRead,
  };
}
