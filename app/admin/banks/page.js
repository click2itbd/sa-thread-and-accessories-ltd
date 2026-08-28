"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Search, Landmark, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const emptyBank = {
  name: "",
  branch: "",
  address: "",
  tel: "",
  fax: "",
  swift: "",
  displayOrder: 0,
  isActive: true,
};

export default function AdminBanksPage() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBank, setEditingBank] = useState(null);
  const [formData, setFormData] = useState(emptyBank);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/admin/banks", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setBanks(data.banks || []);
        setError(null);
      } else {
        throw new Error("Failed to fetch banks");
      }
    } catch (err) {
      console.error("Failed to fetch banks:", err);
      setError("Unable to load partner banks. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (bank = null) => {
    if (bank) {
      setEditingBank(bank);
      setFormData({
        name: bank.name || "",
        branch: bank.branch || "",
        address: bank.address || "",
        tel: bank.tel || "",
        fax: bank.fax || "",
        swift: bank.swift || "",
        displayOrder: bank.displayOrder ?? 0,
        isActive: bank.isActive ?? true,
      });
    } else {
      setEditingBank(null);
      setFormData({
        ...emptyBank,
        displayOrder: banks.length + 1,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingBank(null);
    setFormData(emptyBank);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingBank
        ? `/api/admin/banks/${editingBank._id}`
        : "/api/admin/banks";
      const method = editingBank ? "PUT" : "POST";

      const res = await fetch(url, {
        credentials: "include",
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: editingBank ? "Partner bank updated successfully!" : "Partner bank added successfully!",
        });
        setTimeout(() => setMessage(null), 3000);
        handleCloseModal();
        fetchBanks();
      } else {
        const data = await res.json();
        alert(data.error || "Save failed");
      }
    } catch (err) {
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this bank partner?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/banks/${id}`, {
        credentials: "include",
        method: "DELETE",
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Partner bank deleted successfully." });
        setTimeout(() => setMessage(null), 3000);
        fetchBanks();
      } else {
        alert("Failed to delete bank partner");
      }
    } catch (err) {
      alert("Failed to delete bank partner");
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (bank) => {
    try {
      const res = await fetch(`/api/admin/banks/${bank._id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !bank.isActive }),
      });
      if (res.ok) {
        fetchBanks();
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const filteredBanks = banks.filter((b) =>
    (b.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.branch || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.address || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.swift || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Banks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the banking partners shown on the About Us page
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Bank Partner
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search bank name, branch, address, SWIFT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl border border-gray-200">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700 text-sm">
          {error}
        </div>
      ) : filteredBanks.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Landmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No partner banks found.</p>
          <p className="text-xs text-gray-400 mt-1">Click &quot;Add Bank Partner&quot; to create one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5">Bank &amp; Branch</th>
                  <th className="px-6 py-3.5">Contact Details</th>
                  <th className="px-6 py-3.5">SWIFT</th>
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBanks.map((bank) => (
                  <tr key={bank._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{bank.name}</div>
                      {bank.branch && <div className="text-xs text-gray-500 mt-0.5">{bank.branch}</div>}
                      {bank.address && <div className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">{bank.address}</div>}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">
                      {bank.tel && <div><span className="font-semibold text-gray-700">Tel:</span> {bank.tel}</div>}
                      {bank.fax && <div><span className="font-semibold text-gray-700">Fax:</span> {bank.fax}</div>}
                      {!bank.tel && !bank.fax && <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      {bank.swift ? (
                        <span className="inline-block px-2.5 py-1 rounded bg-gray-100 font-mono text-xs font-semibold text-gray-800">
                          {bank.swift}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-600">
                      {bank.displayOrder ?? 0}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(bank)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          bank.isActive
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {bank.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(bank)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(bank._id)}
                          disabled={deleting === bank._id}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === bank._id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl animate-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#1F4D2C]/10 flex items-center justify-center text-[#1F4D2C]">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {editingBank ? "Edit Partner Bank" : "Add Partner Bank"}
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exim Bank PLC"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  placeholder="e.g. Uttara Branch"
                  value={formData.branch}
                  onChange={(e) => setFormData((p) => ({ ...p, branch: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                  Address
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. House# 61/A, Road# 7, Sector# 4, Uttara, Dhaka"
                  value={formData.address}
                  onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    Telephone
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 16246, +880 96040 16246"
                    value={formData.tel}
                    onChange={(e) => setFormData((p) => ({ ...p, tel: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    Fax
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 88-02-48955881"
                    value={formData.fax}
                    onChange={(e) => setFormData((p) => ({ ...p, fax: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    SWIFT Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. EXBKBDDH"
                    value={formData.swift}
                    onChange={(e) => setFormData((p) => ({ ...p, swift: e.target.value }))}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData((p) => ({ ...p, displayOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
                  className="w-4 h-4 text-[#1F4D2C] rounded border-gray-300 focus:ring-[#1F4D2C]"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Active (Visible on website)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Bank Partner"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
