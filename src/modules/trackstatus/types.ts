export enum CrimeStatus {
  Resolved = "Resolved",
  InProgress = "In Progress",
  PendingReview = "Pending Review",
  Rejected = "Rejected",
}

export enum CrimeType {
  Robbery = "Robbery",
  Theft = "Theft",
  Assault = "Assault",
  Fraud = "Fraud",
  Kidnapping = "Kidnapping",
  Others = "Others",
}

export interface CrimeTracker {
  id: string;
  crimeType: string;
  location: string;
  dateReported: string;
  timeReported: string;
  status: string;
}
