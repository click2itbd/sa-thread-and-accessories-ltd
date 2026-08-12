import AdminCertificatesClient from "../CertificatesClient";

export default function AdminNewCertificatePage() {
  return (
    <div className="p-8">
      <AdminCertificatesClient initialCreate={true} />
    </div>
  );
}
