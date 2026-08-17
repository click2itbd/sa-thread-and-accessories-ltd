"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    let cancelled = false;

    async function verifySession() {
      try {
        const response = await fetch("/api/admin/auth/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        if (!cancelled) setSessionChecked(true);
      } catch {
        router.replace("/admin/login");
      }
    }

    verifySession();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (pathname === "/admin/login") return children;

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-sm text-gray-500">
        Checking admin session...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        }`}
      >
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        {isMobile && (
          <header className="lg:hidden h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="SA Thread"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-sm font-bold text-gray-900">SA THREAD</span>
            </Link>
          </header>
        )}

        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
