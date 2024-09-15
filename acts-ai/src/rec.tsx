import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Brain, User } from "lucide-react";
import therapistsData from "../therapists.json";
// import highestPropertyIndex from "./form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Therapist {
  name: string;
  description: string;
}

export default function TherapistProfiles() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [therapists, setTherapists] = useState<Therapist[]>([
    { name: "", description: "" },
    { name: "", description: "" },
  ]);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { formData, highestPropertyIndex } = location.state;
      // figure out keywordIndex
      const keywordIndex = highestPropertyIndex;
      const therapistData = therapistsData.therapists[keywordIndex];

      setTherapists([
        { name: therapistData.keyword, description: therapistData.therapist1 },
        { name: therapistData.keyword, description: therapistData.therapist2 },
      ]);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted therapists:", therapists);
    navigate("/submit");
  };

  return (
    <div className="min-h-screen bg-green-100 text-black">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-green-600" />
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
            Therapist Profiles
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Please enter the information for two therapists below.
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {therapists.map((therapist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <User className="h-12 w-12 text-green-600 mr-4" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {therapist.name}
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700">{therapist.description}</p>
              </div>
            </motion.div>
          ))}
          <div className="md:col-span-2 mt-8">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition-colors"
            >
              Submit Profiles
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
