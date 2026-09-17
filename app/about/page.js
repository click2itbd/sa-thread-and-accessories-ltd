import connectToDatabase from "@/lib/mongoose";
import TeamMember from "@/lib/models/TeamMember";
import Certificate from "@/lib/models/Certificate";
import CompanySettings from "@/lib/models/CompanySettings";
import BankPartner from "@/lib/models/BankPartner";

import AboutCertifications from "./components/AboutCertifications";
import AboutCTA from "./components/AboutCTA";
import AboutClients from "./components/AboutClients";
import AboutDirectors from "./components/AboutDirectors";
import AboutFuturePlan from "./components/AboutFuturePlan";
import AboutHero from "./components/AboutHero";
import AboutMDMessage from "./components/AboutMDMessage";
import AboutNav from "./components/AboutNav";
import AboutPartnerBank from "./components/AboutPartnerBank";
import AboutTeam from "./components/aboutTeam";
import AboutValues from "./components/AboutValues";
import AboutWhoWeAre from "./components/AboutWhoWeAre";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const years = new Date().getFullYear() - 2003;
  return {
    title: "About Us",
    description: `Learn about SA Thread & Accessories Ltd. — our ${years}-year history, our factory in Gazipur, and our dedicated team of professionals serving the garments industry.`,
  };
}

async function getAboutData() {
  try {
    await connectToDatabase();
    const [teamMembers, certificates, settings, banks] = await Promise.all([
      TeamMember.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: 1 }).lean(),
      Certificate.find({ isActive: { $ne: false } }).sort({ order: 1, createdAt: -1 }).lean(),
      CompanySettings.findOne({}).lean(),
      BankPartner.find({ isActive: { $ne: false } }).sort({ displayOrder: 1, createdAt: 1 }).lean(),
    ]);

    return {
      teamMembers: JSON.parse(JSON.stringify(teamMembers || [])),
      certificates: JSON.parse(JSON.stringify(certificates || [])),
      settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
      banks: JSON.parse(JSON.stringify(banks || [])),
    };
  } catch (error) {
    console.error("Error fetching about page data from DB:", error);
    return {
      teamMembers: [],
      certificates: [],
      settings: null,
      banks: [],
    };
  }
}

export default async function AboutPage() {
  const { teamMembers, certificates, settings, banks } = await getAboutData();

  return (
    <>
      <AboutNav />
      <main className="overflow-x-hidden">
        <div className="container mx-auto px-4">
          <section id="about">
            <AboutHero />
          </section>
          <section id="who-we-are">
            <AboutWhoWeAre />
          </section>
          <section id="board-of-directors">
            <AboutDirectors />
          </section>
          <section id="message">
            <AboutMDMessage />
          </section>
          <section id="team">
            <AboutTeam members={teamMembers} />
          </section>
          <section id="clients">
            <AboutClients />
          </section>
          <section id="partner-bank">
            <AboutPartnerBank banks={banks} />
          </section>
          <section id="achievement">
            <AboutCertifications certificates={certificates} />
          </section>
          <section id="future-plan">
            <AboutFuturePlan settings={settings} />
          </section>
          <AboutValues />
          <AboutCTA />
        </div>
      </main>
    </>
  );
}
