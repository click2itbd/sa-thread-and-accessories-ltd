import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest();
    
    if (!admin) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email: admin.email });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
