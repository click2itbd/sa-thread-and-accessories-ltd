"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Calendar,
  Users,
  Clock,
  Eye,
  GraduationCap,
  Banknote,
  Building2,
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
  `${new Date().getFullYear() - 2003}+ years of stability in the garments accessories industry`,
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
  const [viewingJob, setViewingJob] = useState(null);
  const formSectionRef = useRef(null);

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

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (viewingJob) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [viewingJob]);

  const handleApplyForJob = (job, e) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setViewingJob(null);
    setFormData((prev) => ({
      ...prev,
      department: job.department || prev.department,
      subject: `Job Application - ${job.title}`,
    }));
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const departmentOptions = Array.from(
    new Set([
      ...DEPARTMENTS,
      ...jobs.map((j) => j.department).filter(Boolean),
      ...(selectedJob?.department ? [selectedJob.department] : []),
    ])
  );

  const experienceOptions = Array.from(
    new Set([
      ...EXPERIENCE_LEVELS,
      ...jobs.map((j) => j.experience).filter(Boolean),
      ...(selectedJob?.experience ? [selectedJob.experience] : []),
    ])
  );

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
      if (selectedJob?.title) {
        payload.append("jobTitle", selectedJob.title);
      }
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
            Thank you for applying to SA Thread &amp; Accessories Ltd. Our HR
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
                  className={`bg-white rounded-2xl border p-6 cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between group ${
                    selectedJob?._id === job._id
                      ? "border-primary ring-2 ring-primary/15"
                      : "border-gray-200/80 hover:border-primary/40"
                  }`}
                  onClick={() => setViewingJob(job)}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                          {job.department}
                        </span>
                        <h3 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200/60 shrink-0">
                        {job.status}
                      </span>
                    </div>

                    <p className="text-[13px] text-gray-500 mt-2 mb-4 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="space-y-1.5 text-[12px] text-gray-600 mb-5">
                      {job.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </div>
                      )}
                      <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
                        {job.employmentType && (
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            {job.employmentType}
                          </span>
                        )}
                        {job.experience && (
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            Exp: {job.experience}
                          </span>
                        )}
                      </div>
                      {job.deadline && (
                        <div className="flex items-center gap-2 text-amber-700 font-medium pt-0.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            Deadline:{" "}
                            {new Date(job.deadline).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingJob(job);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleApplyForJob(job, e)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
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
                Since 2003, SA Thread &amp; Accessories Ltd. has been a trusted
                name in garments accessories. Join a team that values integrity,
                excellence, and growth.
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
          <div className="lg:col-span-3" ref={formSectionRef}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-10">
              <h2 className="text-[20px] font-bold text-gray-900 mb-1">
                Job Application Form
              </h2>
              <p className="text-[13px] text-gray-500 mb-8">
                Fields marked with <span className="text-red-500">*</span> are
                required.
              </p>

              {selectedJob && (
                <div className="mb-6 p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Applying for:{" "}
                      <span className="text-primary">{selectedJob.title}</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {selectedJob.department} · {selectedJob.location} ·{" "}
                      {selectedJob.employmentType}
                      {selectedJob.experience
                        ? ` · Exp: ${selectedJob.experience}`
                        : ""}
                    </p>
                    <button
                      type="button"
                      onClick={() => setViewingJob(selectedJob)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Full Job Details
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-blue-100 transition-colors shrink-0"
                    title="Clear selected job"
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
                      {departmentOptions.map((dept) => (
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
                      {experienceOptions.map((exp) => (
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

      {/* Job Details Modal rendered via Portal to document.body */}
      {viewingJob &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setViewingJob(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Branded Modal Header */}
              <div className="bg-primary px-6 py-5 text-white flex items-start justify-between gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#5cc93f] text-white">
                      {viewingJob.status}
                    </span>
                    <span className="text-xs font-medium text-white/80">
                      {viewingJob.department}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {viewingJob.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setViewingJob(null)}
                  className="p-2 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
                {/* Job Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-primary" />
                      <span>Job Type</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {viewingJob.employmentType || "Full-time"}
                      {viewingJob.workplace ? ` · ${viewingJob.workplace}` : ""}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>Experience</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {viewingJob.experience || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                      <Banknote className="w-3.5 h-3.5 text-green-600" />
                      <span>Salary</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-green-700">
                      {viewingJob.salary || "Negotiable"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>Vacancy</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {viewingJob.vacancy || 1}{" "}
                      {Number(viewingJob.vacancy) > 1 ? "Positions" : "Position"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 col-span-2 sm:col-span-2">
                    <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>Application Deadline</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                      {viewingJob.deadline
                        ? new Date(viewingJob.deadline).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "Open until filled"}
                    </p>
                  </div>
                </div>

                {/* Location & Education Bar */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2.5 text-xs sm:text-[13px]">
                  {viewingJob.education && (
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-800">
                          Education:{" "}
                        </span>
                        <span className="text-gray-600">
                          {viewingJob.education}
                        </span>
                      </div>
                    </div>
                  )}
                  {viewingJob.location && (
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-800">
                          Work Location:{" "}
                        </span>
                        <span className="text-gray-600">
                          {viewingJob.location}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Overview / Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Job Description
                  </h3>
                  <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                    {viewingJob.description}
                  </div>
                </div>

                {/* Key Responsibilities */}
                {viewingJob.responsibilities && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Key Responsibilities
                    </h3>
                    <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                      {viewingJob.responsibilities}
                    </div>
                  </div>
                )}

                {/* Additional Requirements */}
                {viewingJob.requirements && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Requirements &amp; Skills
                    </h3>
                    <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                      {viewingJob.requirements}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {viewingJob.benefits && (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                      Compensation &amp; Other Benefits
                    </h3>
                    <div className="text-[14px] text-gray-700 leading-relaxed whitespace-pre-line">
                      {viewingJob.benefits}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewingJob(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200/70 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={(e) => handleApplyForJob(viewingJob, e)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-blue-700 shadow-sm transition-colors"
                >
                  Apply for this Position
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
