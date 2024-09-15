import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Brain, Heart, Phone } from "lucide-react";
import actsLogo from "./acts.png";
import "./newindex.css";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
<div className=" bg-green-100 text-black shadow-lg mb-4">
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
            <Authenticated>
                <a
                href="/chats"
                className="text-gray-600 hover:text-green-700 transition-colors"
                >
                AI Therapist
                </a>
            </Authenticated>
            <a
              href="/wellness"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Wellness
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
              <Authenticated>
                <a
                    href="/chats"
                    className="text-gray-600 hover:text-green-700 transition-colors"
                >
                    AI Therapist
                </a>
              </Authenticated>
              <a
                href="/wellness"
                className="text-gray-600 hover:text-green-700 transition-colors"
              >
                Wellness
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
      </div>
  )}