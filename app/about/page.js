import AboutCertifications from "./components/AboutCertifications";
import AboutCTA from "./components/AboutCTA";
import AboutDirectors from "./components/AboutDirectors";
import AboutHero from "./components/AboutHero";
import AboutMDMessage from "./components/AboutMDMessage";
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
        <main className="overflow-x-hidden">
          <AboutHero />
          <AboutWhoWeAre />
          <AboutDirectors />
          <AboutMDMessage />
          <AboutCertifications />
          <AboutTeam />
          <AboutValues />
          <AboutCTA />
        </main>
    )
}