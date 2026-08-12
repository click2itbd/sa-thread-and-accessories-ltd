import AdminProductsClient from "../products/ProductsClient";

export default function AdminProductsPageWrapper() {
  return (
    <div className="p-8">
      <AdminProductsClient />
    </div>
  );
}
