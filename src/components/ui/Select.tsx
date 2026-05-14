import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  error?: string;
  id?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({
  label,
  error,
  options,
  value,
  onChange,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div
      className={`flex flex-col gap-1.5 w-full relative ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-sm font-medium text-gray-400 ml-1 uppercase tracking-wider text-[10px]">
          {label}
        </label>
      )}

      {/* The "Box" */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between px-4 py-2.5 
          bg-white/5 border rounded-xl cursor-pointer transition-all
          ${isOpen ? "border-green-500 ring-1 ring-green-500/20" : "border-white/10"}
          ${error ? "border-red-500" : "hover:border-white/20"}
        `}
      >
        <span className="text-foreground text-sm font-medium">
          {selectedOption ? selectedOption.label : "Select option..."}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-green-500" : ""}`}
        />
      </div>

      {/* The Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-100 overflow-hidden"
          >
            <div className="max-height-[250px] overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    px-4 py-3 text-sm cursor-pointer transition-colors
                    ${
                      value === option.value
                        ? "bg-green-500 text-black font-bold" // THE HIGHLIGHT COLOR
                        : "text-gray-300 hover:bg-green-500/10 hover:text-white"
                    }
                  `}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
}
