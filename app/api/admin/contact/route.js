import { NextResponse } from "next/server";
import ContactMessage from "@/lib/models/ContactMessage";
import connectToDatabase from "@/lib/mongoose";
import { getAdminFromRequest } from "@/lib/adminAuth";

export async function GET(request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const filterDate = searchParams.get("date") || "";
    const readFilter = searchParams.get("read") || "";

    const query = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }
    if (filterDate) {
      const start = new Date(filterDate);
      const end = new Date(filterDate);
      end.setDate(end.getDate() + 1);
      query.createdAt = { $gte: start, $lt: end };
    }
    if (readFilter === "read") {
      query.isRead = true;
    } else if (readFilter === "unread") {
      query.isRead = false;
    }

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });
    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    return NextResponse.json({ messages, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
