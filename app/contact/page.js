"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { CONTACT_PAGE_CONTENT, CONTACT_FORM_CONTENT } from "@/data/siteContent";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  Factory,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import Button from "@/app/components/Button";

function ContactSearchParamsHandler({ setFormData }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const subjectParam = searchParams.get("subject");
    const productParam = searchParams.get("product");

    if (subjectParam || productParam) {
      setFormData((prev) => ({
        ...prev,
        subject: subjectParam || prev.subject || "Product Inquiry",
        message: productParam
          ? `Hello, I am inquiring about "${productParam}". Please provide details regarding availability, specifications, and ${subjectParam ? subjectParam.toLowerCase() : "inquiry"}.`
          : prev.message,
      }));

      const el = document.getElementById("contact-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams, setFormData]);

  return null;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  // Card icon

  const CARD_ICONS = {
    phone: Phone,
    email: Mail,
    location: MapPin,
    support: Building2, // Office / Fax card
  };

  // Highlight icon

  const HIGHLIGHT_ICONS = [Clock, Factory, ShieldCheck, BadgeCheck];

  const closeModal = () => setStatus("idle");

  return (
    <main className="bg-white">
      <Suspense fallback={null}>
        <ContactSearchParamsHandler setFormData={setFormData} />
      </Suspense>
      {/* Hero */}
      <section className="relative overflow-visible bg-[#f7f9fc]">
        {/* Subtle wavy pattern — right */}
        <svg
          className="absolute top-0 right-0 w-[50%] h-full pointer-events-none opacity-20"
          viewBox="0 0 500 400"
          preserveAspectRatio="xMaxYMid slice"
          aria-hidden="true"
        >
          <path
            d="M400 0 Q350 100 400 200 T400 400"
            fill="none"
            stroke="#1a56d9"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M440 0 Q390 120 440 220 T440 400"
            fill="none"
            stroke="#1a56d9"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M360 0 Q310 80 360 180 T360 400"
            fill="none"
            stroke="#93b5ff"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
        </svg>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-10 md:pb-14 lg:pb-[4.5rem]">
            {/* Left: text */}
            <div className="text-start">
              <h4 className="text-primary text-[13px] font-semibold uppercase tracking-widest mb-3">
                {CONTACT_PAGE_CONTENT.hero.eyebrow} —
              </h4>
              <h1 className="text-[34px] md:text-[42px] font-bold leading-tight mb-3 text-gray-900 whitespace-pre-line">
                {CONTACT_PAGE_CONTENT.hero.title}
              </h1>
              <p className="text-[14px] md:text-[15px] text-gray-500 max-w-[420px]  whitespace-pre-line leading-relaxed">
                {CONTACT_PAGE_CONTENT.hero.description}
              </p>
            </div>

            {/* Right: image */}
            <div className="flex justify-center lg:justify-end">
              <Image
                src={CONTACT_PAGE_CONTENT.hero.image}
                alt="SA Thread & Accessories ltd"
                width={480}
                height={200}
                priority
                className="max-w-[400px] lg:max-w-[460px] w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Contact Cards — half overlaps into next section */}
        <div className="container mx-auto px-6 relative z-20 -mt-28 md:-mt-32 lg:-mt-36 translate-y-6 md:translate-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_PAGE_CONTENT.cards.map((card) => {
              const CardIcon = CARD_ICONS[card.key] ?? Building2;
              return (
                <div
                  key={card.key}
                  className="rounded-xl p-5 flex items-start gap-3.5 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary shrink-0">
                    <CardIcon
                      className="w-[18px] h-[18px]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[13px] font-bold text-gray-900 mb-0.5">
                      {card.title}
                    </h4>
                    {card.value ? (
                      <p className="text-[13px] text-primary font-semibold mb-0.5 leading-snug">
                        {card.value}
                      </p>
                    ) : null}
                    {card.meta ? (
                      <span className="text-[11px] text-gray-500 block leading-relaxed whitespace-pre-line">
                        {card.meta}
                      </span>
                    ) : null}
                    {card.key === "location" ? (
                      <a
                        href={CONTACT_FORM_CONTENT.map.directionHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-[12px] font-semibold inline-flex items-center gap-1 mt-1 hover:underline"
                      >
                        {card.link}
                        <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
                      </a>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 w-full pb-12 pt-16 md:pt-20 lg:pt-24">
        {/* Map and Form */}
        <section id="contact-form" className="flex flex-col lg:flex-row gap-6 mb-12 scroll-mt-28">
          {/* Map Area */}
          <div className="flex-1 rounded-xl overflow-hidden relative min-h-[450px] border border-gray-200">
            {/* Real Google Maps embed – Gazipur Chowrasta, Bangladesh */}
            <iframe
              src={CONTACT_FORM_CONTENT.map.src}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={CONTACT_FORM_CONTENT.map.title}
            ></iframe>

            {/* Address Info Card overlay */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white p-5 rounded-xl shadow-md border border-gray-100 max-w-[260px] z-10">
              <h4 className="text-[15px] font-semibold mb-2">
                {CONTACT_PAGE_CONTENT.mapCard.title}
              </h4>
              <p className="text-[12px] text-gray-600 mb-1 whitespace-pre-line">
                {CONTACT_PAGE_CONTENT.mapCard.address}
              </p>

              <a
                href={CONTACT_FORM_CONTENT.map.directionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-[13px] font-semibold flex items-center gap-1 hover:underline"
              >
                Get Direction
                <ArrowRight className="w-3 h-3" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="flex-1 rounded-xl p-6 md:p-8 bg-white border border-gray-200 relative overflow-hidden">
            {/* ── Success Popup Modal ───────────────────────────────── */}
            {status === "success" && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(6px)",
                }}
                onClick={(e) => {
                  if (e.target === e.currentTarget) closeModal();
                }}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-[420px] w-full text-center"
                  style={{
                    animation: "slideUp 0.35s cubic-bezier(.22,1,.36,1) both",
                  }}
                >
                  {/* Animated circle */}
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-[bounce_0.6s_ease_1]">
                      <CheckCircle2
                        className="w-9 h-9 text-green-500"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-1">
                    Thank you,{" "}
                    <span className="font-semibold text-gray-700">
                      {formData.name || "valued client"}
                    </span>
                    .
                  </p>
                  <p className="text-[14px] text-gray-500 mb-7">
                    Our team will get back to you within{" "}
                    <span className="font-semibold text-primary">24 hours</span>
                    .
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 mb-6" />

                  {/* Close button */}
                  <Button
                    onClick={closeModal}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold text-[14px] hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </Button>

                  {/* Corner X */}
                  <Button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <style>{`
                  @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)    scale(1); }
                  }
                `}</style>
              </div>
            )}

            <h3 className="text-xl font-bold mb-2 text-gray-900">
              {CONTACT_PAGE_CONTENT.form.title}
            </h3>
            <p className="text-[13px] text-gray-500 mb-6">
              {CONTACT_PAGE_CONTENT.form.description}
            </p>

            <form onSubmit={handleSubmit}>
              {/* Honeypot Anti-Spam Field */}
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.name}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.email}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.phone}
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-primary transition-colors bg-white text-gray-600 focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {CONTACT_FORM_CONTENT.form.subject}
                  </option>
                  {CONTACT_FORM_CONTENT.form.subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "submitting"}
                className="w-full p-3.5 border border-gray-200 rounded-lg text-[14px] outline-none focus:border-primary transition-colors min-h-[120px] resize-y mb-4 focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                placeholder={CONTACT_FORM_CONTENT.form.message}
              ></textarea>

              <label className="flex items-center gap-2 text-[13px] text-gray-600 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 accent-primary"
                />
                <span>
                  {CONTACT_FORM_CONTENT.form.privacyPolicy}{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {CONTACT_FORM_CONTENT.form.privacyPolicyLink}
                  </a>
                </span>
              </label>

              {status === "error" && (
                <p className="text-red-500 text-sm mb-4">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-3.5 rounded-lg font-bold text-[15px] flex justify-center items-center gap-2 transition-all duration-300 ${
                  status === "submitting"
                    ? "bg-primary/70 cursor-not-allowed text-white"
                    : "bg-primary text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
                }`}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" strokeWidth={2} />
                    Sending...
                  </>
                ) : (
                  <>
                    {CONTACT_FORM_CONTENT.form.sendButton}
                    <Send className="w-4 h-4" strokeWidth={2} />
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-gray-200">
          <div className="flex-[3] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-gray-50/80 p-6 md:p-8">
            {CONTACT_PAGE_CONTENT.highlights.map((item, index) => {
              const HighlightIcon = HIGHLIGHT_ICONS[index] ?? BadgeCheck;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 p-3 md:p-4 ${index < CONTACT_PAGE_CONTENT.highlights.length - 1 ? "md:border-r md:border-gray-200" : ""}`}
                >
                  <HighlightIcon
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    strokeWidth={1.75}
                  />
                  <div>
                    <h5 className="text-[13px] font-bold text-gray-900 mb-1">
                      {item.title}
                    </h5>
                    <p className="text-[12px] text-gray-500 whitespace-pre-line leading-relaxed">
                      {item.details.join("\n")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative flex-1 bg-gradient-to-br from-[#1a56d9] to-[#2563eb] p-6 md:p-8 flex flex-col justify-center items-center md:items-start text-white text-center md:text-left overflow-hidden">
            {/* Watermark spool */}
            <svg
              viewBox="0 0 24 24"
              className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 text-white opacity-[0.08] translate-x-1/4 translate-y-1/4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
              <path d="M6 9h12M6 15h12M9 6V3M15 6V3M9 21v-3M15 21v-3" />
            </svg>

            <h4 className="text-[15px] font-bold mb-2 relative z-10">
              {CONTACT_PAGE_CONTENT.banner.title}
            </h4>
            <p className="text-[13px] text-white/85 mb-5 relative z-10 leading-relaxed">
              {CONTACT_PAGE_CONTENT.banner.description}
            </p>
            {/* <Button
              variant="white"
              className="relative z-10 w-full md:w-auto rounded-lg font-bold text-[13px]"
            >
              {CONTACT_PAGE_CONTENT.banner.cta}
              <ArrowRight className="w-3.5 h-3.5 ml-1" strokeWidth={2.5} />
            </Button> */}
          </div>
        </section>
      </div>
    </main>
  );
}
