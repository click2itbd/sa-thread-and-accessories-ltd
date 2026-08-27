"use client";

import {
  Users,
  Building2,
  Package,
  BadgeCheck,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { teamTabs, teamMembers } from "../data";
import Link from "next/link";

export default function AboutTeam({ members: propMembers }) {
  const membersSource =
    propMembers && propMembers.length > 0 ? propMembers : teamMembers;
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredTeam = membersSource.filter((m) => {
    const matchesTab = activeTab === "All Members" || m.dept === activeTab;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const leadershipCount = membersSource.filter(
    (member) => member.dept === "Management",
  ).length;
  const departmentCount = new Set(
    membersSource.map((member) => member.dept).filter(Boolean),
  ).size;
  const specialistCount = membersSource.length - leadershipCount;
  const teamStats = [
    {
      icon: Users,
      stat: `${membersSource.length}`,
      label: "Dedicated\nTeam Members",
    },
    {
      icon: BadgeCheck,
      stat: `${leadershipCount}`,
      label: "Leadership\nTeam Members",
    },
    {
      icon: Building2,
      stat: `${departmentCount}`,
      label: "Working\nDepartments",
    },
    {
      icon: Package,
      stat: `${specialistCount}`,
      label: "Marketing & Production\nSpecialists",
    },
  ];

  return (
    <section id="team" className="py-5 bg-gray-50/50 scroll-mt-24">
      <div className="container mx-auto px-6">
        <h2 className="text-primary text-[12px] font-bold uppercase tracking-[2px] mt-2 pb-8">
          MEET OUR TEAM
        </h2>

        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {teamStats.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#f0f4ff] rounded-full flex items-center justify-center text-primary shrink-0">
                <item.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <div className="text-[18px] font-bold text-gray-900">
                  {item.stat}
                </div>
                <div className="text-[11px] text-gray-500 whitespace-pre-line leading-snug">
                  {item.label}
                </div>
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
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
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
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTeam.length > 0 ? (
              filteredTeam.map((member, i) => {
                const contactLinks = [
                  member.facebookUrl,
                  member.linkedinUrl,
                  member.whatsappNumber,
                  member.email,
                  member.phone,
                ].filter(Boolean);
                const hasContact = contactLinks.length > 0;
                
                return (
                  <div
                    key={i}
                    className="relative bg-white rounded-xl border flex flex-col items-center justify-between shadow-sm transition-all overflow-hidden text-left border-gray-200 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="pt-7 pb-2 px-3 flex flex-col items-center w-full">
                      <div
                        className="img-protected w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-3 border-[3px] border-white shadow-md relative cursor-pointer hover:scale-105 transition-transform"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() => {
                          if (member.image) setSelectedImage(member.image);
                        }}
                      >
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover object-top object-fill"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            ?
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-[14px] text-gray-900 text-center leading-tight mb-1">
                        {member.name}
                      </div>
                      <div className="text-[12px] text-gray-500 text-center">
                        {member.role}
                      </div>
                    </div>

                    {hasContact && (
                      <div className="w-full py-3 mt-auto flex items-center justify-center gap-3 bg-gray-50 border-t border-gray-100">
                        {member.facebookUrl && (
                          <a
                            href={member.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full transition-colors hover:bg-blue-100 text-blue-600"
                            title="Facebook"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
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
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect x="2" y="9" width="4" height="12"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </a>
                        )}
                        {member.whatsappNumber && (
                          <a
                            href={`https://wa.me/${member.whatsappNumber.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full transition-colors hover:bg-green-100 text-green-600"
                            title="WhatsApp"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.988 2.895a9.865 9.865 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="p-1.5 rounded-full transition-colors hover:bg-gray-200 text-gray-600"
                            title="Email"
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone.replace(/\s/g, "")}`}
                            className="p-1.5 rounded-full transition-colors hover:bg-primary/10 text-primary"
                            title="Call"
                            aria-label="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p className="text-[14px]">
                  No members found matching your search criteria.
                </p>
              </div>
            )}
          </div>

          {/* Join Our Team Card */}
          <div className="lg:w-[200px] shrink-0 bg-[#f8fbff] rounded-xl border border-blue-100 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm mb-3">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
            </div>
            <h4 className="font-bold text-[14px] text-gray-900 mb-2">
              Join Our Team
            </h4>
            <p className="text-gray-500 text-[11px] leading-relaxed mb-4">
              Want to be a part of SA Thread & Accessories Ltd. family?
            </p>
            <Link
              href="/careers"
              className="border border-primary text-primary font-semibold text-[11px] py-1.5 px-4 rounded hover:bg-primary hover:text-white transition-colors w-full inline-block"
            >
              View Careers <span className="font-normal">-&gt;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors z-50"
              onClick={() => setSelectedImage(null)}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image 
                src={selectedImage} 
                alt="Team member zoomed" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
