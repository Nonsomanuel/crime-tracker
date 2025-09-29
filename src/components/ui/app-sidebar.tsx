"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import clsx from "clsx";
import {
  //   CaseLowerIcon,
  LayoutTemplateIcon,
  NotebookPenIcon,
  //   UserRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Footer from "../footer/footer";

const navigationData = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/home",
          icon: <LayoutTemplateIcon size={20} />,
        },
        {
          title: "Report Crime",
          icon: <NotebookPenIcon size={20} />,
          url: "",
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-bold pt-4 pl-3 text-blue-600">
          Crime Tracker
        </h2>
      </SidebarHeader>
      <Separator className="my-2 h-px w-full bg-gray-300" />

      <SidebarContent>
        {navigationData.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-4">
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title} className="cursor-pointer">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.startsWith(item.url)}
                      className={clsx(
                        pathname.startsWith(item.url)
                          ? "text-blue-600! font-medium"
                          : "text-[#414042]"
                      )}
                    >
                      <Link
                        href={item.url}
                        className="py-5 px-4 font-radio_canada flex items-center"
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent className="px-2 space-y-0.5">
            {/* <p className="font-semibold">About</p>
            <p className="font-semibold">Contact</p>
            <p className="font-semibold">Privacy Policy</p> */}
            <p className=" font-semibold ">
              <Link href="/" className="">
                About
              </Link>{" "}
              |{" "}
              <Link href="/" className="">
                Contact
              </Link>{" "}
              |{" "}
              <Link href="/" className="">
                Privacy Policy
              </Link>
            </p>
            <div>&copy; 2024 Crime Tracker</div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
