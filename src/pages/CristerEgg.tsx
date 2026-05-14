import { motion } from "framer-motion";
import { Heart, Stars, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ourPhoto from "../assets/wifey-and-me.jpg";

const HEARTS_DATA = [...Array(20)].map((_, i) => ({
  id: i,
  size: Math.random() * 20 + 10,
  x: Math.random() * 400 - 200,
  duration: Math.random() * 5 + 5,
  delay: Math.random() * 5,
}));

export default function CristerEgg() {
  return (
    <div className="fixed inset-0 bg-[#050505] overflow-hidden flex flex-col items-center justify-center z-1000">
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {HEARTS_DATA.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: -100,
              x: heart.x,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
            className="absolute bottom-0 left-1/2 text-pink-500/20"
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative group">
          {/* Glowing Aura behind image */}
          <div className="absolute -inset-4 bg-linear-to-r from-pink-500 via-red-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse" />

          {/* SIDE STICKER LEFT (GIF) */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute md:-left-18 md:top-80 -left-15 top-55 -translate-y-1/2 md:w-40 md:h-40 z-20 w-30 h-30 cursor-grab active:cursor-grabbing"
          >
            <img
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3I2N2NveGxlYjdnYjd6NzN0ZXZtajBzeGYyOWNncHl3dXprYmZ3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kGPIWgHQdmuuIAsm0f/giphy.gif"
              className="w-full h-full object-contain rounded-full"
              alt="Sticker Left"
            />
          </motion.div>

          {/* CENTRAL IMAGE */}
          <div className="relative w-72 h-60 md:w-130 md:h-90 bg-[#111] rounded-4xl border-4 border-white/10 overflow-hidden shadow-2xl">
            <img
              src={ourPhoto}
              alt="Crister"
              className="w-full h-full object-cover"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* SIDE STICKER RIGHT (GIF/Sticker) */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            animate={{ y: [0, 15, 0], rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute -right-20 top-5 -translate-y-1/2 w-30 h-30 z-20 cursor-grab active:cursor-grabbing"
          >
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHFlb3hsYnk4cDRkbDgybWg5bHUyeDBpdHl0Nml3OGk3enBtcHY4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/BqjYZq0yMVRYvyCfgL/giphy.gif"
              className="w-full h-full object-contain"
              alt="Sticker Right"
            />
          </motion.div>
        </div>

        {/* --- TEXT CONTENT --- */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Stars className="text-yellow-400 w-5 h-5" />
            <span className="text-pink-400 font-mono tracking-widest uppercase text-xs">
              My Love, My Life
            </span>
            <Sparkles className="text-yellow-400 w-5 h-5" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter">
            My Wifey
          </h1>
          <p className="text-gray-400 mt-4 max-w-sm mx-auto italic font-medium leading-relaxed">
            "Some people don't just pass through your life. They become the
            whole point of it. The one you keep choosing. The one you keep
            showing up for."
          </p>
          <p className="mt-4 text-xs italic mx-auto font-mono leading-relaxed">
            I Love You Now, Always, and Forever.
          </p>
        </motion.div>

        {/* --- BACK BUTTON --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <Link
            to="/profile"
            className="px-6 py-2 rounded-full border border-white/10 text-gray-500 hover:text-white hover:border-white/30 transition-all text-sm font-mono"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
