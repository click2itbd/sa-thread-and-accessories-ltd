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
          {activeBanks.map((bank, index) => (
            <div
              key={bank._id || index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 sm:mb-5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7h20L12 2z" />
                  <path d="M2 7l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                  <path d="M2 17l10 5 10-5" />
                </svg>
              </div>

              <h4 className="text-[16px] sm:text-[17px] font-bold text-gray-900 mb-2">
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
                {bank.swift && (
                  <p>
                    <span className="font-semibold text-gray-700">SWIFT:</span>{" "}
                    {bank.swift}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
