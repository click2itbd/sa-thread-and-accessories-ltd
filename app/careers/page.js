"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  X,
} from "lucide-react";

const DEPARTMENTS = [
  "Sewing Thread Section",
  "Elastic Section",
  "Twill Tape / Non-Elastic Tape Section",
  "Drawstring / Elastic Cord Section",
  "Marketing",
  "Factory Management",
  "Accounts & Finance",
  "Store / Loader",
  "Security",
  "Others",
];

const EXPERIENCE_LEVELS = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];

const WHY_JOIN = [
  "23+ years of stability in the garments accessories industry",
  "150+ strong workforce across 7 specialized sections",
  "Supplying 20+ renowned garment factories nationwide",
  "100% Oeko-Tex certified, quality-first environment",
];

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
    education: "",
    expectedSalary: "",
    subject: "Job Application",
    message: "",
    honeypot: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setFormData((prev) => ({ ...prev, department: job.department }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setFileError("Only PDF or Word files are allowed.");
      setResumeFile(null);
      return;
    }
    if (file.size > maxSize) {
      setFileError("File size must be under 5MB.");
      setResumeFile(null);
      return;
    }
    setFileError("");
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      setFileError("Please attach your CV / Resume.");
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      return;
    }

    setStatus("loading");
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value),
      );
      payload.append("resume", resumeFile);

      const res = await fetch("/api/careers", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          department: "",
          experience: "",
          education: "",
          expectedSalary: "",
          subject: "Job Application",
          message: "",
          honeypot: "",
        });
        setResumeFile(null);
        setSelectedJob(null);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2
              className="w-8 h-8 text-green-500"
              strokeWidth={1.5}
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Application Received!
          </h1>
          <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
            Thank you for applying to S.A. Thread &amp; Accessories Ltd. Our HR
            team will review your application and get back to you soon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {!loadingJobs && jobs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Open Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className={`bg-white rounded-xl border p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedJob?._id === job._id
                      ? "border-primary ring-1 ring-primary"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      {job.department}
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      {job.location}
                    </span>
                    <span className="bg-gray-50 px-2 py-1 rounded">
                      {job.employmentType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: Company / Branding Panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 bg-primary rounded-2xl p-8 md:p-10 text-white overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#5cc93f]/20 rounded-tr-full" />

              <p className="text-[11px] font-bold uppercase tracking-[2px] text-white/60 mb-3">
                Careers
              </p>
              <h1 className="text-[28px] md:text-[32px] font-extrabold leading-tight mb-4">
                Build Your Career With Us
              </h1>
              <p className="text-[14px] text-white/80 leading-relaxed mb-8">
                Since 2003, S.A. Thread &amp; Accessories Ltd. has been a
                trusted name in garments accessories. Join a team that values
                integrity, excellence, and growth.
              </p>

              <ul className="space-y-3 mb-10">
                {WHY_JOIN.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[13px] text-white/90 leading-snug"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5cc93f] shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/15 pt-6 space-y-3">
                <a
                  href="tel:+8801971170961"
                  className="flex items-center gap-3 text-[13px] text-white/90 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  +880 1971 170961
                </a>
                <a
                  href="mailto:sathread@gmail.com"
                  className="flex items-center gap-3 text-[13px] text-white/90 hover:text-white transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  sathread@gmail.com
                </a>
                <div className="flex items-start gap-3 text-[13px] text-white/90">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5" />
                  </span>
                  271/1 Gacha Road, Gacha, Gazipur-1704
                </div>
              </div>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                Job Application Form
              </h2>
              <p className="text-[13px] text-gray-500 mb-8">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>

              {selectedJob && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Applying for:{" "}
                      <span className="text-primary">{selectedJob.title}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedJob.department} · {selectedJob.location} ·{" "}
                      {selectedJob.employmentType}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all md:col-span-2"
                    />
                  </div>
                </div>

                {/* Position Details */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Position Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white text-gray-700"
                    >
                      <option value="">Select Department / Section *</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>

                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white text-gray-700"
                    >
                      <option value="">Experience Level *</option>
                      {EXPERIENCE_LEVELS.map((exp) => (
                        <option key={exp} value={exp}>
                          {exp}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      name="education"
                      placeholder="Highest Education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />

                    <input
                      type="text"
                      name="expectedSalary"
                      placeholder="Expected Salary (BDT)"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                {/* About You */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    About You
                  </h3>
                  <textarea
                    name="message"
                    placeholder="Tell us why you'd be a great fit, relevant skills, or anything else you'd like us to know *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-[14px] h-32 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Resume / CV
                  </h3>
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-10 px-4 cursor-pointer hover:border-primary hover:bg-blue-50/30 transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 text-gray-400 mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-[13px] font-semibold text-gray-600">
                      {resumeFile ? resumeFile.name : "Click to upload your CV"}
                    </span>
                    <span className="text-[12px] text-gray-400 mt-1">
                      PDF or Word, max 5MB
                    </span>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {fileError && (
                    <p className="text-[12px] text-red-600 mt-2">{fileError}</p>
                  )}
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? "Submitting..."
                    : "Submit Application"}
                </button>

                {status === "error" && (
                  <p className="text-[13px] text-red-600 bg-red-50 rounded-lg px-4 py-3 text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
