import Image from "next/image";
import { Landmark } from "lucide-react";
import { partnerBanks } from "../data";

export default function AboutPartnerBank({ banks: dbBanks }) {
  const activeBanks = dbBanks?.length > 0 ? dbBanks : partnerBanks;

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-gray-50/60 scroll-mt-24">
      <div className="container mx-auto px-5 sm:px-6">
        <p className="text-primary text-[11px] sm:text-[12px] font-bold uppercase tracking-[3px] mb-4 text-left">
          Partner Bank
        </p>

        <div className="text-left mb-8 sm:mb-10 max-w-2xl">
          <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-bold text-gray-900 mb-3 sm:mb-4 leading-tight tracking-tight text-left">
            Banking Partners
          </h3>
          <p className="text-gray-500 text-[13px] sm:text-[14px] leading-relaxed text-left">
            We maintain strong banking relationships with leading financial institutions to support our growing operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeBanks.map((bank, index) => {
            const logoUrl = bank.logo || bank.image;
            return (
              <div
                key={bank._id || index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {logoUrl ? (
                    <div className="relative w-full h-24 sm:h-28 mb-5 rounded-xl bg-white border border-gray-100 flex items-center justify-center p-3 overflow-hidden shadow-xs">
                      <Image
                        src={logoUrl}
                        alt={bank.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                        className="object-contain p-1"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5">
                      <Landmark className="w-7 h-7" />
                    </div>
                  )}

                  <h4 className="text-[17px] sm:text-[18px] font-bold text-gray-900 mb-3">
                    {bank.name}
                  </h4>

                  <div className="space-y-2 text-[12px] sm:text-[13px] text-gray-600 leading-relaxed">
                    {bank.branch && (
                      <p>
                        <span className="font-semibold text-gray-700">Branch:</span>{" "}
                        {bank.branch}
                      </p>
                    )}
                    {bank.address && (
                      <p>
                        <span className="font-semibold text-gray-700">Address:</span>{" "}
                        {bank.address}
                      </p>
                    )}
                    {bank.tel && (
                      <p>
                        <span className="font-semibold text-gray-700">Tel:</span>{" "}
                        {bank.tel}
                      </p>
                    )}
                    {bank.fax && (
                      <p>
                        <span className="font-semibold text-gray-700">Fax:</span>{" "}
                        {bank.fax}
                      </p>
                    )}
                  </div>
                </div>

                {bank.swift && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">SWIFT</span>
                    <span className="text-[12px] font-mono font-bold text-primary bg-primary/5 px-2.5 py-0.5 rounded-md">
                      {bank.swift}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
