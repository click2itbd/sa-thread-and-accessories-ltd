import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import ContactMessage from "@/lib/models/ContactMessage";
import AdminContactClient from "../../contact/ContactClient";

export const dynamic = "force-dynamic";

export default async function AdminContactDetailPage({ params }) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const message = await ContactMessage.findById(id).lean();
    if (!message) return notFound();

    return (
      <div className="p-8">
        <AdminContactClient initialMessage={JSON.parse(JSON.stringify(message))} />
      </div>
    );
  } catch {
    return notFound();
  }
}
