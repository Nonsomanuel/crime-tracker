"use client";
import { ReportForm } from "./crimeform";

export function ReportCrimePage() {
  return (
    <div className="px-8 py-6 bg-white rounded-[16px] min-h-screen overflow-x-hidden">
      <h2 className="font-semibold mb-2 leading-9 tracking-[-0.24px] ">
        Please fill in the details below to report a crime. Your information
        helps keep the community safe.
      </h2>
      <div className="">
        <ReportForm />
      </div>
    </div>
  );
}
