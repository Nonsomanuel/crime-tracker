/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { CrimeStatus, CrimeTracker } from "./types";

interface MobileUserCardProps {
  user: CrimeTracker;
}

// Utility function to safely format Firestore timestamps or strings
const formatFirestoreDate = (value: any, type: "date" | "time" = "date") => {
  if (!value) return "-";

  if (value?.seconds) {
    const date = new Date(value.seconds * 1000);
    return type === "time"
      ? date.toLocaleTimeString()
      : date.toLocaleDateString();
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "-";
};

export const MobileUserCard = ({ user }: MobileUserCardProps) => (
  <div className="p-4 border border-[#CBD5E1] rounded-[10px] bg-white w-full space-y-4">
    {/* Dropdown Menu */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="float-right -mt-1 -mr-1 p-2">
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => console.log("Editing report:", user.id)}
          className="cursor-pointer"
        >
          Edit Report
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => console.log("Deleting report:", user.id)}
          className="cursor-pointer text-destructive"
        >
          Delete Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* User Info */}
    <div className="text-blue-600 font-semibold text-[16px]">
      <span className="font-semibold">Report ID: </span>
      {user.id}
    </div>
    <div className="text-blue-600 font-semibold text-[16px]">
      <span className="font-semibold">Crime Type: </span>
      {user.crimeType}
    </div>
    <div className="text-[16px]">
      <span className="font-semibold">Location: </span>
      {user.location}
    </div>
    <div className="text-[16px]">
      <span className="font-semibold">Date Reported: </span>
      {formatFirestoreDate(user.dateReported, "date")}
    </div>
    <div className="text-[16px]">
      <span className="font-semibold">Time Reported: </span>
      {formatFirestoreDate(user.timeReported, "time")}
    </div>
    <div className="text-[16px]">
      <span className="font-semibold">Status: </span>
      <StatusBadge status={user.status} />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { text: string; className: string }> = {
    [CrimeStatus.Resolved]: {
      text: "Resolved",
      className: "text-[#15803d] bg-[#bbf7d0]",
    },
    [CrimeStatus.InProgress]: {
      text: "In Progress",
      className: "text-[#eab308] bg-[#fef08a]",
    },
    [CrimeStatus.PendingReview]: {
      text: "Pending Review",
      className: "text-[#65a30d] bg-[#d9f99d]",
    },
    [CrimeStatus.Rejected]: {
      text: "Rejected",
      className: "text-[#dc2626] bg-[#fecaca]",
    },
  };

  const config = statusConfig[status] || {
    text: status || "Unknown",
    className: "text-gray-600 bg-gray-100",
  };

  return (
    <Badge
      className={`inline-flex px-2 py-0.5 rounded-[30px] text-[16px] ${config.className}`}
    >
      {config.text}
    </Badge>
  );
};

export const columns = (): ColumnDef<CrimeTracker>[] => [
  {
    accessorKey: "id",
    header: () => <span className="font-semibold text-[14px]">Report ID</span>,
    cell: ({ row }) => (
      <span className="text-blue-800 font-semibold text-[16px]">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "crimeType",
    header: () => <span className="font-semibold text-[14px]">Crime Type</span>,
    cell: ({ row }) => (
      <span className="text-blue-800 font-semibold text-[16px]">
        {row.getValue("crimeType")}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: () => <span className="font-semibold text-[14px]">Location</span>,
    cell: ({ row }) => (
      <span className="text-[16px]">{row.getValue("location")}</span>
    ),
  },
  {
    accessorKey: "dateReported",
    header: () => (
      <span className="font-semibold text-[14px]">Date Reported</span>
    ),
    cell: ({ row }) => {
      const value = row.getValue("dateReported");
      return (
        <span className="text-[16px]">
          {formatFirestoreDate(value, "date")}
        </span>
      );
    },
  },
  {
    accessorKey: "timeReported",
    header: () => (
      <span className="font-semibold text-[14px]">Time Reported</span>
    ),
    cell: ({ row }) => {
      const value = row.getValue("timeReported");
      return (
        <span className="text-[16px]">
          {formatFirestoreDate(value, "time")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <span className="font-semibold text-[14px]">Status</span>,
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status") as string} />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("Editing report:", user.id)}
            ></DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Deleting report:", user.id)}
              className="text-destructive"
            ></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
