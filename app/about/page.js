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

export const metadata = {
  title: "About Us",
  description:
    "Learn about SA Thread & Accessories Ltd. — our 23-year history, our factory in Gazipur, and our dedicated team of professionals serving the garments industry.",
};

async function getTeamMembers() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/team`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data.members || [];
  } catch {
    return [];
  }
}

async function getCertificates() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/certificates`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data.certificates || [];
  } catch {
    return [];
  }
}

async function getSettings() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/settings`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data.settings || null;
  } catch {
    return null;
  }
}

async function getBanks() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/banks`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    return data.banks || [];
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  const certificates = await getCertificates();
  const settings = await getSettings();
  const banks = await getBanks();

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
          <section id="future-plan">
            <AboutFuturePlan settings={settings} />
          </section>
          <section id="achievement">
            <AboutCertifications certificates={certificates} />
          </section>
          <section id="clients">
            <AboutClients />
          </section>
          <section id="partner-bank">
            <AboutPartnerBank banks={banks} />
          </section>
          <section id="team">
            <AboutTeam members={teamMembers} />
          </section>
          <AboutValues />
          <AboutCTA />
        </div>
      </main>
    </>
  );
}
