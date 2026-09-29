import Image from "next/image";
import Link from "next/link";
import ClientModel from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";
import { TRUSTED_BRANDS } from "@/data/siteContent";

async function getClients() {
  try {
    await connectToDatabase();
    const clients = await ClientModel.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();
      
    if (clients && clients.length > 0) {
      return JSON.parse(JSON.stringify(clients));
    }
  } catch (error) {
    console.warn("Clients API using fallback data:", error.message);
  }

  // Fallback
  return TRUSTED_BRANDS.map((brand, index) => ({
    _id: `static-client-${index}`,
    name: brand.name,
    logo: brand.src,
    isActive: true,
  }));
}

export default async function ClientsSection() {
  const clients = await getClients();

  if (!clients || clients.length === 0) return null;

  return (
    <section className="py-8 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Trusted by Leading Brands
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We proudly supply to 20+ renowned garment factories and brands
            across Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {clients.map((client) => (
            <Link
              key={client._id}
              href="/about#clients"
              className="group flex flex-col items-center justify-center p-6 bg-transparent rounded-xl border border-transparent hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 mb-3 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={120}
                  className="object-contain max-w-full max-h-full p-2 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                {client.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
