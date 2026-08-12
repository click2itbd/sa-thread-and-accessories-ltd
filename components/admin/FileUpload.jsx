"use client";

import { useState } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

export default function FileUpload({
  label,
  accept,
  currentUrl,
  onUpload,
  uploading = false,
  previewClassName = "",
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentUrl || null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    await onUpload(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    onUpload(null);
  };

  const isPdf = file?.type === "application/pdf" || (currentUrl && !preview && !file?.type?.startsWith("image/"));

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="flex items-start gap-4">
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload"}
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {(preview || currentUrl) && (
          <div className="relative inline-flex items-center gap-3">
            {preview || currentUrl ? (
              isPdf ? (
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-700 hover:bg-red-100 transition-colors ${previewClassName}`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">View PDF</span>
                </a>
              ) : (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={preview || currentUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )
            ) : null}
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {!preview && !currentUrl && (
        <p className="text-xs text-gray-400 mt-1">or paste URL below</p>
      )}
    </div>
  );
}
