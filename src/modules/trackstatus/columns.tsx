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
    <div className="text-blue-600 font-semibold text-[16px] leading-6 tracking-[-0.288px] break-words">
      <span className="font-semibold">Report ID: </span>
      {user.id}
    </div>
    <div className="text-blue-600 font-semibold text-[16px] leading-6 tracking-[-0.288px] break-words">
      <span className="font-semibold">Crime Type: </span>
      {user.crimeType}
    </div>
    <div className="font-normal text-[16px] leading-6 tracking-[-0.288px] break-words">
      <span className="font-semibold">Location: </span>
      {user.location}
    </div>
    <div className="text-[16px] font-normal break-words">
      <span className="font-semibold">Date Reported: </span>
      {user.dateReported}
    </div>
    <div className="text-[16px] font-normal break-words">
      <span className="font-semibold">Time Reported: </span>
      {user.timeReported}
    </div>
    <div className="text-[16px] font-normal break-words">
      <span className="font-semibold">Status: </span>
      <StatusBadge status={user.status} />
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: CrimeStatus }) => {
  const statusConfig = {
    [CrimeStatus.Resolved]: {
      text: "Resolved",
      className: "text-[#228329] bg-[#F0FAEC]",
    },
    [CrimeStatus.InProgress]: {
      text: "In Progress",
      className: "text-[#EBC22F] bg-[#FFB34A29]",
    },
    [CrimeStatus.PendingReview]: {
      text: "Pending Review",
      className: "text-[#228329] bg-[#F0FAEC]",
    },
    [CrimeStatus.Rejected]: {
      text: "Rejected",
      className: "text-[#E11D48] bg-[#FDECEC]",
    },
  };

  const config = statusConfig[status];

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
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Report ID
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-blue-800 font-radio_canada text-[16px] font-semibold leading-6 tracking-[-0.288px]">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "crimeType",
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Crime Type
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-blue-800 font-radio_canada text-[16px] font-semibold leading-6 tracking-[-0.288px]">
        {row.getValue("crimeType")}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Location
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-[#010D0D] font-radio_canada text-[16px] font-normal leading-6 tracking-[-0.288px]">
        {row.getValue("location")}
      </span>
    ),
  },
  {
    accessorKey: "dateReported",
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Date Reported
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-[#010D0D] font-radio_canada text-[16px] font-normal leading-6 tracking-[-0.288px]">
        {row.getValue("dateReported")}
      </span>
    ),
  },
  {
    accessorKey: "timeReported",
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Time Reported
      </span>
    ),
    cell: ({ row }) => (
      <span className="text-[#010D0D] font-radio_canada text-[16px] font-normal leading-6 tracking-[-0.288px]">
        {row.getValue("timeReported")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <span className="text-[#010D0D] font-radio_canada text-[14px] font-semibold leading-6 tracking-[-0.21px]">
        Status
      </span>
    ),
    cell: ({ row }) => (
      <StatusBadge status={row.getValue("status") as CrimeStatus} />
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
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
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
      );
    },
  },
];
