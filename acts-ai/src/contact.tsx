import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone, Mail, Heart } from "lucide-react";
import actsLogo from "./acts.png";
import "./newindex.css";

export default function EmergencyContact() {
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
            <a
              href="/"
              className="text-gray-600 hover:text-green-700 transition-colors"
            >
              Home
            </a>
            <a
              href="/"
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
                href="/"
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
            Emergency Contact
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            If you're having thoughts of self-harm, please reach out for help
            immediately. You're not alone. Professional help is available 24/7.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Emergency Contacts
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                National Suicide Prevention Lifeline:{" "}
                <a
                  href="tel:1-800-273-8255"
                  className="text-green-600 hover:underline"
                >
                  1-800-273-8255
                </a>
              </li>
              <li>
                Crisis Text Line: Text HOME to{" "}
                <span className="font-semibold">741741</span>
              </li>
              <li>
                Emergency Services:{" "}
                <a href="tel:911" className="text-green-600 hover:underline">
                  911
                </a>
              </li>
            </ul>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Online Resources
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                Email Support:{" "}
                <a
                  href="mailto:support@acts.ai"
                  className="text-green-600 hover:underline"
                >
                  support@acts.ai
                </a>
              </li>
              <li>
                Online Chat:{" "}
                <a href="#" className="text-green-600 hover:underline">
                  www.acts.ai/chat
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-white rounded-lg shadow-lg p-6"
        >
          <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Seeking Professional Help
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              We strongly encourage you to seek professional help if you're
              experiencing mental health challenges
            </li>
            <li>
              A mental health professional can provide personalized support and
              treatment options
            </li>
            <li>
              Remember, reaching out for help is a sign of strength, not
              weakness. Your well-being is important, and there are people ready
              to support you through difficult times.
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
