import HeroSlider from "./components/home/HeroSlider";
import ClientsSection from "./components/home/ClientsSection";
import ProductsPreview from "./components/home/ProductsPreview";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="flex-1 w-full bg-white relative">
      <HeroSlider />
      <ClientsSection />
      <ProductsPreview />
    </main>
  );
}
