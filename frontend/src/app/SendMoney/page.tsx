import React from "react";
import Transfer from "../transaction/Transfer";
import Header from "../components/Header";

const Page = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full px-6 py-4">
      <Header />

      <div className="flex items-center justify-center gap-16 px-6 py-12">
        {/* Illustration */}
        <img
          className="h-64 md:h-80 drop-shadow-lg"
          src="/sendMoney.svg"
          alt="Send Money"
        />

        {/* Transfer Section */}
        <div className="p-8 rounded-xl shadow-lg bg-gray-800">
          <Transfer />
        </div>
      </div>
    </div>
  );
};

export default Page;
