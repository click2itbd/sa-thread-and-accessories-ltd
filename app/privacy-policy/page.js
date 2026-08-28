import { PRIVACY_POLICY_CONTENT } from "@/data/siteContent";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and data protection terms of SA Thread & Accessories Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <header className="mb-12 border-b border-gray-100 pb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {PRIVACY_POLICY_CONTENT.title}
            </h1>
            <p className="text-gray-500">
              Last Updated: {PRIVACY_POLICY_CONTENT.lastUpdated}
            </p>
          </header>

          <div className="space-y-10">
            {PRIVACY_POLICY_CONTENT.sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
