"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  Loader2,
  MapPinIcon,
  PhoneIcon,
  UserRoundIcon,
} from "lucide-react";
import { toast } from "sonner";

type CrimeReport = {
  id: string;
  crimeType: string;
  description: string;
  date: string;
  time: string;
  address: string;
  city: string;
  reporterName?: string | null;
  reporterPhone?: string | null;
  reporterEmail?: string | null;
  anonymous: boolean;
  status: string;
  createdAt?: string;
};

export default function AdminDashboard() {
  const [reports, setReports] = useState<CrimeReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(
          collection(db, "crimeReports"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const reportsData: CrimeReport[] = querySnapshot.docs.map((docSnap) => {
          const data = docSnap.data();

          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : data.createdAt || "N/A";

          const date = data.date?.toDate
            ? data.date.toDate().toLocaleDateString("en-US")
            : typeof data.date === "string"
            ? data.date
            : "N/A";

          const time =
            typeof data.time === "string"
              ? data.time
              : data.time?.toDate
              ? data.time.toDate().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "N/A";

          return {
            id: docSnap.id,
            ...data,
            date,
            time,
            createdAt,
          } as CrimeReport;
        });

        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports:", error);
        toast.error("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  async function handleStatusUpdate(id: string, newStatus: string) {
    try {
      const reportRef = doc(db, "crimeReports", id);
      await updateDoc(reportRef, {
        status: newStatus,
        updatedAt: new Date(),
      });

      toast.success(`Status updated to "${newStatus}"`);

      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
        <p className="ml-2 text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-[16px] min-h-screen">
      <h3 className="text-lg sm:text-xl font-bold mb-4">
        Track and update reported crimes status
      </h3>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports found.</p>
        ) : (
          reports.map((report) => (
            <Card
              key={report.id}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-lg"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                  <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                    {report.crimeType}
                  </h2>

                  <div
                    className={`mt-2 sm:mt-0 p-1 rounded-md self-start sm:self-auto ${
                      report.status === "Resolved"
                        ? "text-[#15803d] bg-[#bbf7d0]"
                        : report.status === "In Progress"
                        ? "text-[#eab308] bg-[#fef08a]"
                        : report.status === "Rejected"
                        ? "text-[#dc2626] bg-[#fecaca]"
                        : report.status === "Pending Review"
                        ? "text-[#65a30d] bg-[#d9f99d]"
                        : "text-black"
                    }`}
                  >
                    <select
                      value={report.status}
                      onChange={(e) =>
                        handleStatusUpdate(report.id, e.target.value)
                      }
                      className="bg-transparent text-sm sm:text-base font-medium outline-none cursor-pointer rounded-md"
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {report.description}
                </p>

                <div className="text-xs text-gray-500 space-y-1">
                  <p className="flex gap-2">
                    <MapPinIcon size={16} /> {report.address}, {report.city}
                  </p>
                  <p className="flex gap-2">
                    <ClockIcon size={16} /> {report.date} at {report.time}
                  </p>
                  <p className="flex gap-2">
                    {" "}
                    <CalendarIcon size={16} /> Created At: {report.createdAt}
                  </p>

                  {!report.anonymous && (
                    <p className="pt-1 flex gap-2">
                      <UserRoundIcon size={16} /> {report.reporterName || "N/A"}{" "}
                      | <PhoneIcon size={16} /> {report.reporterPhone || "N/A"}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
