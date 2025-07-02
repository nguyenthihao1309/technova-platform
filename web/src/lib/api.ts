import { useAuthStore } from "@/stores/auth.store";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    // General error handling is possible here, for example logout if token expires (401)
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong.");
  }

  return response.json();
};
