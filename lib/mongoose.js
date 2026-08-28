import mongoose from "mongoose";
import dns from "dns";

// Force Node.js to use IPv4 for DNS lookups (fixes querySrv ECONNREFUSED on some networks)
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore if not supported in runtime
}

const DEFAULT_URI = "mongodb+srv://muntasiralamresti04_db_user:muntasir26@cluster0.djvrapl.mongodb.net/?appName=Cluster0";
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_URI;
const MONGODB_DIRECT_URI = process.env.MONGODB_DIRECT_URI;

function getConnectionUri() {
  if (MONGODB_DIRECT_URI) return MONGODB_DIRECT_URI;

  if (MONGODB_URI.includes("cluster0.djvrapl.mongodb.net")) {
    const credentials = MONGODB_URI.match(/^mongodb\+srv:\/\/([^@]+)@/)?.[1];
    if (credentials) {
      return `mongodb://${credentials}@ac-cq9yvwy-shard-00-00.djvrapl.mongodb.net:27017,ac-cq9yvwy-shard-00-01.djvrapl.mongodb.net:27017,ac-cq9yvwy-shard-00-02.djvrapl.mongodb.net:27017/sathread?authSource=admin&replicaSet=atlas-8gc2fc-shard-0&tls=true&appName=Cluster0`;
    }
  }

  return MONGODB_URI;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(getConnectionUri(), {
      dbName: "sathread",
      family: 4,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default connectToDatabase;
