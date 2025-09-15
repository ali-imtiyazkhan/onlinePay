"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function AddFunds() {
  const [amount, setAmount] = useState("");
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in.");
        return;
      }

      const res = await fetch("http://localhost:3001/api/v1/account/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          ...(toUser ? { to: toUser } : {}),
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: await res.text() };
      }

      if (res.ok) {
        setMessage(`${data.message}`);
        setAmount("");
        setToUser("");
      } else {
        setMessage(`${data.message || "Unknown error"}`);
      }
    } catch (err: any) {
      console.error("Add funds error:", err);
      setMessage(err.message || "Network error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-900 text-white px-6 py-4">
        <Header />
      </div>

      {/* Centered Form */}
      <div className="flex-grow flex justify-center items-center">
        <form
          onSubmit={handleAddFunds}
          className="bg-gray-800 px-8 py-6 rounded-2xl shadow-lg w-96 max-h-[90vh] overflow-hidden space-y-4"
        >
          <h2 className="text-xl font-bold text-center text-white">Add Funds</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Recipient User ID (Admin only)"
            value={toUser}
            onChange={(e) => setToUser(e.target.value)}
            className="w-full p-3 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Funds
          </button>

          {message && (
            <p className="text-center text-sm font-medium text-white">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
