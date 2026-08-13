import mongoose from "mongoose";
import dns from "dns";

// Force Node.js to use IPv4 for DNS lookups (fixes querySrv ECONNREFUSED on some networks)
dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DIRECT_URI = process.env.MONGODB_DIRECT_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

function getConnectionUri() {
  if (MONGODB_DIRECT_URI) return MONGODB_DIRECT_URI;

  // Node's SRV resolver can time out on some Windows networks even though the
  // Atlas cluster itself is reachable. Use the cluster's direct replica-set
  // connection as a reliable fallback for this configured Atlas deployment.
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
    // Do not cache a failed connection attempt. Subsequent admin requests can
    // retry once the network or database becomes available.
    cached.promise = null;
    throw error;
  }
}

export default connectToDatabase;
