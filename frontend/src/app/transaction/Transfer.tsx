"use client";

import { useState } from "react";

export default function Transfer() {
    const [recipientUsername, setRecipientUsername] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [loading, setLoading] = useState(false);

    const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const handleTransfer = async () => {
        if (!token) return alert("You must be logged in to transfer funds.");
        if (!recipientUsername || !amount || amount <= 0)
            return alert("Enter valid username and amount");

        setLoading(true);

        try {

            const userRes = await fetch(
                `http://localhost:3001/api/v1/user/bulk?filter=${recipientUsername}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!userRes.ok) {
                const err = await userRes.json();
                throw new Error(err.message || "Recipient not found");
            }

            const recipient = await userRes.json();
            const recipientId = recipient._id || recipient.user?.[0]?._id;

            if (!recipientId) throw new Error("Recipient not found");

            const transferRes = await fetch(
                "http://localhost:3001/api/v1/account/transfer",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        to: recipientId,
                        amount,
                    }),
                }
            );

            const data = await transferRes.json();
            if (!transferRes.ok) throw new Error(data.message || "Transfer failed");

            alert(`Success! ₹${amount} transferred to ${recipientUsername}`);
            setRecipientUsername("");
            setAmount("");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto rounded-2xl shadow-lg space-y-4 bg-transparent">
            <h2 className="flex justify-center  text-2xl font-bold text-gray-700 dark:text-gray-200">
                💸 Transfer Funds
            </h2>

            <input
                type="text"
                placeholder="Recipient username/email"
                value={recipientUsername}
                onChange={(e) => setRecipientUsername(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                    setAmount(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleTransfer}
                disabled={loading}
                className={`w-full p-3 rounded-lg text-white font-semibold ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } transition`}
            >
                {loading ? "Transferring..." : "Transfer"}
            </button>
        </div>
    );
}
