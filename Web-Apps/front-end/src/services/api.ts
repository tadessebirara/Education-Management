// front-end/src/services/api.ts

const API_URL = "http://localhost:5000/api";

// Define response types
interface ApiResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function loginUser(data: LoginData): Promise<ApiResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
