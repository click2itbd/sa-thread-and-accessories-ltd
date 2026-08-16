"use client";

import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { TRUSTED_BRANDS } from "@/data/siteContent";

function getFallbackClients() {
  return TRUSTED_BRANDS.map((brand, index) => ({
    _id: `static-client-${index}`,
    name: brand.name,
    logo: brand.src,
    isActive: true,
  }));
}

export default function AboutClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed");
      })
      .then((data) =>
        setClients(data.clients?.length ? data.clients : getFallbackClients())
      )
      .catch(() => {
        setClients(getFallbackClients());
      });
  }, []);

  return (
    <section
      id="clients"
      className="py-12 bg-gradient-to-b from-white via-[#FAF9F6] to-white relative overflow-hidden scroll-mt-24"
    >
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8863B]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <p className="text-primary text-[12px] font-bold uppercase tracking-[3px] mb-4">
          Our Clients
        </p>
        <h3 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Trusted by Leading Brands
        </h3>
        <p className="text-gray-500 text-[14px] mb-10 leading-relaxed max-w-md">
          We proudly support renowned garment factories and brands across
          Bangladesh with reliable, quality accessories and consistent service.
        </p>

        {/* Empty State */}
        {clients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">No clients added yet.</p>
          </div>
        ) : (
          /* Clients Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((client) => (
              <div
                key={client._id}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-primary/30 transition-all"
              >
                {/* Logo Container */}
                <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm overflow-hidden">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="object-contain max-w-full max-h-full p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-gray-400 text-xs">?</div>
                  )}
                </div>

                {/* Client Name */}
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
