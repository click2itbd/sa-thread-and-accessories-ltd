"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, ToggleLeft, ToggleRight, Search, Briefcase } from "lucide-react";
import Link from "next/link";

const EMPTY_JOB = {
  title: "",
  department: "",
  location: "",
  employmentType: "Full-time",
  experience: "",
  vacancy: 1,
  deadline: "",
  description: "",
  status: "Open",
  isActive: true,
};

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState(EMPTY_JOB);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        employmentType: job.employmentType || "Full-time",
        experience: job.experience || "",
        vacancy: job.vacancy || 1,
        deadline: job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "",
        description: job.description || "",
        status: job.status || "Open",
        isActive: job.isActive ?? true,
      });
    } else {
      setEditingJob(null);
      setFormData(EMPTY_JOB);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingJob(null);
    setFormData(EMPTY_JOB);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob._id}` : "/api/admin/jobs";
      const method = editingJob ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchJobs();
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || "Save failed");
      }
    } catch (error) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    if (!confirm(`Are you sure you want to delete "${job.title}"?`)) return;

    setDeleting(job._id);
    try {
      const res = await fetch(`/api/admin/jobs/${job._id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j._id !== job._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and manage job postings</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Job
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search jobs..."
          className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery ? "No jobs match your search." : "No jobs yet. Add your first job posting!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Job Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Location</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{job.employmentType}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.status === "Open" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                        }`}>
                          {job.status}
                        </span>
                        <button
                          onClick={() => handleOpenModal(job)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(job)}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(job)}
                          disabled={deleting === job._id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editingJob ? "Edit Job" : "Add Job"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors bg-white"
                  >
                    {EMPLOYMENT_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g. 2-3 Years"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy</label>
                  <input
                    type="number"
                    value={formData.vacancy}
                    onChange={(e) => setFormData((prev) => ({ ...prev, vacancy: parseInt(e.target.value) || 1 }))}
                    min="1"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="jobIsActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="jobIsActive" className="text-sm font-medium text-gray-700">Active</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="jobStatus"
                    checked={formData.status === "Open"}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.checked ? "Open" : "Closed" }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="jobStatus" className="text-sm font-medium text-gray-700">Open</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-[#1F4D2C] text-white hover:bg-[#163d24] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingJob ? "Update Job" : "Add Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
