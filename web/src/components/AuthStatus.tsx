'use client';

import { useAuthStore } from '@/stores/auth.store';
import Link from 'next/link';

export default function AuthStatus() {
  const { isAuthenticated, user, setUser, setToken } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white">Hi, {user.email}!</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Login
    </Link>
  );
}