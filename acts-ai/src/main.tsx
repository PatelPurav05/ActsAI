import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./NewApp";
// import "./index.css";
import "./newindex.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
// deleted ConvexProvider right below
import { ConvexReactClient } from "convex/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import WellnessPage from "./wellness";
import ContactPage from "./contact";
import Submit from "./submit";

import Chats from "./Chats";
import MentalHealthForm from "./form";
import RecommendedTherapists from "./rec";

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
              <Route path="/Chats" element={<Chats />} />
              <Route path="/form" element={<MentalHealthForm />} />
              <Route path="/rec" element={<RecommendedTherapists />} />
              <Route path="/submit" element={<Submit />} />
            </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>
);
