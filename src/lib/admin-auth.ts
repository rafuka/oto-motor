import { cookies } from "next/headers";
import { supabase } from "./supabase";

const COOKIE_NAME = "otomotor_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export type AdminUser = { user_id: string; username: string };

export async function getAdminSession(): Promise<AdminUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const { data, error } = await supabase.rpc("admin_session_user", {
    p_token: token,
  });
  if (error || !data || data.length === 0) return null;
  return data[0] as AdminUser;
}

export async function adminLogin(
  username: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { data, error } = await supabase.rpc("admin_login", {
    p_username: username,
    p_password: password,
  });
  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0) {
    return { ok: false, error: "Usuario o contraseña incorrectos" };
  }

  const { token } = data[0] as { token: string };
  const store = await cookies();
  store.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return { ok: true };
}

export async function adminLogout(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    await supabase.rpc("admin_logout", { p_token: token });
  }
  store.delete(COOKIE_NAME);
}

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}
