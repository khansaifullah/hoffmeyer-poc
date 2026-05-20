import { apiFetch } from "./api";

const TOKEN_KEY = "hoffmeyer_token";
const USER_KEY = "hoffmeyer_user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function login(email, password) {
  const result = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem(TOKEN_KEY, result.token);
  localStorage.setItem(USER_KEY, JSON.stringify(result.user));

  return result.user;
}

export async function logout() {
  try {
    if (getToken()) {
      await apiFetch("/logout", { method: "POST" });
    }
  } finally {
    clearAuth();
  }
}

export async function getCurrentUser() {
  if (!getToken()) return null;

  const result = await apiFetch("/user");
  localStorage.setItem(USER_KEY, JSON.stringify(result.user));
  return result.user;
}
