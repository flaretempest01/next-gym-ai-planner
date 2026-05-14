import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { authClient } from "./lib/auth";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NeonAuthUIProvider emailOTP authClient={authClient} defaultTheme="dark">
        <AuthProvider>
          <App />
        </AuthProvider>
      </NeonAuthUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
