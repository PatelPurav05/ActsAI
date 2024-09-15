import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Brain, Heart, Phone } from "lucide-react";
import actsLogo from "./acts.png";
import "./newindex.css";
import Chats from "./Chats";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-100 text-black">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={actsLogo} alt="Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-green-700">Acts.ai</span>
  const [currentPage, setCurrentPage] = useState("home");
 

  const renderPage = () => {
    
    switch (currentPage) {
      case "home":
        return (
          <section className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Welcome to Acts.ai</h2>
            <p className="text-xl mb-8">
              Your journey to better mental health starts here. We provide
              support, resources, and tools to help you improve your well-being
              and lead a happier life.
            </p>
          </section>
        );
      case "wellness":
        return <WellnessPage />;
      case "contact":
        return <EmergencyContact />;
      case "AI Therapist":
        return <Chats />
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={actsLogo} alt="Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold">Acts.ai</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Unauthenticated>
                <SignInButton mode="modal">
                  <button className="bg-primary text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">
                    Sign In
                  </button>
                </SignInButton>
              </Unauthenticated>
              <Authenticated>
                <SignOutButton redirectUrl="https://mhanational.org/" />
              </Authenticated>
              <ul className="flex items-center space-x-6">
                <li>
                  <a
                    href="#"
                    onClick={() => setCurrentPage("home")}
                    className="hover:text-primary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setCurrentPage("AI Therapist")} className="hover:text-primary">
                    AI Therapist
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setCurrentPage("wellness")}
                    className="hover:text-primary"
                  >
                    Wellness
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => setCurrentPage("contact")}
                    className="hover:text-primary text-red-500 font-semibold"
                  >
                    Emergency Contact
                  </a>
                </li>
              </ul>
            </div>
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
            Welcome to Acts.ai
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Your journey to better mental health starts here. We provide
            support, resources, and tools to help you improve your well-being
            and lead a happier life.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <Brain className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              AI Therapist
            </h2>
            <p className="text-gray-600">
              Get personalized support from our advanced AI therapist, available
              24/7.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Wellness Resources
            </h2>
            <p className="text-gray-600">
              Access a wealth of resources to support your mental health
              journey.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-lg p-6 text-center"
          >
            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              24/7 Support
            </h2>
            <p className="text-gray-600">
              Get help anytime with our round-the-clock emergency support line.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
