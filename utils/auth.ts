import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const setToken = async (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("adminToken", token);
  }
};

export const getToken = async () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken");
  }
  return null;
};

export const removeToken = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("adminToken");
  }
};

export const isAdmin = async () => {
  const token = await getToken();
  return !!token;
};

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE" | null;
  body?: string | object | null;
  headers?: Headers | null;
}

export const adminFetch = async (
  url: string,
  options: FetchOptions = { method: null, body: null, headers: null }
) => {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const method = options.method || "GET";
  const headers = options.headers
    ? new Headers(options.headers)
    : new Headers();

  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (options.body && method !== "GET") {
    requestOptions.body =
      typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
