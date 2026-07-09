"use client";

import { useState } from "react";

export default function LoginWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === process.env.NEXT_PUBLIC_EMAIL && password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials. Hint: admin@example.com / admin");
    }
  };

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white w-full">
      <div className="p-8 bg-neutral-800 rounded-lg shadow-xl w-96 border border-neutral-700">
        <h1 className="text-2xl font-bold mb-6 text-center">Access Restricted</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              placeholder="Enter email..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
              placeholder="Enter password..."
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition font-medium mt-2"
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  );
}
