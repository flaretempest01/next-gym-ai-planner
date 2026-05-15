/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Textarea } from "../components/ui/TextArea";
import type { UserProfile } from "../types";

const STEPS = [
  {
    id: "goal",
    question: "What's your primary goal?",
    sub: "This defines the logic of your entire program.",
    options: [
      { label: "Build Muscle (Bulk)", value: "bulk", icon: "💪" },
      { label: "Lose Fat (Cut)", value: "cut", icon: "🔪" },
      { label: "Body Recomp", value: "recomp", icon: "⚖️" },
      { label: "Build Strength", value: "strength", icon: "⛓️" },
    ],
  },
  {
    id: "experience",
    question: "Training experience?",
    sub: "Be honest. Ego lifting starts with lying about this.",
    options: [
      { label: "Beginner (0-1 yrs)", value: "beginner", icon: "👶" },
      { label: "Intermediate (1-3 yrs)", value: "intermediate", icon: "🏋️" },
      { label: "Advanced (3+ yrs)", value: "advanced", icon: "🦍" },
    ],
  },
  {
    id: "daysPerWeek",
    question: "How many days per week?",
    sub: "Pick a schedule you can actually stick to.",
    options: [
      { label: "2 Days", value: "2", icon: "🥉" },
      { label: "3 Days", value: "3", icon: "🥈" },
      { label: "4 Days", value: "4", icon: "🥇" },
      { label: "5-6 Days", value: "5", icon: "🔥" },
    ],
  },
  {
    id: "sessionLength",
    question: "Ideal session length?",
    sub: "How much time do you have in the trenches?",
    options: [
      { label: "30 Minutes", value: "30", icon: "⚡" },
      { label: "45 Minutes", value: "45", icon: "🕒" },
      { label: "60 Minutes", value: "60", icon: "⏰" },
      { label: "90 Minutes", value: "90", icon: "🔋" },
    ],
  },
  {
    id: "equipment",
    question: "What's the gear situation?",
    sub: "We'll tailor exercises to what you have.",
    options: [
      { label: "Full Gym Access", value: "full_gym", icon: "🏢" },
      { label: "Home Workout", value: "home", icon: "🏠" },
      { label: "Dumbbells Only", value: "dumbbells", icon: "⚗️" },
    ],
  },
  {
    id: "preferredSplit",
    question: "Preferred training split?",
    sub: "Choose one or let the AI optimize for you.",
    options: [
      { label: "Full Body", value: "full_body", icon: "🧍" },
      { label: "Upper / Lower", value: "upper_lower", icon: "🌓" },
      { label: "Push / Pull / Legs", value: "ppl", icon: "🔱" },
      { label: "Let AI Decide", value: "custom", icon: "🤖" },
    ],
  },
  {
    id: "injuries",
    question: "Any injuries or limitations?",
    sub: "Knees weak? Arms heavy? Let us know.",
    isText: true,
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { saveProfile, generatePlan } = useAuth();
  const navigate = useNavigate();

  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev: any) => ({ ...prev, [step.id]: value }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFinish = async (e?: React.SyntheticEvent) => {
    // Prevent default behavior safely
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    setIsSubmitting(true);

    try {
      alert("Checkpoint 1: Starting SaveProfile");

      const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
        goal: answers.goal,
        experience: answers.experience,
        daysPerWeek: parseInt(answers.daysPerWeek),
        sessionLength: parseInt(answers.sessionLength),
        equipment: answers.equipment,
        injuries: answers.injuries || undefined,
        preferredSplit: answers.preferredSplit,
      };

      await saveProfile(profile);
      alert("Checkpoint 2: Profile Saved Successfully");

      alert("Checkpoint 3: Starting AI Generation (This may take 30s)");
      await generatePlan();

      alert("Checkpoint 4: Plan Generated! Navigating...");
      navigate("/profile");
    } catch (err: any) {
      alert("CRASH ERROR: " + err.message);
      console.error("Onboarding failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background text-white flex flex-col overflow-hidden z-50">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
        <motion.div
          className="h-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Navigation */}
      <div className="absolute top-10 left-10 right-10 flex justify-between items-center">
        <button
          onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
          className={`text-gray-500 hover:text-white transition-colors flex items-center gap-2 ${currentStep === 0 ? "opacity-0 pointer-events-none" : ""}`}
        >
          <ArrowLeft size={20} /> Back
        </button>
        <span className="font-mono text-xs text-gray-600 tracking-[0.2em] uppercase">
          AbortsAI // Protocol_{currentStep + 1}
        </span>
      </div>

      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="max-w-xl w-full"
          >
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black italic mb-3 tracking-tighter uppercase leading-none">
                {step.question}
              </h1>
              <p className="text-gray-500 text-lg">{step.sub}</p>
            </div>

            {step.isText ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <Textarea
                  value={answers.injuries}
                  onChange={(e) =>
                    setAnswers({ ...answers, injuries: e.target.value })
                  }
                  placeholder="Type here..."
                  className="bg-white/5 border-white/10 focus:border-green-500 min-h-37.5 text-lg p-6 rounded-3xl"
                />
                <Button
                  onPointerDown={() => {
                    alert("Touch detected! Starting AI logic...");
                    handleFinish();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleFinish();
                  }}
                  disabled={isSubmitting}
                  className="z-9999 w-full h-16 text-xl rounded-3xl bg-green-500 hover:bg-green-600 group"
                >
                  {isSubmitting
                    ? "Initiating AI Protocol..."
                    : "Generate My Plan"}
                  {!isSubmitting && (
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-3">
                {step.options?.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.value)}
                    className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all text-left
                      ${
                        answers[step.id] === opt.value
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/5 bg-white/5 hover:border-white/20"
                      }`}
                  >
                    <span className="text-3xl bg-white/5 w-14 h-14 flex items-center justify-center rounded-xl">
                      {opt.icon}
                    </span>
                    <span className="text-xl font-bold">{opt.label}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
