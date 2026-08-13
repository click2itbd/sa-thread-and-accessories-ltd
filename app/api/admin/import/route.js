import { NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import TeamMember from "@/lib/models/TeamMember";
import Certificate from "@/lib/models/Certificate";
import Client from "@/lib/models/Client";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { PRODUCTS } from "@/data/products";
import { teamMembers, certifications } from "@/app/about/data";
import { TRUSTED_BRANDS } from "@/data/siteContent";

export async function POST(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { type } = await request.json();

    if (!type || !["products", "team", "certificates", "clients", "all"].includes(type)) {
      return NextResponse.json({ error: "Invalid type. Use 'products', 'team', 'certificates', 'clients', or 'all'" }, { status: 400 });
    }

    const results = {};

    if (type === "products" || type === "all") {
      const existingProducts = await Product.find({});
      const existingCount = existingProducts.length;

      if (existingCount === 0) {
        const productsToImport = PRODUCTS.map((p, index) => ({
          name: p.title,
          category: p.category,
          shortDescription: p.type || "",
          fullDescription: p.description,
          images: [p.image],
          keyFeatures: p.keyFeatures || [],
          specifications: p.specifications || [],
          availableColors: p.availableColors || [],
          extraColors: p.extraColors || 0,
          applications: p.applications || [],
          packaging: p.packaging || [],
          packagingDetails: p.packagingDetails || {},
          productionCapacity: p.productionCapacity || {},
          displayOrder: index + 1,
          isActive: true,
          isFeatured: false,
        }));

        await Product.insertMany(productsToImport);
        results.products = { imported: productsToImport.length, message: "Products imported successfully" };
      } else {
        results.products = { imported: 0, message: `Products already exist (${existingCount} found)` };
      }
    }

    if (type === "team" || type === "all") {
      const existingMembers = await TeamMember.find({});
      const existingCount = existingMembers.length;

      if (existingCount === 0) {
        const membersToImport = teamMembers.map((m, index) => ({
          name: m.name,
          role: m.role,
          dept: m.dept,
          image: m.image,
          email: m.email || "",
          phone: m.phone || "",
          location: m.location || "",
          facebookUrl: m.facebookUrl || "",
          linkedinUrl: m.linkedinUrl || "",
          whatsappNumber: m.whatsappNumber || "",
          about: m.about || "",
          expertise: m.expertise || [],
          responsibilities: m.responsibilities || [],
          displayOrder: index + 1,
          isActive: true,
        }));

        await TeamMember.insertMany(membersToImport);
        results.team = { imported: membersToImport.length, message: "Team members imported successfully" };
      } else {
        results.team = { imported: 0, message: `Team members already exist (${existingCount} found)` };
      }
    }

    if (type === "certificates" || type === "all") {
      const existingCerts = await Certificate.find({});
      const existingCount = existingCerts.length;

      if (existingCount === 0) {
        const certsToImport = certifications.map((c, index) => ({
          title: c.abbr,
          description: c.sub || "",
          image: c.image,
          pdfFile: "",
          isActive: true,
          displayOrder: index + 1,
        }));

        await Certificate.insertMany(certsToImport);
        results.certificates = { imported: certsToImport.length, message: "Certificates imported successfully" };
      } else {
        results.certificates = { imported: 0, message: `Certificates already exist (${existingCount} found)` };
      }
    }

    if (type === "clients" || type === "all") {
      const existingClients = await Client.find({});
      const existingCount = existingClients.length;

      if (existingCount === 0) {
        const clientsToImport = TRUSTED_BRANDS.map((c, index) => ({
          name: c.name,
          logo: c.src,
          displayOrder: index + 1,
          isActive: true,
        }));

        await Client.insertMany(clientsToImport);
        results.clients = { imported: clientsToImport.length, message: "Clients imported successfully" };
      } else {
        results.clients = { imported: 0, message: `Clients already exist (${existingCount} found)` };
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
