"use client";

import CheckBalance from "../transaction/CheckBalance";

export default function Footer() {
  return (
    <footer className="mt-12 flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
      <a href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Help</a>
      <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a>
      <a href="/SignIn" className="hover:text-red-600 dark:hover:text-red-400 transition">Logout</a>
    </footer>
  );
}
