"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, Search, FileText, Eye, EyeOff } from "lucide-react";

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  author: "SA Thread",
  category: "CSR",
  tags: [],
  isPublished: true,
  isActive: true,
};

export default function AdminBlogsClient() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState(emptyBlog);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs", { credentials: "include" });
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
      setBlogs(data.blogs || []);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setError(error.message || "Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        image: blog.image || "",
        author: blog.author || "SA Thread",
        category: blog.category || "CSR",
        tags: blog.tags ? [...blog.tags] : [],
        isPublished: blog.isPublished ?? true,
        isActive: blog.isActive ?? true,
      });
    } else {
      setEditingBlog(null);
      setFormData(emptyBlog);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingBlog(null);
    setFormData(emptyBlog);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingBlog ? `/api/admin/blogs/${editingBlog._id}` : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        fetchBlogs();
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

  const handleDelete = async (blog) => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    setDeleting(blog._id);
    try {
      const res = await fetch(`/api/admin/blogs/${blog._id}`, { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, edit, and manage blog posts for CSR page</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 bg-[#1F4D2C] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#163d24] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or category..."
          className="w-full sm:w-96 bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-700 text-sm font-medium">{error}</p>
          <button
            onClick={fetchBlogs}
            className="mt-3 text-sm text-red-600 hover:text-red-700 underline"
          >
            Retry
          </button>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            {searchQuery ? "No blogs match your search." : "No blogs yet. Add your first blog post!"}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Published</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          {blog.image ? (
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{blog.title}</div>
                          <div className="text-xs text-gray-500 truncate">{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.category}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {blog.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.isPublished ? "bg-blue-50 text-blue-700" : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(blog)}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blog)}
                          disabled={deleting === blog._id}
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
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editingBlog ? "Edit Blog" : "Add Blog"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <label className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                      <Upload className="w-4 h-4" />
                      {uploading ? "Uploading..." : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {!formData.image && <p className="text-xs text-gray-400 mt-1">or paste image URL below</p>}
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                  placeholder="https://... or upload above"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors mt-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) }))}
                  placeholder="CSR, Sustainability, Community"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1F4D2C] focus:ring-1 focus:ring-[#1F4D2C] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="blogIsPublished"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="blogIsPublished" className="text-sm font-medium text-gray-700">Published</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="blogIsActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4 text-[#1F4D2C] border-gray-300 rounded focus:ring-[#1F4D2C]"
                  />
                  <label htmlFor="blogIsActive" className="text-sm font-medium text-gray-700">Active</label>
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
                  {saving ? "Saving..." : editingBlog ? "Update Blog" : "Add Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
