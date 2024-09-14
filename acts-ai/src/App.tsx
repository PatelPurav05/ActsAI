import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">Acts.ai</h1>
            </div>
  
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col justify-center">
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

