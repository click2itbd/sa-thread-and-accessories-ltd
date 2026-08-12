import { notFound } from "next/navigation";
import AdminCertificatesClient from "../../certificates/CertificatesClient";

export default async function AdminEditCertificatePage({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`/api/admin/certificates/${id}`, {
      cache: "no-store",
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
