'use client';
import { fetchWithAuth } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { PublicUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? "login" : "register";
    const url = `http://localhost:3001/auth/${endpoint}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || (isLogin ? "Login failed" : "Register failed")
        );
      }

      if (isLogin) {
        //login successfully
        setToken(data.access_token);
        try {
          const userProfile: PublicUser = await fetchWithAuth(
            "http://localhost:3001/auth/profile"
          );
          setUser(userProfile); // Save user information to the store
          router.push("/"); // Redirect to home page
        } catch (profileError: any) {
          setError(
            "Successfully logged in but could not get user information."
          );
          setToken(null);
          // Delete token if profile cannot be obtained
        }
      } else {
        // Successful registration, move to login form
        alert("Registered successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500"
            >
              {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-400">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-400 hover:underline"
          >
            {isLogin ? "Register now" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
