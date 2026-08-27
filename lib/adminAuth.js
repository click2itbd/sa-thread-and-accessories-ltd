import jwt from "jsonwebtoken";
import Admin from "@/lib/models/Admin";
import connectToDatabase from "@/lib/mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET environment variable is not defined");
  }
  return secret;
}

export async function getAdminFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;
  
  if (!token) return null;

  let decoded;
  try {
    const secret = getJwtSecret();
    decoded = jwt.verify(token, secret);
  } catch {
    return null;
  }

  // Ensure this is an access token, not a password reset token
  if (decoded.type !== "access") {
    return null;
  }

  await connectToDatabase();
  const admin = await Admin.findById(decoded.adminId);
  
  if (!admin || !admin.isActive) {
    return null;
  }
  
  return admin;
}

export async function requireAdmin() {
  const admin = await getAdminFromRequest();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
