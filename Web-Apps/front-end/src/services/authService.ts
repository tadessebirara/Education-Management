import type { User, LoginResponse } from "../types";
import { loginUser, registerUser } from "./api";

// Define specific response types
interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
}

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = (await loginUser({
      email,
      password,
    })) as ApiResponse<LoginResponse>;

    if (response.status === "success" && response.data) {
      return response.data;
    }

    throw new Error(response.message || "Login failed");
  }

  async register(userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  }): Promise<User> {
    const response = (await registerUser(userData)) as ApiResponse<User>;

    if (response.status === "success" && response.data) {
      return response.data;
    }

    throw new Error(response.message || "Registration failed");
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
    }
  }

  async getProfile(): Promise<User> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = (await response.json()) as ApiResponse<User>;

    if (data.status === "success" && data.data) {
      return data.data;
    }

    throw new Error(data.message || "Failed to get profile");
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(
      "http://localhost:5000/api/auth/change-password",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      },
    );

    const data = (await response.json()) as ApiResponse<unknown>;

    if (data.status === "error") {
      throw new Error(data.message || "Failed to change password");
    }
  }
}

export const authService = new AuthService();
