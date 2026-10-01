import { api } from "@/src/helper/axiosIntecpter";
import { clearAuthTokenCookie, setAuthTokenCookie } from "@/src/lib/authCookie";
import { AdminLoginFormInputs } from "@/src/zod/AdminLoginSchema";
import { AxiosError } from "axios";

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  admin: AdminUser;
}

class AuthService {
  /**
   * Logs in an admin user using credentials and stores the token and admin info.
   */
  async login(payload: AdminLoginFormInputs): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/admin/login", {
        email: payload.email.trim(),
        password: payload.password,
      });

      const { token, admin } = response;

      if (token && typeof window !== "undefined") {
        localStorage.setItem("authToken", token);
        setAuthTokenCookie(token);

        if (admin) {
          localStorage.setItem("adminUser", JSON.stringify(admin));
        }
      }

      return response;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosErr = error as AxiosError<{ message?: string; error?: string }>;
        const msg =
          axiosErr.response?.data?.message ||
          axiosErr.response?.data?.error ||
          axiosErr.message ||
          "Invalid email or password. Please try again.";
        throw new Error(msg);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unable to connect to the server. Please check your internet connection.");
    }
  }

  /**
   * Clears stored tokens and user details on logout.
   */
  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminUser");
      clearAuthTokenCookie();
    }
  }

  /**
   * Retrieves active auth token if available.
   */
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("authToken");
    if (!token || token === "undefined" || token === "null") return null;
    return token;
  }

  /**
   * Retrieves stored admin profile details.
   */
  getAdminUser(): AdminUser | null {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("adminUser");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as AdminUser;
    } catch {
      return null;
    }
  }

  /**
   * Checks whether the admin is authenticated.
   */
  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }
}

const authService = new AuthService();
export default authService;
export { AuthService };