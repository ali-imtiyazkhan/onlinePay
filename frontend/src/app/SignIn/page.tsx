
"use client";

import { useState } from "react";

export default function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Username:", username, "Password:", password);

        try {
            const res = await fetch("http://localhost:3001/api/v1/user/signin", {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "login failed");
                return;
            }

            localStorage.setItem("token", data.token);
            alert("login successful");

            window.location.href = "/";
        } catch (err) {
            console.log("Error ", err);
            alert("somthing wrong happend  ");
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
                    Welcome back! Please enter your details.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="yourname@example.com"
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>


                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                            <span className="text-gray-600 dark:text-gray-300">Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
                    >
                        Sign In
                    </button>
                </form>


                <p className="mt-6 text-center text-gray-600 dark:text-gray-400 text-sm">
                    Don’t have an account?{" "}
                    <a href="/SignUp" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
