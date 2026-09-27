import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongoose";
import Certificate from "@/lib/models/Certificate";
import AdminCertificatesClient from "../../certificates/CertificatesClient";

export const dynamic = "force-dynamic";

export default async function AdminEditCertificatePage({ params }) {
  const { id } = await params;

  let certificate = null;
  try {
    await connectToDatabase();
    certificate = await Certificate.findById(id).lean();
  } catch {
    return notFound();
  }

  if (!certificate) return notFound();

  return (
    <div className="p-8">
      <AdminCertificatesClient initialEdit={JSON.parse(JSON.stringify(certificate))} />
    </div>
  );
}
