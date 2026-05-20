const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function getApiUrl(path = "") {
  return `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function apiFetch(path, options = {}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("hoffmeyer_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(getApiUrl(path), {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || data.errors?.email?.[0] || "Request failed";
    throw new Error(message);
  }

  return data;
}

export async function fetchCategories() {
  const result = await apiFetch("/categories");
  return result.data;
}

export async function fetchProducts() {
  const result = await apiFetch("/products");
  return result.data;
}
