"use client";

import Header from "../components/Header";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Fixed Header */}
      <div className="bg-gray-900 px-6 py-4 fixed w-full z-10 shadow-md">
        <Header />
      </div>

      {/* Content */}
      <div className="flex-grow px-4 py-6 max-w-4xl mx-auto mt-[80px]">
        <h1 className="text-3xl font-bold mb-6 text-center pt-6">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-300">
            We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your data when using our application.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. Information Collection</h2>
          <p className="text-gray-300">
            We may collect information such as your name, email, account details, and usage data. This helps us provide a better experience and improve our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Use of Information</h2>
          <p className="text-gray-300">
            Collected information is used for account management, transaction processing, customer support, and improving our services. We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p className="text-gray-300">
            We implement industry-standard security measures to protect your information. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Cookies and Tracking</h2>
          <p className="text-gray-300">
            Our application may use cookies and similar technologies to enhance user experience. You can manage your cookie preferences in your browser settings.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to access, update, or delete your personal information. Contact us via the support page for any requests related to your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions or concerns about this Privacy Policy, please reach out to us at:
          </p>
          <ul className="mt-2 space-y-1 text-gray-300">
            <li>Email: support@example.com</li>
            <li>Phone: +91 12345 67890</li>
          </ul>
        </section>

        <p className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Online Pay. All rights reserved.
        </p>
      </div>
    </div>
  );
}
