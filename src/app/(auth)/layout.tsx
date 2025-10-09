"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/shared/bread-crumb";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  if (!user) return null; // prevent flicker during redirect

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Header */}
        <header className="w-full md:px-4 px-6 py-5">
          {/* Mobile Header */}
          <div className="flex items-center justify-between w-full md:hidden">
            <SidebarTrigger className="-ml-1" />
          </div>

          {/* Desktop Header */}
          <div className="md:flex hidden items-center justify-between">
            <Breadcrumbs />
          </div>

          {/* Mobile Breadcrumbs */}
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthProvider>
  );
}
