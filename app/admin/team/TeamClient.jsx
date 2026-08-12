"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, Search, Users } from "lucide-react";

const DEPARTMENTS = ["Management", "Marketing & Factory", "Sales & Marketing", "Production"];

const emptyMember = {
  name: "",
  role: "",
  dept: "Management",
  image: "",
  email: "",
  phone: "",
  location: "",
  facebookUrl: "",
  linkedinUrl: "",
  whatsappNumber: "",
  about: "",
  expertise: [],
  responsibilities: [],
  displayOrder: 0,
  isActive: true,
};

export default function AdminTeamClient() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState(emptyMember);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/admin/team");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || "",
        role: member.role || "",
        dept: member.dept || "Management",
        image: member.image || "",
        email: member.email || "",
        phone: member.phone || "",
        location: member.location || "",
        facebookUrl: member.facebookUrl || "",
        linkedinUrl: member.linkedinUrl || "",
        whatsappNumber: member.whatsappNumber || "",
        about: member.about || "",
        expertise: member.expertise ? [...member.expertise] : [],
        responsibilities: member.responsibilities ? [...member.responsibilities] : [],
        displayOrder: member.displayOrder || 0,
        isActive: member.isActive ?? true,
      });
    } else {
      setEditingMember(null);
      setFormData(emptyMember);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingMember(null);
    setFormData(emptyMember);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingMember ? `/api/admin/team/${editingMember._id}` : "/api/admin/team";
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchMembers();
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

  const handleDelete = async (member) => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;

    setDeleting(member._id);
    try {
      const res = await fetch(`/api/admin/team/${member._id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m._id !== member._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.dept.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or remove team members</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, role, or department..."
          className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery ? "No members match your search." : "No team members yet. Add your first member!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Member</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Department</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembers.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">?</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
                          <div className="text-xs text-gray-500 truncate">{member.location || ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {member.dept}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{member.displayOrder}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(member)}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          disabled={deleting === member._id}
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
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    value={formData.dept}
                    onChange={(e) => setFormData((prev) => ({ ...prev, dept: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <label className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {!formData.image && <p className="text-xs text-gray-400 mt-1">or paste image URL below</p>}
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://... or upload above"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors mt-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                <textarea
                  value={formData.about}
                  onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    id="memberIsActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="memberIsActive" className="text-sm font-medium text-gray-700">Active</label>
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
                  {saving ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
