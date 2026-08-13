"use client";

import { useState, useEffect } from "react";
import { Mail, Briefcase, Package, Award, Users, Building2, FileText, TrendingUp, Database } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalProducts: 0,
    activeProducts: 0,
    totalTeam: 0,
    activeTeam: 0,
    totalClients: 0,
    activeClients: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactRes, jobsRes, productsRes, teamRes, clientsRes, applicationsRes] = await Promise.all([
        fetch("/api/admin/contact", { credentials: "include" }),
        fetch("/api/admin/jobs", { credentials: "include" }),
        fetch("/api/admin/products", { credentials: "include" }),
        fetch("/api/admin/team", { credentials: "include" }),
        fetch("/api/admin/clients", { credentials: "include" }),
        fetch("/api/admin/applications", { credentials: "include" }),
      ]);

      let unreadCount = 0;
      let totalMessages = 0;
      if (contactRes.ok) {
        const contactData = await contactRes.json();
        unreadCount = contactData.unreadCount || 0;
        totalMessages = contactData.messages?.length || 0;
      }

      let activeJobs = 0;
      let totalJobs = 0;
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        totalJobs = jobsData.jobs?.length || 0;
        activeJobs = jobsData.jobs?.filter((j) => j.isActive && j.status === "Open").length || 0;
      }

      let activeProducts = 0;
      let totalProducts = 0;
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        totalProducts = productsData.products?.length || 0;
        activeProducts = productsData.products?.filter((p) => p.isActive).length || 0;
      }

      let activeTeam = 0;
      let totalTeam = 0;
      if (teamRes.ok) {
        const teamData = await teamRes.json();
        totalTeam = teamData.members?.length || 0;
        activeTeam = teamData.members?.filter((m) => m.isActive).length || 0;
      }

      let activeClients = 0;
      let totalClients = 0;
      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        totalClients = clientsData.clients?.length || 0;
        activeClients = clientsData.clients?.filter((c) => c.isActive).length || 0;
      }

      let pendingApplications = 0;
      let totalApplications = 0;
      if (applicationsRes.ok) {
        const appsData = await applicationsRes.json();
        totalApplications = appsData.applications?.length || 0;
        pendingApplications = appsData.applications?.filter((a) => a.applicationStatus === "Pending").length || 0;
      }

      setStats({
        totalMessages,
        unreadMessages: unreadCount,
        totalJobs,
        activeJobs,
        totalProducts,
        activeProducts,
        totalTeam,
        activeTeam,
        totalClients,
        activeClients,
        totalApplications,
        pendingApplications,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const importStarterData = async () => {
    setImporting(true);
    setImportMessage("");

    try {
      const response = await fetch("/api/admin/import", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "all" }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not import starter data.");
      }

      const imported = Object.values(data.results)
        .reduce((total, result) => total + (result.imported || 0), 0);
      setImportMessage(
        imported > 0
          ? `${imported} starter records imported successfully.`
          : "Starter data is already in the database.",
      );
      fetchStats();
    } catch (error) {
      setImportMessage(error.message || "Could not import starter data.");
    } finally {
      setImporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { label: "Unread Messages", value: stats.unreadMessages, total: stats.totalMessages, icon: Mail, href: "/admin/contact", color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
    { label: "Active Jobs", value: stats.activeJobs, total: stats.totalJobs, icon: Briefcase, href: "/admin/careers/jobs", color: "bg-green-50 text-green-700 border-green-100" },
    { label: "Active Products", value: stats.activeProducts, total: stats.totalProducts, icon: Package, href: "/admin/products", color: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "Active Team", value: stats.activeTeam, total: stats.totalTeam, icon: Users, href: "/admin/team", color: "bg-purple-50 text-purple-700 border-purple-100" },
    { label: "Active Clients", value: stats.activeClients, total: stats.totalClients, icon: Building2, href: "/admin/clients", color: "bg-orange-50 text-orange-700 border-orange-100" },
    { label: "Pending Applications", value: stats.pendingApplications, total: stats.totalApplications, icon: FileText, href: "/admin/careers/applications", color: "bg-red-50 text-red-700 border-red-100" },
  ];

  const quickActions = [
    { label: "View Messages", desc: `${stats.unreadMessages} unread`, icon: Mail, href: "/admin/contact" },
    { label: "Manage Jobs", desc: `${stats.activeJobs} active`, icon: Briefcase, href: "/admin/careers/jobs" },
    { label: "Manage Products", desc: `${stats.activeProducts} active`, icon: Package, href: "/admin/products" },
    { label: "Manage Team", desc: `${stats.activeTeam} members`, icon: Users, href: "/admin/team" },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome to SA Thread Admin Panel</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <button
            type="button"
            onClick={importStarterData}
            disabled={importing}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Database className="h-4 w-4" />
            {importing ? "Importing..." : "Import Starter Data"}
          </button>
          {importMessage && (
            <p className="text-xs text-gray-500">{importMessage}</p>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              {card.total > 0 && (
                <span className="text-xs text-gray-500">Total: {card.total}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <action.icon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

