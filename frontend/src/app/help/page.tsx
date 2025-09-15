"use client";

import Header from "../components/Header";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How do I add funds to my account?",
    answer: "Go to the 'Add Funds' page, enter the amount, and submit. Make sure you are logged in.",
  },
  {
    question: "How can I view my transaction history?",
    answer: "Go to the 'Transaction History' page to see all your past deposits, withdrawals, and transfers.",
  },
  {
    question: "Can I transfer funds to another user?",
    answer: "Yes, only admins can transfer funds to other users. Enter the recipient User ID in the 'Add Funds' page.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Use the password reset option on the login page to reset your password via email.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Fixed Header */}
      <div className="bg-gray-900 px-6 py-4 fixed w-full z-10 shadow-md">
        <Header />
      </div>

      {/* Content */}
      <div className="flex-grow px-4 py-6 max-w-4xl mx-auto mt-[80px]"> 
        {/* mt-[80px] adds space for fixed header */}
        <h1 className="text-3xl font-bold mb-6 mt-4 text-center">Help & Support</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-gray-400">No matching FAQs found.</p>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex justify-between items-center font-medium text-lg focus:outline-none"
                >
                  {faq.question}
                  <span className="ml-2">{openIndex === index ? "−" : "+"}</span>
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-300">{faq.answer}</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you need further assistance, please reach out:</p>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li>Email: support@example.com</li>
            <li>Phone: +91 12345 67890</li>
            <li>Working Hours: Mon-Fri, 9AM - 6PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
