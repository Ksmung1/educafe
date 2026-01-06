"use client";
import React from "react";
import { Cog, Hammer } from "lucide-react";

const Page = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Soft animated background accents */}
      <div className="absolute w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse -top-24 -left-24" />
      <div className="absolute w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse bottom-0 right-0" />

      {/* Main Card */}
      <div className="relative z-10 text-center px-10 py-14 rounded-2xl bg-white shadow-xl border border-gray-200">
        {/* Animated Icons */}
        <div className="flex justify-center mb-6 space-x-4">
          <Cog className="w-10 h-10 text-indigo-600 animate-spin-slow" />
          <Hammer className="w-10 h-10 text-purple-600 animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚧 Under Development
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          We’re currently building this section. Please check back soon —
          something great is coming.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-progress" />
        </div>

        <p className="mt-4 text-sm text-gray-500">Development in progress…</p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }

        .animate-progress {
          animation: progress 2.5s ease-in-out infinite alternate;
        }

        @keyframes progress {
          from {
            width: 30%;
          }
          to {
            width: 75%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
