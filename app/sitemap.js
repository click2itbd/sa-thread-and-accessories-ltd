import connectToDatabase from "@/lib/mongoose";
import Product from "@/lib/models/Product";
import { PRODUCTS } from "@/data/products";

export default async function sitemap() {
  const baseUrl = "https://www.sathread.com.bd";

  // Static pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/csr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let productRoutes = [];
  try {
    await connectToDatabase();
    const dbProducts = await Product.find({ isActive: { $ne: false } }).select("_id updatedAt").lean();
    
    if (dbProducts && dbProducts.length > 0) {
      productRoutes = dbProducts.map((p) => ({
        url: `${baseUrl}/products/${p._id}`,
        lastModified: p.updatedAt || new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    } else {
      productRoutes = PRODUCTS.map((p) => ({
        url: `${baseUrl}/products/${p.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }
  } catch (error) {
    productRoutes = PRODUCTS.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...productRoutes];
}
