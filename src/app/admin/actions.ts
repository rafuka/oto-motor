"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminLogin,
  adminLogout,
  getAdminSession,
  getAdminToken,
} from "@/lib/admin-auth";
import { supabase } from "@/lib/supabase";

export type LoginState = { error?: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) {
    return { error: "Introduce usuario y contraseña" };
  }
  const result = await adminLogin(username, password);
  if (!result.ok) return { error: result.error };
  redirect("/admin");
}

export async function logoutAction() {
  await adminLogout();
  redirect("/admin/login");
}

export type VehicleFormState = { error?: string; ok?: boolean } | null;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseLines(input: string): string[] {
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function upsertFromForm(
  formData: FormData,
  opts: { idFromName: boolean },
): Promise<VehicleFormState> {
  const session = await getAdminSession();
  const token = await getAdminToken();
  if (!session || !token) return { error: "Sesión expirada" };

  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const name = get("name");
  if (!name) return { error: "Nombre es obligatorio" };

  const id = opts.idFromName ? get("id") || slugify(name) : get("id");
  if (!id) return { error: "Falta el ID del vehículo" };

  const km = parseInt(get("km"), 10);
  if (Number.isNaN(km) || km < 0) return { error: "Kilometraje inválido" };

  const badgeText = get("badge_text");
  const badgeVariant = get("badge_variant") || "primary";
  const badge =
    badgeText.length > 0
      ? { text: badgeText, variant: badgeVariant === "dark" ? "dark" : "primary" }
      : null;

  const images = formData
    .getAll("images")
    .map((v) => String(v).trim())
    .filter(Boolean);
  if (images.length === 0) {
    return { error: "Añade al menos una imagen al detalle" };
  }

  const storyA = get("story_a");
  const storyB = get("story_b");
  if (!storyA || !storyB) return { error: "La narrativa requiere dos párrafos" };

  const amenities = parseLines(get("amenities"));

  const payload = {
    id,
    name,
    price: get("price"),
    badge,
    year: get("year"),
    km,
    tag3: get("tag3"),
    engine_short: get("engine_short"),
    fuel: get("fuel"),
    image: get("image") || images[0],
    image_alt: get("image_alt") || name,
    detail: {
      heroBadge: get("hero_badge"),
      heroSubtitle: get("hero_subtitle"),
      priceLine: get("price_line") || get("price"),
      images,
      story: [storyA, storyB],
      amenities,
      specs: {
        motor: get("motor"),
        motorDesc: get("motor_desc"),
        power: get("power"),
        powerDesc: get("power_desc"),
        accel: get("accel"),
        accelDesc: get("accel_desc"),
        trans: get("trans"),
        transDesc: get("trans_desc"),
      },
      narrativeImage: get("narrative_image") || images[0],
      narrativeImageAlt: get("narrative_image_alt") || name,
      financing: get("financing") || null,
    },
    listed: get("listed") !== "false",
  };

  const { error } = await supabase.rpc("admin_upsert_vehicle", {
    p_token: token,
    p_payload: payload,
  });
  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/vehiculo/${id}`);
  return { ok: true };
}

export async function addVehicleAction(
  _prev: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  return upsertFromForm(formData, { idFromName: true });
}

export async function editVehicleAction(
  _prev: VehicleFormState,
  formData: FormData,
): Promise<VehicleFormState> {
  return upsertFromForm(formData, { idFromName: false });
}

export async function deleteVehicleAction(formData: FormData) {
  const session = await getAdminSession();
  const token = await getAdminToken();
  if (!session || !token) return;
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await supabase.rpc("admin_delete_vehicle", {
    p_token: token,
    p_vehicle_id: id,
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function setVehicleListedAction(id: string, listed: boolean) {
  const session = await getAdminSession();
  const token = await getAdminToken();
  if (!session || !token) return { error: "unauthorized" };
  const { error } = await supabase.rpc("admin_set_listed", {
    p_token: token,
    p_vehicle_id: id,
    p_listed: listed,
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}
