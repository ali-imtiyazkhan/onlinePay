"use client";

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition col-span-2">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-6">⚡ Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        <a className="rounded-xl bg-blue-600 text-white h-12 px-6 flex items-center justify-center hover:bg-blue-700 transition font-medium text-sm sm:text-base shadow-md" href="#">
          💸 Send Money
        </a>
        <a className="rounded-xl bg-green-600 text-white h-12 px-6 flex items-center justify-center hover:bg-green-700 transition font-medium text-sm sm:text-base shadow-md" href="#">
          ➕ Add Funds
        </a>
        <a className="rounded-xl bg-gray-100 dark:bg-gray-700 h-12 px-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium text-sm sm:text-base" href="#">
          📄 View History
        </a>
      </div>
    </div>
  );
}
