import AdminJobsClient from "../jobs/JobsClient";

export default function AdminJobsPageWrapper() {
  return (
    <div className="p-8">
      <AdminJobsClient />
    </div>
  );
}
