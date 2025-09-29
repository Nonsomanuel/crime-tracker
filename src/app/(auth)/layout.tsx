import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/shared/bread-crumb";
import { Toaster } from "@/components/ui/sonner";
// import { Bell } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <SidebarInset>
        {/* Header */}
        <header className="w-full md:px-4 px-6 py-5">
          {/* Mobile Header */}
          <div className="flex items-center justify-between w-full md:hidden">
            <SidebarTrigger className="-ml-1" />
            {/* <div className="flex items-center gap-x-4">
              <Bell size={20} />
              <SettingsDropdown />
              <AvatarContainer />
            </div> */}
          </div>

          {/* Desktop Header */}
          <div className="md:flex hidden items-center justify-between">
            <Breadcrumbs />
            {/* <div className="flex items-center gap-x-6">
              <div>
                <Bell size={20} />
              </div>
              <SettingsDropdown />
              <AvatarContainer />
            </div> */}
          </div>

          {/* Breadcrumbs below on mobile */}
          <div className="mt-6 md:hidden">
            <Breadcrumbs />
          </div>
        </header>

        {/* Page Body */}
        <div className="bg-[#F5F5F5] p-2 min-h-screen">{children}</div>

        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          closeButton
          visibleToasts={1}
          toastOptions={{
            className: "font-radio_canada",
            duration: 4000,
          }}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
