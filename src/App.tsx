import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import LoadingScreen from "./components/ui/LoadingScreen";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import ManualPlan from "./pages/ManualPlan";
import Profile from "./pages/Profile";
import CristerEgg from "./pages/CristerEgg";

function App() {
  const location = useLocation();
  const { refreshData, isLoading } = useAuth();

  useEffect(() => {
    refreshData();
  }, [location.pathname, refreshData]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/account/:pathname" element={<Account />} />
            <Route path="/auth/:pathname" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manual-plan" element={<ManualPlan />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/crister-egg" element={<CristerEgg />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
