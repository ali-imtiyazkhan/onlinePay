"use client";

import { useState, useEffect } from "react";

export default function CheckBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // user token from login

  const fetchBalance = async () => {
    if (!token) {
      alert("You must be logged in to check balance.");
      return;
    }

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
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto text-center space-y-4">
      <h1 className="text-2xl font-bold">Check Balance</h1>
      {loading ? (
        <p>Loading...</p>
      ) : balance !== null ? (
        <p className="text-xl">Your Balance: ₹{balance}</p>
      ) : (
        <p>No balance data available.</p>
      )}
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchBalance}
      >
        Refresh Balance
      </button>
    </div>
  );
}
