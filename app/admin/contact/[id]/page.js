import { notFound } from "next/navigation";
import AdminContactClient from "../../contact/ContactClient";

export default async function AdminContactDetailPage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`/api/admin/contact/${id}`, {
      cache: "no-store",
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
