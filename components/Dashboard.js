"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilePicture: "",
    coverPicture: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-white text-4xl font-bold text-center mb-6">
          Welcome to your Dashboard
        </h1>

        <div className="space-y-3">
          <div>
            <label className="text-white text-sm block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Profile Picture
            </label>
            <input
              type="text"
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Cover Picture
            </label>
            <input
              type="text"
              name="coverPicture"
              value={form.coverPicture}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Razorpay Client ID
            </label>
            <input
              type="text"
              name="razorpayId"
              value={form.razorpayId}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white text-sm block mb-1">
              Razorpay Secret
            </label>
            <input
              type="password"
              name="razorpaySecret"
              value={form.razorpaySecret}
              onChange={handleChange}
              className="w-full bg-slate-700 rounded-lg p-2 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-3 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;