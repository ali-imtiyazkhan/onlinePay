"use client";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-12">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        💳 Payment Dashboard
      </h1>
      <nav className="flex gap-6 text-sm sm:text-base font-medium">
        <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</a>
        <a href="/transactions" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Transactions</a>
        <a href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Settings</a>
        <a href="/Admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Admin</a>
      </nav>
    </header>
  );
}
