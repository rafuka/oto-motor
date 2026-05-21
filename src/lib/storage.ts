import { supabase } from "./supabase";

export const VEHICLE_IMAGES_BUCKET = "imagenes de vehiculos";

function sanitizeFileName(name: string): string {
  const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const base = name.slice(0, name.length - ext.length);
  const safeBase = base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");
  return `${safeBase || "img"}${safeExt || ".jpg"}`;
}

export async function uploadVehicleImage(
  file: File,
  vehicleIdHint: string,
): Promise<{ url: string; path: string } | { error: string }> {
  const slug = vehicleIdHint || "sin-id";
  const filename = sanitizeFileName(file.name);
  const path = `${slug}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${filename}`;

  const { error } = await supabase.storage
    .from(VEHICLE_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (error) return { error: error.message };

  const { data } = supabase.storage
    .from(VEHICLE_IMAGES_BUCKET)
    .getPublicUrl(path);
  return { url: data.publicUrl, path };
}
