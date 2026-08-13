"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Search, Package, Star } from "lucide-react";
import Link from "next/link";
import FileUpload from "@/components/admin/FileUpload";

const EMPTY_PRODUCT = {
  name: "",
  category: "",
  shortDescription: "",
  fullDescription: "",
  images: [],
  keyFeatures: [],
  specifications: [],
  availableColors: [],
  extraColors: 0,
  applications: [],
  packaging: [],
  packagingDetails: { type: "", netWeight: "", packing: "" },
  productionCapacity: { perDay: "", perMonth: "" },
  displayOrder: 0,
  isActive: true,
  isFeatured: false,
};

function parseLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpecs(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    })
    .filter((s) => s.label && s.value);
}

export default function AdminProductsPage({ initialEdit = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(!!initialEdit);
  const [editingProduct, setEditingProduct] = useState(initialEdit || null);
  const [formData, setFormData] = useState(() => {
    if (initialEdit) {
      return {
        name: initialEdit.name || "",
        category: initialEdit.category || "",
        shortDescription: initialEdit.shortDescription || "",
        fullDescription: initialEdit.fullDescription || "",
        images: initialEdit.images ? [...initialEdit.images] : [],
        keyFeatures: initialEdit.keyFeatures || [],
        specifications: initialEdit.specifications || [],
        availableColors: initialEdit.availableColors || [],
        extraColors: initialEdit.extraColors || 0,
        applications: initialEdit.applications || [],
        packaging: initialEdit.packaging || [],
        packagingDetails: initialEdit.packagingDetails || { type: "", netWeight: "", packing: "" },
        productionCapacity: initialEdit.productionCapacity || { perDay: "", perMonth: "" },
        displayOrder: initialEdit.displayOrder || 0,
        isActive: initialEdit.isActive ?? true,
        isFeatured: initialEdit.isFeatured ?? false,
      };
    }
    return EMPTY_PRODUCT;
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products", { credentials: "include" });
      if (res.status === 401) {
        setError("Session expired or not logged in. Please log in again.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }
      const data = await res.json();
      setProducts(data.products || []);
      const cats = [...new Set((data.products || []).map((p) => p.category).filter(Boolean))];
      setUniqueCategories(cats);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error.message || "Unable to load products. Please check your database connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        category: product.category || "",
        shortDescription: product.shortDescription || "",
        fullDescription: product.fullDescription || "",
        images: product.images ? [...product.images] : [],
        keyFeatures: product.keyFeatures || [],
        specifications: product.specifications || [],
        availableColors: product.availableColors || [],
        extraColors: product.extraColors || 0,
        applications: product.applications || [],
        packaging: product.packaging || [],
        packagingDetails: product.packagingDetails || { type: "", netWeight: "", packing: "" },
        productionCapacity: product.productionCapacity || { perDay: "", perMonth: "" },
        displayOrder: product.displayOrder || 0,
        isActive: product.isActive ?? true,
        isFeatured: product.isFeatured ?? false,
      });
    } else {
      setEditingProduct(null);
      setFormData(EMPTY_PRODUCT);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setFormData(EMPTY_PRODUCT);
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, images: [] }));
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: 'include',
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, images: [data.url] }));
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (error) {
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        keyFeatures: parseLines(formData.keyFeatures?.join("\n") || ""),
        specifications: formData.specifications || [],
        availableColors: parseLines(formData.availableColors?.join("\n") || ""),
        applications: parseLines(formData.applications?.join("\n") || ""),
        packaging: parseLines(formData.packaging?.join("\n") || ""),
      };

      const url = editingProduct ? `/api/admin/products/${editingProduct._id}` : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        fetchProducts();
        handleCloseModal();
      } else {
        const data = await res.json();
        alert(data.error || "Save failed");
      }
    } catch (error) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeleting(product._id);
    try {
      const res = await fetch(`/api/admin/products/${product._id}`, { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== product._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage products, categories, and display order</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          />
        </div>

        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-3 text-sm text-red-600 hover:text-red-700 underline"
          >
            Retry
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery || filterCategory ? "No products match your filters." : "No products yet. Add your first product!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Featured</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[200px]">{product.shortDescription}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.displayOrder}</td>
                    <td className="px-6 py-4">
                      {product.isFeatured ? (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <Star className="w-4 h-4 text-gray-300" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {product.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          disabled={deleting === product._id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Extra Colors (+N)</label>
                  <input
                    type="number"
                    value={formData.extraColors}
                    onChange={(e) => setFormData((prev) => ({ ...prev, extraColors: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                  required
                />
              </div>

              <FileUpload
                label="Product Image"
                accept="image/*"
                currentUrl={formData.images?.[0] || ""}
                onUpload={handleImageUpload}
                uploading={uploading}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Features (one per line)</label>
                <textarea
                  value={formData.keyFeatures?.join("\n") || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, keyFeatures: e.target.value.split("\n") }))}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (format: Label: Value, one per line)</label>
                <textarea
                  value={formData.specifications?.map((s) => `${s.label}: ${s.value}`).join("\n") || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, specifications: e.target.value.split("\n").map(line => { const [label, ...rest] = line.split(":"); return { label: label.trim(), value: rest.join(":").trim() }; }).filter(s => s.label && s.value) }))}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Colors (one hex per line)</label>
                <textarea
                  value={formData.availableColors?.join("\n") || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, availableColors: e.target.value.split("\n").map(c => c.trim()).filter(Boolean) }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applications (one per line)</label>
                <textarea
                  value={formData.applications?.join("\n") || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, applications: e.target.value.split("\n") }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Packaging (one per line)</label>
                <textarea
                  value={formData.packaging?.join("\n") || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, packaging: e.target.value.split("\n") }))}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Packaging Type</label>
                  <input
                    type="text"
                    value={formData.packagingDetails?.type || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, packagingDetails: { ...prev.packagingDetails, type: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight</label>
                  <input
                    type="text"
                    value={formData.packagingDetails?.netWeight || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, packagingDetails: { ...prev.packagingDetails, netWeight: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Packing</label>
                  <input
                    type="text"
                    value={formData.packagingDetails?.packing || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, packagingDetails: { ...prev.packagingDetails, packing: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Production Capacity / Day</label>
                  <input
                    type="text"
                    value={formData.productionCapacity?.perDay || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, productionCapacity: { ...prev.productionCapacity, perDay: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Production Capacity / Month</label>
                  <input
                    type="text"
                    value={formData.productionCapacity?.perMonth || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, productionCapacity: { ...prev.productionCapacity, perMonth: e.target.value } }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="productIsActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="productIsActive" className="text-sm font-medium text-gray-700">Active</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="productIsFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="productIsFeatured" className="text-sm font-medium text-gray-700">Featured</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-lg text-sm font-semibold bg-[#1F4D2C] text-white hover:bg-[#163d24] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

