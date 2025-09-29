"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear line chart";

const chartData = [
  { month: "January", crimes_Reported: 186 },
  { month: "February", crimes_Reported: 305 },
  { month: "March", crimes_Reported: 237 },
  { month: "April", crimes_Reported: 73 },
  { month: "May", crimes_Reported: 209 },
  { month: "June", crimes_Reported: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crime Report Chart</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        {/* Responsive height: smaller on mobile, bigger on desktop */}
        <ChartContainer
          config={chartConfig}
          className="w-full h-[180px] sm:h-[220px] lg:h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="crimes_Reported"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total crimes reported for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
