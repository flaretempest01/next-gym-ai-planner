/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  Dumbbell,
  RefreshCcw,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Card } from "../components/ui/Card";
import { PlanDisplay } from "../components/plan/PlanDisplay";
import { useState } from "react";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Profile() {
  const { user, isLoading, plan, generatePlan } = useAuth();
  const [showRegenModal, setShowRegenModal] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return null;

  if (!user) return <Navigate to={"/auth/sign-in"} replace />;
  if (!plan) return <Navigate to={"/onboarding"} replace />;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen pt-24 pb-12 px-6 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono tracking-widest text-green-400 uppercase">
                Active Protocol
              </span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
              Your Training Plan
            </h1>
            <p className="text-gray-500 font-medium">
              v{plan.version} • Optimized on {formatDate(plan.createdAt)}
            </p>
          </div>

          <Button
            variant="secondary"
            className="gap-2 h-12 px-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            onClick={() => setShowRegenModal(true)}
          >
            <RefreshCcw className="w-4 h-4" />
            Regenerate Plan
          </Button>
        </motion.div>

        {/* --- QUICK STATS GRID --- */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <StatCard icon={<Target />} label="Goal" value={plan.overview.goal} />
          <StatCard
            icon={<Calendar />}
            label="Frequency"
            value={plan.overview.frequency}
          />
          <StatCard
            icon={<Dumbbell />}
            label="Split"
            value={plan.overview.split}
          />
          <StatCard icon={<TrendingUp />} label="Level" value="Advanced" />
        </motion.div>

        {/* --- PROGRAM NOTES --- */}
        <motion.div variants={itemVariants}>
          <Card
            variant="bordered"
            className="mb-12 bg-white/2 border-white/10 p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={100} />
            </div>
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-green-500 rounded-full" />
              Coach's Notes
            </h2>
            <p className="text-gray-400 leading-relaxed italic">
              "{plan.overview.notes}"
            </p>
          </Card>
        </motion.div>

        {/* --- WEEKLY SCHEDULE --- */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="font-black italic text-2xl mb-6 tracking-tight uppercase flex items-center gap-3">
            The Schedule
            <div className="h-px flex-1 bg-white/10" />
          </h2>
          <PlanDisplay weeklySchedule={plan.weeklySchedule} />
        </motion.div>

        {/* --- PROGRESSION STRATEGY --- */}
        <motion.div variants={itemVariants}>
          <Card
            variant="bordered"
            className="bg-linear-to-br from-green-500/10 to-transparent border-green-500/20 p-8 rounded-3xl"
          >
            <h2 className="font-bold text-xl mb-4 text-green-400">
              Progression Strategy
            </h2>
            <p className="text-gray-300 leading-relaxed font-medium">
              {plan.progression}
            </p>
          </Card>
        </motion.div>
      </div>
      <AnimatePresence>
        {showRegenModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRegenModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl"
            >
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-2">
                Recalibrate Protocol
              </h2>
              <p className="text-gray-500 mb-8">
                How do you want to handle this?
              </p>

              <div className="grid gap-4">
                <button
                  onClick={() => {
                    setShowRegenModal(false);
                    generatePlan();
                  }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 hover:bg-green-500 hover:text-black transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:bg-black/10">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Let AI Decide</p>
                    <p className="text-xs opacity-60 italic">
                      AI will optimize based on current data
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/manual-plan")}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Update Preferences</p>
                    <p className="text-xs text-gray-500 italic">
                      Manually tweak your goals & days
                    </p>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setShowRegenModal(false)}
                className="w-full mt-6 text-sm text-gray-600 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Helper Component for the Grid Cards
function StatCard({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <Card
      variant="bordered"
      className="bg-white/2 border-white/5 p-5 flex flex-col items-start gap-4 hover:border-white/20 transition-colors group h-full min-w-0"
    >
      <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-green-400 transition-colors">
        {icon}
      </div>

      <div className="space-y-1 min-w-0 w-full">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          {label}
        </p>
        <p className="text-sm font-bold text-white leading-tight wrap-break-word">
          {value}
        </p>
      </div>
    </Card>
  );
}
