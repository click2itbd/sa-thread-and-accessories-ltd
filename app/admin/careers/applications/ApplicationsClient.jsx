"use client";

import { useState, useEffect } from "react";
import { Search, Download, Trash2, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = ["Pending", "Shortlisted", "Rejected", "Hired"];

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [uniquePositions, setUniquePositions] = useState([]);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const url = new URL("/api/admin/applications", window.location.origin);
      if (searchQuery) url.searchParams.set("search", searchQuery);
      if (filterPosition) url.searchParams.set("position", filterPosition);

      const res = await fetch(url.toString(), {
        credentials: "include",
      });
      if (res.status === 401) {
        setError("Session expired or not logged in. Please log in again.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }
        const data = await res.json();
        setApplications(data.applications || []);
        const positions = [...new Set((data.applications || []).map((a) => a.appliedPosition))];
        setUniquePositions(positions);
        setError(null);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      setError(error.message || "Unable to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchApplications();
    }, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, filterPosition]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationStatus: newStatus }),
        credentials: "include",
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a._id === id ? { ...a, applicationStatus: newStatus } : a))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (app) => {
    if (!confirm(`Are you sure you want to delete application from ${app.fullName}?`)) return;

    try {
      const res = await fetch(`/api/admin/applications/${app._id}`, { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a._id !== app._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-50 text-yellow-700";
      case "Shortlisted": return "bg-blue-50 text-blue-700";
      case "Rejected": return "bg-red-50 text-red-700";
      case "Hired": return "bg-green-50 text-green-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage job applications</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone, or position..."
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          >
            <option value="">All Positions</option>
            {uniquePositions.map((pos) => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <button
            onClick={fetchApplications}
            className="mt-3 text-sm text-red-600 hover:text-red-700 underline"
          >
            Retry
          </button>
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <p className="text-gray-500 text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Applicant</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Position</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Contact</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Submitted</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.fullName}</div>
                      <div className="text-xs text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.appliedPosition}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{app.phone}</td>
                    <td className="px-6 py-4">
                      <select
                        value={app.applicationStatus}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        disabled={updating === app._id}
                        className={`text-xs font-medium rounded-full px-3 py-1 border-0 outline-none cursor-pointer ${getStatusColor(app.applicationStatus)} disabled:opacity-50`}
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {app.cvFile && (
                          <a
                            href={app.cvFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Download CV"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(app)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
