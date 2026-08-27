import { notFound } from "next/navigation";
import { headers } from "next/headers";
import AdminContactClient from "../../contact/ContactClient";

export default async function AdminContactDetailPage({ params }) {
  const { id } = await params;
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/admin/contact/${id}`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      if (res.status === 404) return notFound();
      return notFound();
    }

    const data = await res.json();
    const message = data.message;

    return (
      <div className="p-8">
        <AdminContactClient initialMessage={message} />
      </div>
    );
  } catch {
    return notFound();
  }
}
