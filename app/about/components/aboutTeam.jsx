"use client";

import { Clock, Users, Building2, Package } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { teamTabs, teamMembers } from "../data";

export default function AboutTeam() {
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");
  // ── Member detail panel disabled (uncomment to re-enable) ──────────────────
  // const [selectedMember, setSelectedMember] = useState(null);
  // const handleMemberClick = (member) => {
  //   if (selectedMember?.name === member.name) {
  //     setSelectedMember(null);
  //   } else {
  //     setSelectedMember(member);
  //   }
  // };

  const filteredTeam = teamMembers.filter(m => {
    const matchesTab = activeTab === "All Members" || m.dept === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <h2 className="text-[28px] font-bold text-primary uppercase text-center mb-10 tracking-wide">MEET OUR TEAM</h2>
        
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
  {[
    { icon: Clock, stat: "23+ Yrs", label: "In Operation\nSince 2003" },
    { icon: Users, stat: "150+", label: "Factory Workforce\nAcross 7 sections" },
    { icon: Building2, stat: "20+", label: "Garment Factories\nSupplied Nationwide" },
    { icon: Package, stat: "5", label: "Core Product Lines\nThread to Tips" },
  ].map((item, i) => (
    <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="w-12 h-12 bg-[#f0f4ff] rounded-full flex items-center justify-center text-primary shrink-0">
        <item.icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <div className="text-left">
        <div className="text-[18px] font-bold text-gray-900">{item.stat}</div>
        <div className="text-[11px] text-gray-500 whitespace-pre-line leading-snug">{item.label}</div>
      </div>
    </div>
  ))}
</div>

        {/* Tab Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {["All Members", ...teamTabs].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white shadow-md"
                    : "bg-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              placeholder="Search team member..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-[13px] outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Team Grid */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredTeam.length > 0 ? filteredTeam.map((member, i) => {
              // const isSelected = selectedMember?.name === member.name;  ← re-enable for detail panel
              return (
                <div
                  key={i}
                  className="relative bg-white rounded-xl border flex flex-col items-center justify-between shadow-sm transition-all overflow-hidden text-left border-gray-200 hover:border-gray-300 hover:shadow-md"
                  // onClick={() => handleMemberClick(member)}  ← re-enable for detail panel
                >
                  <div className="pt-6 pb-2 px-3 flex flex-col items-center w-full">
                    <div className="img-protected w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-3 border-[3px] border-white shadow-sm relative" onContextMenu={(e) => e.preventDefault()}>
                      <Image src={member.image} alt={member.name} fill className="object-cover"/>
                    </div>
                    <div className="font-bold text-[13px] text-gray-900 text-center leading-tight mb-1">{member.name}</div>
                    <div className="text-[11px] text-gray-500 text-center">{member.role}</div>
                  </div>
                  
                  <div className="w-full py-3 mt-auto flex items-center justify-center gap-3 bg-gray-50 border-t border-gray-100">
                    {member.facebookUrl && (
                      <a 
                        href={member.facebookUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full transition-colors hover:bg-blue-100 text-blue-600"
                        title="Facebook"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a 
                        href={member.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full transition-colors hover:bg-blue-100 text-blue-700"
                        title="LinkedIn"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                    )}
                    {member.whatsappNumber && (
                      <a 
                        href={`https://wa.me/${member.whatsappNumber}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full transition-colors hover:bg-green-100 text-green-600"
                        title="WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.988 2.895a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p className="text-[14px]">No members found matching your search criteria.</p>
              </div>
            )}
          </div>

          {/* Join Our Team Card */}
          <div className="lg:w-[200px] shrink-0 bg-[#f8fbff] rounded-xl border border-blue-100 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
            </div>
            <h4 className="font-bold text-[14px] text-gray-900 mb-2">Join Our Team</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-4">Want to be a part of S.A. Thread & Accessories Ltd. family?</p>
            <button className="border border-primary text-primary font-semibold text-[11px] py-1.5 px-4 rounded hover:bg-primary hover:text-white transition-colors w-full">
              View Careers <span className="font-normal">-&gt;</span>
            </button>
          </div>
        </div>

        {/* ── Featured Member Detail Card (disabled — uncomment to re-enable) ─────
        {selectedMember && (
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col lg:flex-row gap-10 relative mt-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full p-1.5 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            Left Photo & Info
            <div className="flex items-center gap-6 lg:w-1/3">
              <div className="img-protected relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shrink-0 shadow-sm border border-white" onContextMenu={(e) => e.preventDefault()}>
                <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover mix-blend-multiply opacity-90"/>
              </div>
              <div>
                <h4 className="text-[20px] font-bold text-gray-900 mb-1">{selectedMember.name}</h4>
                <p className="text-gray-500 text-[13px] mb-4 font-medium">{selectedMember.role}</p>
                <div className="space-y-2.5">
                  <a href={`mailto:${selectedMember.email}`} className="text-[12px] text-gray-600 flex items-center gap-2 hover:text-primary transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary/70" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {selectedMember.email}
                  </a>
                  <a href={`tel:${selectedMember.phone}`} className="text-[12px] text-gray-600 flex items-center gap-2 hover:text-primary transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary/70" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    {selectedMember.phone}
                  </a>
                  <div className="text-[12px] text-gray-600 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary/70" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {selectedMember.location}
                  </div>
                </div>
              </div>
            </div>
            
            Middle About & Expertise
            <div className="lg:w-1/3 lg:border-l border-gray-100 lg:pl-8">
              <h5 className="text-[14px] font-bold text-gray-900 mb-2">About</h5>
              <p className="text-[12px] text-gray-500 leading-relaxed mb-5">{selectedMember.about}</p>
              <h5 className="text-[14px] font-bold text-gray-900 mb-2.5">Expertise</h5>
              <div className="flex flex-wrap gap-2">
                {selectedMember.expertise.map(e => (
                  <span key={e} className="px-3 py-1 bg-blue-50/50 text-primary text-[11px] font-semibold rounded-full border border-blue-100">{e}</span>
                ))}
              </div>
            </div>

            Right Responsibilities & Contact
            <div className="lg:w-1/3 flex flex-col justify-between bg-gray-50/50 rounded-xl p-5 border border-gray-50">
              <div>
                <h5 className="text-[14px] font-bold text-gray-900 mb-3">Key Responsibilities</h5>
                <ul className="space-y-2.5">
                  {selectedMember.responsibilities.map((r, i) => (
                    <li key={i} className="text-[12px] text-gray-600 flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100/50 flex items-center justify-center shrink-0 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-primary"/></div>
                      <span className="leading-snug">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col xl:flex-row gap-3 pt-4 border-t border-gray-100">
                <div className="flex-1">
                   <h5 className="text-[12px] font-bold text-gray-900 mb-1">Contact Directly</h5>
                   <div className="text-[11px] text-gray-500">{selectedMember.email}</div>
                </div>
                <a href={`mailto:${selectedMember.email}`} className="bg-primary text-white font-semibold text-[12px] px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Send Message
                </a>
              </div>
            </div>
          </div>
        )}
        ── End of Featured Member Detail Card ── */}

        {/* Core Values Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 border-t border-gray-100 pt-8">
          {[
            { icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>, title: "Integrity", text: "We do the right thing, always." },
            { icon: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>, title: "Excellence", text: "Committed to the highest standards." },
            { icon: <path d="M9 21h6M12 21v-4M9 17h6M12 17a4.5 4.5 0 0 1-4.5-4.5c0-1.6.8-3.1 2.1-3.9A4.5 4.5 0 0 0 12 2a4.5 4.5 0 0 0 2.4 6.6c1.3.8 2.1 2.3 2.1 3.9A4.5 4.5 0 0 1 12 17z"/>, title: "Innovation", text: "Continuously improving and innovating." },
            { icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>, title: "Teamwork", text: "Together we achieve more." },
            { icon: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>, title: "Customer Focus", text: "Dedicated to our customers' success." }
          ].map((v, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100">
              <div className="text-primary mt-1 shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{v.icon}</svg></div>
              <div>
                <h6 className="font-bold text-[13px] text-gray-900 mb-0.5">{v.title}</h6>
                <p className="text-[11px] text-gray-500 leading-snug">{v.text}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
