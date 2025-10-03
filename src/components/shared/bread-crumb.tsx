"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  // Mapping for custom labels
  const segmentLabels: Record<string, string> = {
    home: "Dashboard",
    reportcrime: "Report Crime",
  };

  // Split the pathname into segments
  const segments = pathname.split("/").filter((segment) => segment);
  // const formerPath =
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-0 text-base text-gray-500">
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = segmentLabels[segment] || segment; // Use custom label if available

          return (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {isLast ? (
                <span className="font-semibold tracking-[-0.16px] text-xl md:text-2xl text-[#010D0D] font-radio_canada capitalize">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-[#C9D1DB] font-semibold tracking-[-0.16px] text-xl md:text-2xl font-radio_canada capitalize"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
