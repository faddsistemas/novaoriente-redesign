"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SplitReveal({ words, className }: { words: string; className?: string }) {
  const reduce = useReducedMotion();
  const parts = words.split(" ");
  return (
    <span className={className} aria-label={words}>
      {parts.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden mr-[0.28em]"
          initial={false}
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: reduce ? 0 : i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}