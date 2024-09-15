import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./NewApp";
import Profile from "./profile"; // Import the Profile component
// import "./index.css";
import "./newindex.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
// deleted ConvexProvider right below
import { ConvexReactClient } from "convex/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import WellnessPage from "./wellness";
import ContactPage from "./contact";

import Chats from "./Chats";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey="pk_test_c3VtbWFyeS1nb3BoZXItMTUuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/wellness" element={<WellnessPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/chats" element={<Chats />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);
