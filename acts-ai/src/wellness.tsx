import actsLogo from "./acts.png";
import "./newindex.css";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Heart, Leaf, Sun } from "lucide-react";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Authenticated } from "convex/react";

export default function WellnessPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-100 text-black">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={actsLogo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-green-700">Acts.ai</span>
          </div>
          <nav className="hidden md:flex space-x-8">
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
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-green-700 mb-6">
            Wellness Advice
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Discover practical tips and strategies to enhance your overall
            well-being and lead a healthier, happier life.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Showing Gratitude
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc pl-6">
              <li>
                Start each day by thinking of three things you're grateful for
              </li>
              <li>Keep a gratitude journal and write in it regularly</li>
              <li>Express appreciation to others for their kindness or help</li>
              <li>Practice mindful gratitude by savoring positive moments</li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Taking Care of Your Health
            </h2>
            <ul className="space-y-2 text-gray-600 list-disc pl-6">
              <li>Get regular exercise - aim for at least 30 minutes a day</li>
              <li>
                Maintain a balanced diet rich in fruits, vegetables, and whole
                grains
              </li>
              <li>Ensure you get 7-9 hours of quality sleep each night</li>
              <li>
                Stay hydrated by drinking plenty of water throughout the day
              </li>
              <li>
                Practice stress-reduction techniques like meditation or deep
                breathing
              </li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-green-200 rounded-lg shadow-lg p-6 text-center"
        >
          <Sun className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <p className="text-xl text-green-800 italic">
            "The greatest wealth is health." - Virgil
          </p>
        </motion.div>
      </main>
    </div>
  );
}
