import { Link } from "react-router-dom";
import "./newindex.css";
import { motion } from "framer-motion";
import { ChevronDown, Brain } from "lucide-react";
import actsLogo from "./acts.png";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useState } from "react";

export default function Submit() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-green-100 text-black flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={actsLogo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-green-700">Acts.ai</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Unauthenticated>
              <SignInButton mode="modal">
                <button className="bg-primary text-black px-2 py-2 rounded-md text-base font-medium hover:bg-primary-dark transition">
                  Sign In
                </button>
              </SignInButton>
            </Unauthenticated>
            <Authenticated>
              <SignOutButton redirectUrl="https://mhanational.org/" />
            </Authenticated>

            <a
              href="/"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Home
            </a>
            <a
              href="/Chats"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              AI Therapist
            </a>
            <a
              href="/wellness"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Wellness
            </a>
            <a
              href="/form"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Mental Health Form
            </a>
            <a
              href="/contact"
              className="text-red-500 hover:text-red-600 transition-colors font-semibold"
            >
              Emergency Contact
            </a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ChevronDown
              className={`h-6 w-6 text-gray-600 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white py-4"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a
                href="/"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Home
              </a>
              <a
                href="/Chats"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                AI Therapist
              </a>
              <a
                href="/wellness"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Wellness
              </a>
              <a
                href="/form"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Mental Health Form
              </a>
              <a
                href="/contact"
                className="text-red-500 hover:text-red-600 transition-colors font-semibold"
              >
                Emergency Contact
              </a>
            </div>
          </motion.nav>
        )}
      </header>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">Acts.ai</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Congratulations on submitting the form!
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Thank you for your submission.
        </p>
        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Return to Home
        </Link>
      </main>
    </div>
  );
}
