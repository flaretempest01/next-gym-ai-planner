import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/Card";
import { Select } from "../components/ui/Select";
import React, { useState } from "react";
import { Textarea } from "../components/ui/TextArea";
import { Button } from "../components/ui/Button";
import { ArrowRight, Sparkles, ArrowLeft } from "lucide-react";
import type { UserProfile } from "../types";
import { useNavigate, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, duration: 0.5, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const goalOptions = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Build Strength" },
  { value: "endurance", label: "Improve Endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3+ years)" },
];

const daysOptions = [
  { value: "2", label: "2 days per week" },
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
  { value: "6", label: "6 days per week" },
];

const sessionOptions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  { value: "full_gym", label: "Full Gym Access" },
  { value: "home", label: "Home Workout" },
  { value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_lower", label: "Upper/Lower Split" },
  { value: "ppl", label: "Push/Pull/Legs" },
  { value: "custom", label: "Let AI Decide" },
];

export default function ManualPlan() {
  const { user, saveProfile, generatePlan } = useAuth();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });

  const navigate = useNavigate();

  function updateForm(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleQuestionare(e: React.FormEvent) {
    e.preventDefault();

    const profile: Omit<UserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as UserProfile["goal"],
      experience: formData.experience as UserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as UserProfile["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit: formData.preferredSplit as UserProfile["preferredSplit"],
    };

    try {
      await saveProfile(profile);
      // generatePlan() in AuthContext already sets global isLoading=true
      // which triggers the Ricardo LoadingScreen automatically!
      await generatePlan();
      navigate("/profile");
    } catch (err) {
      console.error("Failed to save profile", err);
    }
  }

  if (!user) {
    return <RedirectToSignIn />;
  }

  return (
    <SignedIn>
      <div className="min-h-screen pt-32 pb-12 px-6 bg-background">
        <motion.div
          className="max-w-xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back to Profile Link */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-sm font-medium">Back to Profile</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono tracking-widest text-green-400 uppercase">
                Manual Override
              </span>
            </div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white leading-none">
              Tweak Your Protocol
            </h1>
            <p className="text-gray-500 mt-2">
              Adjust your parameters. The AI will rebuild the schedule based on
              these settings.
            </p>
          </motion.div>

          <Card
            variant="bordered"
            className="bg-white/2 border-white/10 p-8 rounded-3xl"
          >
            <form onSubmit={handleQuestionare} className="space-y-6">
              <motion.div variants={itemVariants}>
                <Select
                  id="goal"
                  label="Primary Goal"
                  options={goalOptions}
                  value={formData.goal}
                  onChange={(value) => updateForm("goal", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Select
                  id="experience"
                  label="Experience Level"
                  options={experienceOptions}
                  value={formData.experience}
                  onChange={(value) => updateForm("experience", value)}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                <Select
                  id="days"
                  label="Days/Week"
                  options={daysOptions}
                  value={formData.daysPerWeek}
                  onChange={(value) => updateForm("daysPerWeek", value)}
                />
                <Select
                  id="length"
                  label="Session Time"
                  options={sessionOptions}
                  value={formData.sessionLength}
                  onChange={(value) => updateForm("sessionLength", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Select
                  id="equipment"
                  label="Equipment"
                  options={equipmentOptions}
                  value={formData.equipment}
                  onChange={(value) => updateForm("equipment", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Select
                  id="preferredSplit"
                  label="Preferred Split"
                  options={splitOptions}
                  value={formData.preferredSplit}
                  onChange={(value) => updateForm("preferredSplit", value)}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Textarea
                  id="injuries"
                  label="Injuries or Limitations"
                  placeholder="Optional: Tell the AI about any pain points..."
                  rows={3}
                  value={formData.injuries}
                  onChange={(e) => updateForm("injuries", e.target.value)}
                  className="bg-white/5 border-white/5 focus:border-green-500 rounded-xl transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-14 gap-2 text-lg rounded-2xl bg-green-500 hover:bg-green-600 text-black font-bold group"
                >
                  Save & Regenerate
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </form>
          </Card>
        </motion.div>
      </div>
    </SignedIn>
  );
}
