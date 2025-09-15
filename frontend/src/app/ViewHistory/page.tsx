"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/api/v1/account/history", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success) {
          setTransactions(data.transactions);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold mb-4 text-white">Transaction History</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-white text-lg">Loading...</p>
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-white">No transactions found.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((txn) => (
              <li
                key={txn._id}
                className="p-3 border rounded shadow bg-gray-800 text-white"
              >
                <p><b>Amount:</b> ₹{txn.amount}</p>
                <p><b>Type:</b> {txn.type}</p>
                <p><b>Date:</b> {new Date(txn.createdAt).toLocaleString()}</p>

                {txn.type === "debit" ? (
                  <p><b>Sent To:</b> {txn.toUser?.username || "Unknown User"}</p>
                ) : (
                  <p><b>Received From:</b> {txn.fromUser?.username || "Unknown User"}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
