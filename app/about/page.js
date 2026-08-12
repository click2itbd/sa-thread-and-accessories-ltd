import AboutCertifications from "./components/AboutCertifications";
import AboutCTA from "./components/AboutCTA";
import AboutDirectors from "./components/AboutDirectors";
import AboutHero from "./components/AboutHero";
import AboutMDMessage from "./components/AboutMDMessage";
import AboutNav from "./components/AboutNav";
import AboutTeam from "./components/aboutTeam";
import AboutValues from "./components/AboutValues";
import AboutWhoWeAre from "./components/AboutWhoWeAre";

export const metadata = {
  title: "About Us",
  description:
    "Learn about SA Thread & Accessories Ltd. — our 23-year history, our factory in Gazipur, and our dedicated team of professionals serving the garments industry.",
};

export default function AboutPage() {
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
          <section id="achievement">
            <AboutCertifications />
          </section>
          <section id="team">
            <AboutTeam />
          </section>
          <AboutValues />
          <AboutCTA />
        </div>
      </main>
    </>
  );
}
