import { api } from "../convex/_generated/api";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react"; // Optional if using both
import Chats from "./Chats";
import { useStoreUserEffect } from "./useStoreUserEffect"; // Your custom hook for Clerk state
import { Vortex } from "./vortex";

function App() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  if (isLoading) {
    return <div className="w-screen h-screen"><Vortex/></div>; // Optionally add a spinner or loading animation here
  }

  return (
    <Router>
      <Routes>
        {/* Main Route - Based on Authentication */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/chats" />
            ) : (
              <main className="container mx-auto flex-grow flex flex-col justify-center">
                <WelcomeContent />
              </main>
            )
          }
        />

        {/* Authenticated Route for Chat */}
        <Route
          path="/chats"
          element={
            isAuthenticated ? (
              <Authenticated>
                <Chats />
              </Authenticated>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

function WelcomeContent() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-6">Welcome to Acts.ai</h2>
      <p className="text-xl mb-8">Your journey to better mental health starts here.</p>
      <p className="mb-4">Sign in to access your personalized mental health resources.</p>
      <SignInButton>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-lg">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Your Dashboard</h2>
      <p className="text-xl mb-4">Welcome back!</p>
      <div>Authenticated content: {messages?.length}</div>
    </div>
  );
}

export default App;

