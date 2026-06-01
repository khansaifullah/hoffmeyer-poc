"use client";

import { useRef, useState } from "react";
import { ImageIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resolveImageUrl, uploadAdminImage } from "@/lib/api";
import { AdminInput, adminToastError } from "./AdminUi";

export default function AdminImageUpload({
  id,
  value = "",
  onChange,
  folder = "products",
  placeholder = "Image URL or upload a file",
  showPreview = true,
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadAdminImage(file, folder);
      onChange(url);
    } catch (err) {
      adminToastError("Image upload failed.", err.message || "Could not upload image.");
    } finally {
      setUploading(false);
    }
  }

  const previewUrl = resolveImageUrl(value);

  return (
    <div className="space-y-3">
      {showPreview ? (
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30">
          {previewUrl ? (
            <img src={previewUrl} alt="" className="h-full w-full object-contain" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground/60" aria-hidden="true" />
          )}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="border-[#16568D]/20 text-[#16568D] hover:bg-[#16568D]/5 hover:text-[#16568D]"
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Upload image"}
        </Button>
        {value ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange("")}
            className="text-muted-foreground"
          >
            Clear
          </Button>
        ) : null}
      </div>

      <AdminInput
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
