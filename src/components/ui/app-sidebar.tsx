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
  ChartLineIcon,
  LayoutTemplateIcon,
  NotebookPenIcon,
  ChevronDown,
  ChevronRight,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const navigationData = {
  navMain: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Dashboard",
          url: "/home",
          icon: <LayoutTemplateIcon size={20} />,
        },
        {
          title: "Report Crime",
          icon: <NotebookPenIcon size={20} />,
          url: "/reportcrime",
        },
        {
          title: "Track Status",
          icon: <ChartLineIcon size={20} />,
          url: "/trackstatus",
        },
      ],
    },
    {
      title: "Admin",
      items: [
        {
          title: "Admin Dashboard",
          url: "/admindashboard",
          icon: <LayoutTemplateIcon size={20} />,
        },
      ],
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigating (on mobile)
  useEffect(() => {
    if (isMobile) {
      const sidebar = document.querySelector("[data-sidebar='sidebar']");
      if (sidebar?.classList.contains("open")) {
        sidebar.classList.remove("open");
      }
    }
  }, [pathname, isMobile]);

  // 🔐 Check if user is admin
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setIsAdmin(userData.role === "admin");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setLoadingRole(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingRole) return null;

  return (
    <Sidebar data-sidebar="sidebar">
      <SidebarHeader>
        <h2 className="text-lg font-bold pt-4 pl-3 text-blue-600">
          Crime Tracker
        </h2>
      </SidebarHeader>

      <Separator className="my-2 h-px w-full bg-gray-300" />

      <SidebarContent>
        {navigationData.navMain.map((section) => {
          if (section.title === "Admin" && !isAdmin) return null;

          if (section.title === "Admin") {
            return (
              <SidebarGroup key={section.title}>
                <Collapsible open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md">
                      <span className="font-semibold">{section.title}</span>
                      {isAdminOpen ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu className="space-y-4">
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              isActive={pathname.startsWith(item.url)}
                              className={clsx(
                                pathname.startsWith(item.url)
                                  ? "text-blue-600 font-medium"
                                  : "text-[#414042]"
                              )}
                            >
                              <Link
                                href={item.url}
                                className="py-5 px-4 flex items-center font-semibold"
                              >
                                <span className="mr-3">{item.icon}</span>
                                <span className="text-[16px]">
                                  {item.title}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarGroup>
            );
          }

          return (
            <SidebarGroup key={section.title}>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-4">
                  {section.items.map((item) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="cursor-pointer"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.url)}
                        className={clsx(
                          pathname.startsWith(item.url)
                            ? "text-blue-600 font-medium"
                            : "text-[#414042]"
                        )}
                      >
                        <Link
                          href={item.url}
                          className="py-5 px-4 flex items-center font-semibold"
                        >
                          <span className="mr-3">{item.icon}</span>
                          <span className="text-[16px]">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent className="px-2 space-y-0.5">
            <button
              onClick={async () => {
                try {
                  await auth.signOut();
                  window.location.href = "/";
                } catch (error) {
                  console.error("Logout failed:", error);
                }
              }}
              className="w-full flex items-center text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded-md"
            >
              <span className="mr-3">Log Out</span>
              <LogOutIcon size={20} />
            </button>
            <p className="font-semibold">
              <Link href="/">About</Link> | <Link href="/">Contact</Link> |{" "}
              <Link href="/">Privacy Policy</Link>
            </p>
            <div>&copy; 2024 Crime Tracker</div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
