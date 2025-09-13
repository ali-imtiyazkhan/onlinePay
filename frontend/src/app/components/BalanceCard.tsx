"use client";

import { useState, useEffect } from "react";

export default function BalanceCard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchBalance = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/account/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch balance");
      }

      const data = await res.json();
      setBalance(data.balance);
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition col-span-1">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Available Balance</h2>
      <p className="text-4xl font-extrabold text-green-600 dark:text-green-400 mt-4">
        {loading ? "Loading..." : balance !== null ? `₹${balance.toLocaleString("en-IN")}` : "₹0.00"}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated just now</p>
    </div>
  );
}
