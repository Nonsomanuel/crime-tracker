import {
  CrimeStatus,
  CrimeType,
  CrimeTracker,
} from "@/modules/trackstatus/types";

export const mockCrimeReports: CrimeTracker[] = [
  {
    id: "CR-001",
    crimeType: CrimeType.Robbery,
    location: "Lagos Mainland, Nigeria",
    dateReported: "2025-09-28",
    status: CrimeStatus.Resolved,
  },
  {
    id: "CR-002",
    crimeType: CrimeType.Fraud,
    location: "Abuja, Nigeria",
    dateReported: "2025-09-30",
    status: CrimeStatus.InProgress,
  },
  {
    id: "CR-003",
    crimeType: CrimeType.Assault,
    location: "Port Harcourt, Nigeria",
    dateReported: "2025-10-02",
    status: CrimeStatus.PendingReview,
  },
  {
    id: "CR-004",
    crimeType: CrimeType.Kidnapping,
    location: "Kaduna, Nigeria",
    dateReported: "2025-10-01",
    status: CrimeStatus.Rejected,
  },
  {
    id: "CR-005",
    crimeType: CrimeType.Theft,
    location: "Ibadan, Nigeria",
    dateReported: "2025-09-25",
    status: CrimeStatus.Resolved,
  },
  {
    id: "CR-006",
    crimeType: CrimeType.Robbery,
    location: "Enugu, Nigeria",
    dateReported: "2025-09-29",
    status: CrimeStatus.InProgress,
  },
  {
    id: "CR-007",
    crimeType: CrimeType.Fraud,
    location: "Benin City, Nigeria",
    dateReported: "2025-09-23",
    status: CrimeStatus.PendingReview,
  },
  {
    id: "CR-008",
    crimeType: CrimeType.Assault,
    location: "Jos, Nigeria",
    dateReported: "2025-09-20",
    status: CrimeStatus.Rejected,
  },
  {
    id: "CR-009",
    crimeType: CrimeType.Others,
    location: "Abeokuta, Nigeria",
    dateReported: "2025-09-27",
    status: CrimeStatus.InProgress,
  },
  {
    id: "CR-010",
    crimeType: CrimeType.Theft,
    location: "Uyo, Nigeria",
    dateReported: "2025-09-19",
    status: CrimeStatus.Resolved,
  },
];
