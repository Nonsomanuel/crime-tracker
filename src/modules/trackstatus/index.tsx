"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { columns, MobileUserCard } from "./columns";
import { DataTable } from "./data-table";
import { CrimeTracker } from "./types";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth"; // or your own auth hook/context

export default function TrackStatus() {
  const isMobile = useIsMobile();
  const [reports, setReports] = useState<CrimeTracker[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Assuming you have access to the logged-in user
  const { user } = useAuth(); // user?.uid or user?.email, depending on your auth setup

  useEffect(() => {
    if (!user) return; // don’t run until user is known

    const q = query(
      collection(db, "crimeReports"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedReports = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            crimeType: data.crimeType || "",
            location: data.address || data.city || "N/A",
            dateReported: data.date || "",
            timeReported: data.time || "",
            status: data.status || "Pending Review",
          } as CrimeTracker;
        });

        setReports(fetchedReports);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time reports:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const filteredReports = reports.filter(
    (report) =>
      report.crimeType?.toLowerCase().includes(search.toLowerCase()) ||
      report.location?.toLowerCase().includes(search.toLowerCase()) ||
      report.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto min-h-screen bg-white rounded-[16px] px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 w-full h-12"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 mt-10">
          Loading reports...
        </div>
      ) : isMobile ? (
        <div className="space-y-6 w-full m-0 overflow-hidden">
          {filteredReports.length > 0 ? (
            filteredReports.map((user) => (
              <MobileUserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-center text-gray-500">No reports found.</p>
          )}
        </div>
      ) : (
        <div className="container mx-auto overflow-hidden">
          <DataTable<CrimeTracker, unknown>
            columns={columns()}
            data={filteredReports}
          />
        </div>
      )}
    </div>
  );
}
