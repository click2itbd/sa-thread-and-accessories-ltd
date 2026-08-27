"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Upload } from "lucide-react";
import FileUpload from "@/components/admin/FileUpload";

const emptySettings = {
  companyName: "",
  tagline: "",
  email: "",
  phoneNumber: "",
  address: "",
  googleMapsUrl: "",
  facebookUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  websiteLogo: "",
  favicon: "",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings || emptySettings);
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (file) => {
    if (!file) {
      setSettings((prev) => ({ ...prev, websiteLogo: "" }));
      return;
    }

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: 'include',
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSettings((prev) => ({ ...prev, websiteLogo: data.url }));
      } else {
        alert(data.error || "Logo upload failed");
      }
    } catch (error) {
      alert("Logo upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleFaviconUpload = async (file) => {
    if (!file) {
      setSettings((prev) => ({ ...prev, favicon: "" }));
      return;
    }

    setUploadingFavicon(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: 'include',
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSettings((prev) => ({ ...prev, favicon: data.url }));
      } else {
        alert(data.error || "Favicon upload failed");
      }
    } catch (error) {
      alert("Favicon upload failed");
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        credentials: 'include',
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully" });
        setTimeout(() => setMessage(null), 3000);
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Save failed" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global company information and branding</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
          message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Company Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings((prev) => ({ ...prev, companyName: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings((prev) => ({ ...prev, tagline: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={settings.phoneNumber}
                onChange={(e) => setSettings((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings((prev) => ({ ...prev, address: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Social & Maps</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps URL</label>
              <input
                type="text"
                value={settings.googleMapsUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, googleMapsUrl: e.target.value }))}
                placeholder="https://maps.google.com/?q=..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                placeholder="https://facebook.com/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={settings.linkedinUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                placeholder="https://linkedin.com/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="text"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings((prev) => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Branding</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website Logo</label>
              {settings.websiteLogo && (
                <div className="mb-3">
                  <img src={settings.websiteLogo} alt="Logo" className="h-12 object-contain border border-gray-200 rounded-lg p-1 bg-white" />
                </div>
              )}
              <FileUpload
                accept="image/*"
                currentUrl={settings.websiteLogo}
                onUpload={handleLogoUpload}
                uploading={uploadingLogo}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
              {settings.favicon && (
                <div className="mb-3">
                  <img src={settings.favicon} alt="Favicon" className="h-8 w-8 object-contain border border-gray-200 rounded p-1 bg-white" />
                </div>
              )}
              <FileUpload
                accept="image/*"
                currentUrl={settings.favicon}
                onUpload={handleFaviconUpload}
                uploading={uploadingFavicon}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Change Password</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="button"
                onClick={async () => {
                  const currentPassword = document.getElementById("currentPassword").value;
                  const newPassword = document.getElementById("newPassword").value;
                  const confirmPassword = document.getElementById("confirmPassword").value;
                  if (!currentPassword || !newPassword || !confirmPassword) return;
                  
                  try {
                    const res = await fetch("/api/admin/auth/change-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      setMessage({ type: "success", text: data.message });
                      document.getElementById("currentPassword").value = "";
                      document.getElementById("newPassword").value = "";
                      document.getElementById("confirmPassword").value = "";
                    } else {
                      setMessage({ type: "error", text: data.error });
                    }
                  } catch (e) {
                    setMessage({ type: "error", text: "Failed to change password" });
                  }
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
