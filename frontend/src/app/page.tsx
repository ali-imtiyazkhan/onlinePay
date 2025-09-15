"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "./components/Header";
import BalanceCard from "./components/BalanceCard";
import QuickActions from "./components/QuickAction";
import RecentTransactions from "./components/RecentTransaction";
import Footer from "./components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/SignUp");
    }
  }, [router]);

  return (
    <div className="font-sans min-h-screen flex flex-col p-6 sm:p-12 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BalanceCard />
        <QuickActions />
        <RecentTransactions />
      </main>

      <Footer />
    </div>
  );
}
