import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { Slider } from "@/components/ui/slider";

// Remove the Slider import
// import { Slider } from "@/components/ui/slider";

// Add this custom Slider component
const Slider = ({
  id,
  min,
  max,
  step,
  value,
  onValueChange,
}: {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}) => (
  <input
    type="range"
    id={id}
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={(e) => onValueChange([parseInt(e.target.value)])}
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
  />
);

export default function MentalHealthQuestionnaire() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    mood: 5,
    sleep: 5,
    stress: 5,
    socialInteractions: 5,
    focus: 5,
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend

    const { mood, sleep, stress, socialInteractions, focus } = formData;

    // take the highest value from the form and use them to find the most suitable therapist
    const highestValue = Math.max(
      mood,
      sleep,
      stress,
      socialInteractions,
      focus
    );

    // whichever property has the highest value, store the index of that property
    const highestPropertyIndex = Object.keys(formData).findIndex(
      (key) => formData[key as keyof typeof formData] === highestValue
    );

    navigate("/rec", { state: { formData, highestPropertyIndex } });
  };

  const questions = [
    { name: "mood", label: "How would you rate your anger levels today?" },
    { name: "sleep", label: "How unmotivated do you feel?" },
    {
      name: "stress",
      label: "How would you rate your daily stress/anxiety level?",
    },
    {
      name: "socialInteractions",
      label: "How satisfied are you with your social interactions?",
    },
    {
      name: "focus",
      label: "How would you rate your ability to focus on tasks?",
    },
  ];

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
            Mental Health Questionnaire
          </h1>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Please answer the following questions to help us understand your
            current mental state. Rate each aspect on a scale from 1 to 10.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {questions.map((question) => (
              <div key={question.name} className="space-y-2">
                <label
                  htmlFor={question.name}
                  className="block text-lg font-medium text-gray-700"
                >
                  {question.label}
                </label>
                <Slider
                  id={question.name}
                  min={1}
                  max={10}
                  step={1}
                  value={[formData[question.name as keyof typeof formData]]}
                  onValueChange={(value) =>
                    handleSliderChange(question.name, value)
                  }
                  className="w-full"
                />
                <div className="text-right text-sm text-gray-500">
                  {formData[question.name as keyof typeof formData]}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
