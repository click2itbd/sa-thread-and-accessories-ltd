import { notFound } from "next/navigation";
import { headers } from "next/headers";
import AdminCertificatesClient from "../../certificates/CertificatesClient";

export default async function AdminEditCertificatePage({ params }) {
  const { id } = await params;
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/admin/certificates/${id}`, {
      cache: "no-store",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      if (res.status === 404) return notFound();
      return notFound();
    }

    const data = await res.json();
    const certificate = data.certificate;

    return (
      <div className="p-8">
        <AdminCertificatesClient initialEdit={certificate} />
      </div>
    );
  } catch {
    return notFound();
  }
}
