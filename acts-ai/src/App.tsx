import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <nav className="bg-white border-b shadow-md w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8"> {/* Increased space-x value */}
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">Acts.ai</h1>
              </Link>
              <div className="hidden md:flex space-x-8"> {/* Increased space-x value */}
                <Link to="/" className="text-primary hover:text-primary-dark px-100 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/about" className="text-primary hover:text-primary-dark px-100 py-2 rounded-md text-sm font-medium">About</Link>
                <Link to="/resources" className="text-primary hover:text-primary-dark px-100 py-2 rounded-md text-sm font-medium">Resources</Link>
                <Authenticated>
                  <Link to="/profile" className="text-primary hover:text-primary-dark px-100 py-2 rounded-md text-sm font-medium">Profile</Link>
                </Authenticated>
              </div>
            </div>
            <div className="flex items-center">
              <Unauthenticated>
                <SignInButton mode="modal">
                  <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition">
                    Sign In
                  </button>
                </SignInButton>
              </Unauthenticated>
              <Authenticated>
                <UserButton afterSignOutUrl="/" />
              </Authenticated>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col items-center max-w-4xl">
        <Unauthenticated>
          <WelcomeContent />
        </Unauthenticated>
        <Authenticated>
          <Content />
        </Authenticated>
      </main>
    </div>
  );
}

function WelcomeContent() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
      <h2 className="text-4xl font-bold mb-6">Welcome to Acts.ai</h2>
      <p className="text-xl mb-8">Your journey to better mental health starts here.</p>
      <p className="mb-4">Sign in to access your personalized mental health resources.</p>
      <SignInButton>
        <button className="bg-primary text-white px-6 py-2 rounded-full text-lg hover:bg-primary-dark transition">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
      <Link to="/profile" className="inline-block">
        <h2 className="text-3xl font-bold mb-4 text-primary hover:underline">Your Profile</h2>
      </Link>
      <p className="text-xl mb-4">Welcome!</p>
      <div>Authenticated content: {messages?.length}</div>
    </div>
  );
}

export default App;
