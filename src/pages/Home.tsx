/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  Zap,
  Brain,
  Dumbbell,
  Trophy,
  DumbbellIcon,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { useState } from "react";

export default function Home() {
  const [eggTrigger, setEggTrigger] = useState<number>(30);
  const { user, isLoading } = useAuth();

  if (!isLoading && user) {
    return <Navigate to="/profile" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (eggTrigger >= 60) {
    return <Navigate to={"crister-egg"} replace />;
  }

  return (
    <div className="bg-background text-white min-h-screen overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-green-500/10 text-green-400 border border-green-500/20 rounded-full"
          >
            Powered by OpenRouter AI
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent italic tracking-tighter"
          >
            QUIT TITO BUILD. <br />
            GET RIPPED.
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            'Bawi nalang ako next year'. 'I got no time bro'. Stop that bullshit
            and get your ass working, lazy huge butter ball.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/auth/sign-up">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full group"
              >
                Get Shredded Now!
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Meme Card 1 */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-130 left-40 w-64 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm -rotate-12"
        >
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZueGZueGZueGZueGZueGZueGZueGZueGZueGZueGZueGZueCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKVUn7iM8FMEU24/giphy.gif"
            alt="Meme"
            className="rounded-lg mb-2"
          />
          <p className="text-xs text-gray-400 italic">
            "Me trying to follow a healthy diet and binge drinking gin bulag at
            9PM"
          </p>
        </motion.div>
      </section>

      {/* --- MEME / COMPARISON SECTION --- */}
      <section className="py-20 px-6 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              whileInView={{ x: [-50, 0], opacity: [0, 1] }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Why AbortsAI?</h2>
              <div className="flex gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl h-fit">
                  <Brain className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Intelligence over Ego</h3>
                  <p className="text-gray-400">
                    Our AI analyzes your bio-data to ensure you aren't
                    overtraining like a clown.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl h-fit">
                  <Zap className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Zero Friction</h3>
                  <p className="text-gray-400">
                    Answer 5 questions. Get a full 12-week block in seconds.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileInView={{ y: [40, 0], opacity: [0, 1] }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              className="relative w-full max-w-125 mx-auto group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-green-500 to-blue-500 rounded-4xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />

              <div className="relative p-3 bg-[#111] rounded-4xl border border-white/10">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ZoeG5yZGFiOXdibHd4dHFxam1rY21wN3FpNWR0M2t4b2NuZTVoaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XDpjeIC1f7wTcQj39H/giphy.gif"
                    alt="Gym Meme"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-10 -right-8 bg-green-400 p-6 border border-green-500/50 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20"
                >
                  <p className="font-black italic text-black text-xl tracking-tighter uppercase whitespace-nowrap">
                    AI Logic: +9000 Aura
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-20 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<Dumbbell className="w-8 h-8 text-green-400" />}
            title="Custom Splits"
            desc="PPL, Upper/Lower, or Full Body. The AI decides based on your schedule."
          />
          <FeatureCard
            icon={<Trophy className="w-8 h-8 text-yellow-400" />}
            title="Progression Logic"
            desc="Automatically calculates load increases so you never plateau."
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-blue-400" />}
            title="Smart Swaps"
            desc="Don't have a specific machine? AI suggests the perfect alternative."
          />
        </motion.div>
      </section>

      {/* --- CTA FOOTER --- */}
      <footer className="py-20 text-center border-t border-white/5">
        <h2 className="text-3xl font-bold mb-8">Ready to evolve?</h2>
        <Link to="/auth/sign-up">
          <Button variant="secondary" size="lg" className="rounded-full">
            Create My Free Account
          </Button>
        </Link>
        <p className="mt-8 text-gray-600 text-sm">
          {`© ${new Date().getFullYear()} AbortsAI x CodebyKaz. No more excuses.`}
        </p>
        <button
          className="p-4 mt-4"
          onClick={() => setEggTrigger((prev) => prev + 10)}
        >
          <motion.div
            animate={{ width: eggTrigger, height: eggTrigger }}
            whileTap={{ scale: 1.5 }}
            className="text-accent origin-center"
          >
            <DumbbellIcon className="w-full h-full" />
          </motion.div>
        </button>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="p-8 bg-white/3 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
