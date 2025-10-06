"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { columns, MobileUserCard } from "./columns";
import { DataTable } from "./data-table";
import { mockCrimeReports } from "@/utils/mock-crime-data";
import { CrimeTracker } from "./types";

export default function TrackStatus() {
  const isMobile = useIsMobile();

  return (
    <div className="container mx-auto min-h-screen bg-white rounded-[16px] px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 w-full h-12"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      {isMobile ? (
        <div className="space-y-6 w-full m-0 overflow-hidden">
          {(mockCrimeReports as CrimeTracker[]).map((user) => (
            <MobileUserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="container mx-auto overflow-hidden">
          <DataTable<CrimeTracker, unknown>
            columns={columns()}
            data={mockCrimeReports}
          />
        </div>
      )}
    </div>
  );
}
