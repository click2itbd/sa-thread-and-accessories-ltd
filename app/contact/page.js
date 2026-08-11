"use client";

import Image from "next/image";
import { CONTACT_PAGE_CONTENT, CONTACT_FORM_CONTENT } from "@/data/siteContent";
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Clock, Factory, Loader2, Mail, MapPin, Phone, Send, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import Button from "@/app/components/Button";

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
                setFormData({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
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
        <main>
            <div className="container mx-auto px-6 w-full pb-10">
                {/* Page Header */}
                <section className="flex flex-col md:flex-row items-center justify-between py-6 md:py-10 gap-10">
                    <div className="flex-1 max-w-[600px] text-center md:text-left">
                      <h4 className="text-primary text-sm font-semibold uppercase tracking-wide mb-4">
                       {CONTACT_PAGE_CONTENT.hero.eyebrow}  
                      </h4> 
                      <h1 className="text-4xl md:text-[42px] font-bold leading-tight mb-4 text-black/90 whitespace-pre-line">
                        {CONTACT_PAGE_CONTENT.hero.title}
                      </h1>
                      <p className="text-base text-black/70 max-w-[450px] mx-auto md:mx-0 whitespace-pre-line">
                        {CONTACT_PAGE_CONTENT.hero.description}
                      </p>
                    </div>
                    <div className="flex-1 flex justify-center md:justify-end w-full">
                      <Image src={CONTACT_PAGE_CONTENT.hero.image} alt="SA Thread & Accessories ltd" width={500} height={400} priority className="max-w-[500px] w-full h-auto object-contain"/>
                    </div>
                </section>

                {/* Contact Cards */}
                 <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                   {CONTACT_PAGE_CONTENT.cards.map((card) => {
                     const CardIcon = CARD_ICONS[card.key] ?? Building2;
                     return (
                       <div
                         key={card.key}
                         className="shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-4 bg-white text-center md:text-left"
                       >
                         <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary shrink-0">
                           <CardIcon className="w-6 h-6" strokeWidth={2} />
                         </div>
                         <div>
                           <h4 className="text-[15px] font-semibold text-gray-800 mb-1">
                             {card.title}
                           </h4>
                           {card.value ? (
                             <p className="text-[14px] text-primary font-medium mb-1">
                               {card.value}
                             </p>
                           ) : null}
                           {card.meta ? (
                             <span className="text-[12px] text-gray-500 block mb-2 whitespace-pre-line">
                               {card.meta}
                             </span>
                           ) : null}
                           {card.key === "location" ? (
                             <a
                               href="#"
                               className="text-primary text-[13px] font-semibold inline-flex items-center gap-1 hover:underline"  >
                               {card.link}
                               <ArrowRight className="w-3 h-3" strokeWidth={2} />
                             </a>
                           ) : null}
                         </div>
                       </div>
                     );
                   })}
                 </section>
                 

                 {/* Map and Form */}
                  <section className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Map Area */}
          <div className="flex-1 rounded-xl overflow-hidden relative min-h-[450px]">
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
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white p-5 rounded-xl shadow-lg max-w-[260px] z-10">
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
          <div className="flex-1  rounded-xl p-6 md:p-8 bg-white shadow-sm relative overflow-hidden">
            {/* ── Success Popup Modal ───────────────────────────────── */}
            {status === "success" && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl p-8 max-w-[420px] w-full text-center"
                  style={{ animation: "slideUp 0.35s cubic-bezier(.22,1,.36,1) both" }}
                >
                  {/* Animated circle */}
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-[bounce_0.6s_ease_1]">
                      <CheckCircle2 className="w-9 h-9 text-green-500" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[22px] font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-1">
                    Thank you, <span className="font-semibold text-gray-700">{formData.name || "valued client"}</span>.
                  </p>
                  <p className="text-[14px] text-gray-500 mb-7">
                    Our team will get back to you within <span className="font-semibold text-primary">24 hours</span>.
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

            <h3 className="text-xl font-semibold mb-2 text-[#2C3B52]">
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
                  className="w-full p-3.5 border border-border rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.name}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-border rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.email}
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-border rounded-lg text-[14px] outline-none focus:border-primary transition-colors focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                  placeholder={CONTACT_FORM_CONTENT.form.phone}
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={status === "submitting"}
                  className="w-full p-3.5 border border-border rounded-lg text-[14px] outline-none focus:border-primary transition-colors bg-white text-gray-600 focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
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
                className="w-full p-3.5 border border-border rounded-lg text-[14px] outline-none focus:border-primary transition-colors min-h-[120px] resize-y mb-4 focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                placeholder={CONTACT_FORM_CONTENT.form.message}
              ></textarea>

              <label className="flex items-center gap-2 text-[13px] text-gray-600 mb-6 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 accent-primary" />
                <span>
                  {CONTACT_FORM_CONTENT.form.privacyPolicy}{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                    {CONTACT_FORM_CONTENT.form.privacyPolicyLink}
                  </a>
                </span>
              </label>

              {status === "error" && (
                <p className="text-red-500 text-sm mb-4">Something went wrong. Please try again.</p>
              )}

              <button 
                type="submit"
                disabled={status === "submitting"}
                className={`w-full py-4 rounded-xl font-bold text-[15px] flex justify-center items-center transition-all duration-500 group relative overflow-hidden shadow-md ${
                  status === "submitting" ? "bg-black/90 cursor-not-allowed text-white" : 
                  "bg-black/90 text-white hover:shadow-xl hover:shadow-[#1F4D2C]/20"
                }`}
              >
                {/* Background Sweep Animation */}
                <span className="absolute inset-0 w-full h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                
                <span className="relative z-10 flex items-center">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" strokeWidth={2} />
                      Sending...
                    </>
                  ) : (
                    <>
                      {CONTACT_FORM_CONTENT.form.sendButton}
                      <Send className="w-4 h-4 ml-2" strokeWidth={2} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
          </section>
 

          {/* Bottom Banner */}
        <section className="flex flex-col lg:flex-row shadow-lg rounded-xl overflow-hidden">
          <div className="flex-[3] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-white p-6">
            {CONTACT_PAGE_CONTENT.highlights.map((item, index) => {
              const HighlightIcon = HIGHLIGHT_ICONS[index] ?? BadgeCheck;
              return (
                <div
                  key={item.title}
                  className={`flex items-start gap-3 p-4 ${index < CONTACT_PAGE_CONTENT.highlights.length - 1 ? "border-b sm:border-b-0 sm:border-r border-border border-dashed sm:border-solid" : ""}`}
                >
                  <HighlightIcon className="w-6 h-6 text-primary shrink-0" strokeWidth={2} />
                  <div>
                    <h5 className="text-[14px] font-semibold mb-1">
                      {item.title}
                    </h5>
                    <p className="text-[12px] text-gray-500 whitespace-pre-line">
                      {item.details.join("\n")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex-1 bg-primary p-6 flex flex-col justify-center items-center md:items-start text-white text-center md:text-left">
            <h4 className="text-[16px] font-semibold mb-2">
              {CONTACT_PAGE_CONTENT.banner.title}
            </h4>
            <p className="text-[13px] opacity-90 mb-4">
              {CONTACT_PAGE_CONTENT.banner.description}
            </p>
            <Button variant="white" className="w-full md:w-auto">
              {CONTACT_PAGE_CONTENT.banner.cta}
              <ArrowRight className="w-3 h-3 ml-1" strokeWidth={2} />
            </Button>
          </div>
        </section>

                   
            </div>
        </main>
    )
}