"use client";

import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";

export default function AboutClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data.clients || []))
      .catch((err) => console.error("Failed to fetch clients:", err));
  }, []);

  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-white via-[#FAF9F6] to-white relative overflow-hidden scroll-mt-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8863B]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <p className="text-primary text-[12px] font-bold uppercase tracking-[3px] mb-4">
          Our Clients
        </p>
        <h3 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Trusted by Leading Brands
        </h3>
        <p className="text-gray-500 text-[14px] mb-10 leading-relaxed max-w-md">
          We proudly supply to 20+ renowned garment factories and brands across Bangladesh.
        </p>

        {clients.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm">No clients added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {clients.map((client) => (
              <div
                key={client._id}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#1F4D2C]/30 transition-all"
              >
                <div className="relative w-16 h-16 mb-3 rounded-full overflow-hidden bg-gray-50 border border-gray-200">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
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
