"use client";

import { useState } from "react";

type HealthCheckResponse = {
  status: string;
  service: string;
};

export default function HomePage() {
  const [data, setData] = useState<HealthCheckResponse | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchHealth = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch("http://localhost:3001/api/health");
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const result: HealthCheckResponse = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white p-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          Welcome to <span className="text-blue-400">TechNova</span>!
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          This is where we will connect the Frontend and Backend.
        </p>

        <button
          onClick={handleFetchHealth}
          disabled={isLoading}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading" : "Backend Health Check"}
        </button>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg w-full max-w-md text-left">
          <h2 className="font-bold text-xl mb-2">Result from Backend:</h2>
          {isLoading && <p>Waiting for response...</p>}
          {error && <p className="text-red-400">Error: {error}</p>}
          {data && (
            <pre className="text-green-300 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {!isLoading && !error && !data && (
            <p className="text-gray-400">Press the button to get data.</p>
          )}
        </div>
      </div>
    </main>
  );
}
