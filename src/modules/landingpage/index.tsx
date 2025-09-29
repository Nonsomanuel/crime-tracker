"use client";

import Footer from "@/components/footer/footer";
import { ChartLineIcon, ListCheckIcon, NotebookPenIcon } from "lucide-react";
import Link from "next/link";
import Ticker from "@/components/ticker/ticker";

export default function LandingPage() {
  const messages = [
    "Report crimes instantly and anonymously 🕵️‍♂️",
    "Track incidents in real-time across your community 📍",
    "Stay informed with crime trends and safety alerts 🚨",
    "Help create safer neighborhoods for everyone 🤝",
    "Your voice matters — take action against crime ✊",
  ];
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-8 gap-6 space-y-8 w-full"
      //   style={{
      //     backgroundImage:
      //       "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('/crime2.jpg')",
      //     backgroundSize: "cover",
      //     backgroundPosition: "center",
      //   }}
    >
      <Ticker messages={messages} speed={35} />

      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Stay Safe. Report Crime. Track Justice.
      </h1>
      <div>
        <Link href={"/login"} passHref>
          <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-[12px] hover:bg-blue-700 transition font-bold">
            Login to report a crime
          </button>
        </Link>

        <p className="text-center mt-2.5">
          {"Don't have an account?"}{" "}
          <Link href={""} className="text-primary font-semibold">
            Signup
          </Link>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl text-center w-full">
        <div className="flex items-center shadow-md px-4 py-3 rounded-[12px] gap-2 font-semibold text-[16px] sm:text-[18px] flex-1">
          <NotebookPenIcon className="text-blue-600 shrink-0" size={24} />
          <p className="flex-1">Report — Submit crime details securely</p>
        </div>
        <div className="flex items-center shadow-md px-4 py-3 rounded-[12px] gap-2 font-semibold text-[16px] sm:text-[18px] flex-1">
          <ListCheckIcon className="text-blue-600 shrink-0" size={24} />
          <p className="flex-1">Verified — Authorities review the report</p>
        </div>
        <div className="flex items-center shadow-md px-4 py-3 rounded-[12px] gap-2 font-semibold text-[16px] sm:text-[18px] flex-1">
          <ChartLineIcon className="text-blue-600 shrink-0" size={24} />
          <p className="flex-1">Track — Follow your case status</p>
        </div>
      </div>

      {/* Why Use */}
      <div className=" max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
          Why Use CrimeTracker?
        </h2>
        <div className="shadow-md px-4 py-3 rounded-[12px] font-semibold text-[16px] sm:text-[18px]">
          <p>- Anonymous & secure</p>
          <p>- Real-time updates</p>
          <p>- Community safety insights</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
