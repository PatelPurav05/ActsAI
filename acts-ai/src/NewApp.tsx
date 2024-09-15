import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import actsLogo from "./acts.png";
import WellnessPage from "./wellness";
import EmergencyContact from "./contact";
import { useState } from "react";
import "./newindex.css";

export default function Component() {
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
                  <a href="#" className="hover:text-primary">
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
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">{renderPage()}</main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Acts.ai</p>
        </div>
      </footer>
    </div>
  );
}
