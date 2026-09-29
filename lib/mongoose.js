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
  return MONGODB_URI;
}

mongoose.set("bufferCommands", false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, offlineUntil: 0 };
}

async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) return cached.conn;

  // Fail fast if recently timed out/failed
  if (cached.offlineUntil && Date.now() < cached.offlineUntil) {
    throw new Error("MongoDB offline (cool-down active)");
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(getConnectionUri(), {
        dbName: "sathread",
        family: 4,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .catch((err) => {
        console.warn("MongoDB connection failed:", err.message);
        cached.offlineUntil = Date.now() + 30000;
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    cached.offlineUntil = 0;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export default connectToDatabase;
