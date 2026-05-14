import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background text-white"
    >
      <div className="relative">
        {/* Ricardo GIF */}
        <motion.img
          initial={{ scale: 0.8, rotate: -5 }}
          animate={{ scale: 1, rotate: 5 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGtwMzFwd3lsc3VuZGM5ZXBkNDU5ZG85NTJzMHZzbnRkeWZlMjJqcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/f3e3vLxB7TOuIxDVrX/giphy.gif"
          alt="Ricardo Milos"
          className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]"
        />

        {/* Glowing effect behind him */}
        <div className="absolute inset-0 bg-green-500/20 blur-[100px] -z-10 rounded-full" />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h2 className="text-2xl font-black italic tracking-tighter text-green-400 uppercase">
          Optimizing your gains...
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Ricardo is calculating your PRs. Please wait.
        </p>
      </motion.div>

      {/* Progress Bar (Fake but looks cool) */}
      <div className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-full h-full bg-linear-to-r from-transparent via-green-500 to-transparent"
        />
      </div>
    </motion.div>
  );
}
