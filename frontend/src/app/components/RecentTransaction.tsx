"use client";

export default function RecentTransactions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition col-span-3">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">📊 Recent Transactions</h2>
      <ul className="space-y-4 text-sm">
        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <span>🛒 Payment to Amazon</span>
          <span className="text-red-500 font-medium">- ₹1,200</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <span>👤 Received from Rahul</span>
          <span className="text-green-500 font-medium">+ ₹2,500</span>
        </li>
        <li className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <span>📱 Recharge Mobile</span>
          <span className="text-red-500 font-medium">- ₹299</span>
        </li>
        <li className="flex justify-between">
          <span>🍔 UPI Transfer to Swiggy</span>
          <span className="text-red-500 font-medium">- ₹450</span>
        </li>
      </ul>
    </div>
  );
}
