"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ChartColumnIncreasingIcon,
  ChartLineIcon,
  ChartPieIcon,
  MegaphoneIcon,
  NotebookPenIcon,
  SquareSigmaIcon,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChartLineLinear } from "../linechart";
import Ticker from "@/components/ticker/ticker";

export default function HomePage() {
  const messages = [
    "🚨 Robbery reported near Ikeja — stay alert and avoid late-night movement in the area.",
    "🔥 Fire incident reported in Surulere — emergency services on ground.",
    "🚓 Police patrol increased in Yaba following recent burglary cases.",
    "🛑 Traffic disruption in Apapa due to ongoing security checks.",
    "🕒 Missing person alert: 16-year-old last seen in Ajah area.",
    "⚠️ Fraud alert: Reports of ATM card scams in Lekki Phase 1.",
    "🏠 House break-in reported at Gbagada — residents advised to secure properties.",
    "💡 Community meeting scheduled in Mushin on safety awareness.",
  ];
  return (
    <div className="px-8 py-6 bg-white rounded-[16px] min-h-screen overflow-x-hidden">
      <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-left text-blue-600">
          Welcome back, User
        </h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link href="/reportcrime">
            <Button className="px-3 py-2 font-semibold text-[16px] sm:text-[18px]">
              <NotebookPenIcon />
              Report New Crime
            </Button>
          </Link>
          <Link href="/trackstatus">
            <Button className="px-3 py-2 font-semibold text-[16px] sm:text-[18px]">
              <ChartLineIcon />
              Track My Reports
            </Button>
          </Link>
        </div>
      </div>
      <Separator className="h-px bg-gray-300 w-full mt-4" />
      <div className="mt-12 space-y-6 w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 w-full sm:items-center  sm:justify-between">
          <Card className="shadow-md rounded-[12px] px-4 sm:w-3/12 ">
            <CardContent className="items-center justify-center flex flex-col gap-1.5">
              <SquareSigmaIcon size={35} className="text-blue-600" />
              <h2 className="font-semibold text-2xl text-blue-600">
                Total Crimes
              </h2>
              <p className="font-bold text-[30px] text-yellow-600">4582</p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-[12px] px-4 sm:w-3/12">
            <CardContent className="items-center justify-center flex flex-col gap-1.5">
              <ChartColumnIncreasingIcon size={35} className="text-blue-600" />
              <h2 className="font-semibold text-2xl text-blue-600">
                Solved Crimes
              </h2>
              <p className="font-bold text-[30px] text-green-600">3582</p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-[12px] px-4 sm:w-3/12">
            <CardContent className="items-center justify-center flex flex-col gap-1.5">
              <ChartPieIcon size={35} className="text-blue-600" />
              <h2 className="font-semibold text-2xl text-blue-600">
                Pending Crimes
              </h2>
              <p className="font-bold text-[30px] text-red-600">1000</p>
            </CardContent>
          </Card>
        </div>

        <ChartLineLinear />
      </div>
      <Separator className="h-px bg-gray-300 w-full mt-10" />
      <div className="mt-10 w-full overflow-hidden">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[22px] text-gray-500">
            Community Update
          </h3>
          <MegaphoneIcon className="text-gray-500" size={30} />
        </div>
        <Ticker messages={messages} speed={40} />
      </div>
    </div>
  );
}
