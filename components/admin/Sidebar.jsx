"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Users, LayoutDashboard, Award, Settings, Briefcase, Package, Mail, FileText, Building2, BookOpen, Landmark, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function AdminSidebar({ onClose }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const links = [
    { href: "/admin/team", label: "Team Management", icon: Users },
    { href: "/admin/certificates", label: "Certificates & Docs", icon: Award },
    { href: "/admin/clients", label: "Clients", icon: Building2 },
    { href: "/admin/banks", label: "Partner Banks", icon: Landmark },
    { href: "/admin/settings", label: "Company Settings", icon: Settings },
    { href: "/admin/careers/jobs", label: "Careers", icon: Briefcase },
    { href: "/admin/careers/applications", label: "Applications", icon: FileText },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/blogs", label: "Blog Management", icon: BookOpen },
    { href: "/admin/contact", label: "Contact Messages", icon: Mail },
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/", label: "Visit Website", icon: ExternalLink, external: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
            <Image
              src="/logo.jpg"
              alt="SA Thread & Accessories Ltd."
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-extrabold text-gray-900 tracking-tight leading-tight">
              SA THREAD
            </span>
            <span className="text-[9px] font-semibold text-gray-500 tracking-widest uppercase">
              Admin Panel
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href || (!link.external && link.href !== "/admin" && pathname.startsWith(link.href));
          const LinkComponent = link.external ? "a" : Link;
          const externalProps = link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
          return (
            <LinkComponent
              key={link.href}
              href={link.href}
              onClick={onClose}
              {...externalProps}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1F4D2C]/10 text-[#1F4D2C]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{link.label}</span>
            </LinkComponent>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </aside>
  );
}
