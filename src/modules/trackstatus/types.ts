// crime status
export enum CrimeStatus {
  Resolved = "resolved",
  InProgress = "inprogress",
  PendingReview = "pendigreview",
  Rejected = "rejected",
}

export enum CrimeType {
  Robbery = "Robbery",
  Theft = "Theft",
  Assault = "Assault",
  Fraud = "Fraud",
  Kidnapping = "Kidnapping",
  Others = "Others",
}

//crime tracker table details
export interface CrimeTracker {
  id: string;
  crimeType: CrimeType;
  location: string;
  dateReported: string;
  status: CrimeStatus;
}
