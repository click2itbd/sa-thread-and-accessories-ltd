"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Upload, Eye, EyeOff, KeyRound, FileText, Award, Sparkles } from "lucide-react";
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
  companyProfilePdf: "/Certificates/Company Profile SA THREAD & ACCESSORIES LTD..pdf",
  companyProfileTitle: "Company Profile",
  companyProfileSubtitle: "SA Thread & Accessories Ltd. (PDF)",
  oekotexCertificatePdf: "/Certificates/Oekotex certificate-2025.pdf",
  oekotexCertificateTitle: "OEKO-TEX Certificate",
  oekotexCertificateSubtitle: "STANDARD 100 — 2025 (PDF)",
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingCompanyProfile, setUploadingCompanyProfile] = useState(false);
  const [uploadingOekotex, setUploadingOekotex] = useState(false);
  const [message, setMessage] = useState(null);

  // Password Change States
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setSettings({
          ...emptySettings,
          ...(data.settings || {}),
        });
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
        credentials: "include",
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
        credentials: "include",
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

  const handleCompanyProfilePdfUpload = async (file) => {
    if (!file) {
      setSettings((prev) => ({ ...prev, companyProfilePdf: "" }));
      return;
    }

    setUploadingCompanyProfile(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSettings((prev) => ({ ...prev, companyProfilePdf: data.url }));
      } else {
        alert(data.error || "Company profile upload failed");
      }
    } catch (error) {
      alert("Company profile upload failed");
    } finally {
      setUploadingCompanyProfile(false);
    }
  };

  const handleOekotexPdfUpload = async (file) => {
    if (!file) {
      setSettings((prev) => ({ ...prev, oekotexCertificatePdf: "" }));
      return;
    }

    setUploadingOekotex(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSettings((prev) => ({ ...prev, oekotexCertificatePdf: data.url }));
      } else {
        alert(data.error || "OEKO-TEX certificate upload failed");
      }
    } catch (error) {
      alert("OEKO-TEX certificate upload failed");
    } finally {
      setUploadingOekotex(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        credentials: "include",
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

  const handlePasswordChange = async (e) => {
    e?.preventDefault();
    setPasswordMessage(null);

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "Please fill in all password fields." });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      if (res.ok) {
        setPasswordMessage({ type: "success", text: data.message || "Password changed successfully!" });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setPasswordMessage(null), 4000);
      } else {
        setPasswordMessage({ type: "error", text: data.error || "Failed to change password." });
      }
    } catch (error) {
      setPasswordMessage({ type: "error", text: "An error occurred while changing password." });
    } finally {
      setChangingPassword(false);
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
        <p className="text-sm text-gray-500 mt-1">Manage global company information, branding, downloadable PDFs, and security</p>
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
          <h3 className="text-base font-semibold text-gray-900 mb-4">Social &amp; Maps</h3>
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

        {/* ── Documentation & Downloadable PDFs (About Us More Section) ── */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-semibold text-gray-900">
              Downloadable PDFs &amp; Documents (About Us More)
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-6">
            Upload, update, or replace the PDF documents and buttons shown on the About Us page under &quot;About Us More&quot;.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Company Profile PDF */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <FileText className="w-4 h-4 text-primary" />
                <span>Document 1: Company Profile</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Button Title</label>
                <input
                  type="text"
                  value={settings.companyProfileTitle || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, companyProfileTitle: e.target.value }))}
                  placeholder="e.g. Company Profile"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Note</label>
                <input
                  type="text"
                  value={settings.companyProfileSubtitle || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, companyProfileSubtitle: e.target.value }))}
                  placeholder="e.g. SA Thread & Accessories Ltd. (PDF)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Upload PDF File</label>
                <FileUpload
                  accept="application/pdf"
                  currentUrl={settings.companyProfilePdf}
                  onUpload={handleCompanyProfilePdfUpload}
                  uploading={uploadingCompanyProfile}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">or Direct PDF Path</label>
                <input
                  type="text"
                  value={settings.companyProfilePdf || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, companyProfilePdf: e.target.value }))}
                  placeholder="/Certificates/Company Profile.pdf"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-600 outline-none focus:border-[#1F4D2C] bg-white"
                />
              </div>
            </div>

            {/* 2. OEKO-TEX Certificate PDF */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Award className="w-4 h-4 text-primary" />
                <span>Document 2: OEKO-TEX Certificate</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Button Title</label>
                <input
                  type="text"
                  value={settings.oekotexCertificateTitle || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, oekotexCertificateTitle: e.target.value }))}
                  placeholder="e.g. OEKO-TEX Certificate"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subtitle / Note</label>
                <input
                  type="text"
                  value={settings.oekotexCertificateSubtitle || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, oekotexCertificateSubtitle: e.target.value }))}
                  placeholder="e.g. STANDARD 100 — 2025 (PDF)"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Upload PDF File</label>
                <FileUpload
                  accept="application/pdf"
                  currentUrl={settings.oekotexCertificatePdf}
                  onUpload={handleOekotexPdfUpload}
                  uploading={uploadingOekotex}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">or Direct PDF Path</label>
                <input
                  type="text"
                  value={settings.oekotexCertificatePdf || ""}
                  onChange={(e) => setSettings((prev) => ({ ...prev, oekotexCertificatePdf: e.target.value }))}
                  placeholder="/Certificates/Oekotex certificate-2025.pdf"
                  className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-mono text-gray-600 outline-none focus:border-[#1F4D2C] bg-white"
                />
              </div>
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

      {/* ── Direct Password Change Section (No Email / OTP needed) ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <KeyRound className="w-5 h-5 text-[#1F4D2C]" />
          <h3 className="text-base font-semibold text-gray-900">Change Admin Password</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Easily update your admin account password directly. No email OTP or verification link is required.
        </p>

        {passwordMessage && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm font-medium ${
              passwordMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {passwordMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Current Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Current Password *</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Password *</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Min 6 characters"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm New Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Re-type new password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={changingPassword}
              className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors disabled:opacity-50"
            >
              {changingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
