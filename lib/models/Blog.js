import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, default: "SA Thread" },
  category: { type: String, default: "CSR" },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
