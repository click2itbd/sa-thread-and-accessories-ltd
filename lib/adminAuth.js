import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "fallback-secret-change-in-production";

export async function getAdminFromRequest(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/admin-token=([^;]+)/);
  if (!match) return null;

  const token = match[1];
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }

  await connectToDatabase();
  const admin = await Admin.findById(decoded.adminId);
  return admin;
}
