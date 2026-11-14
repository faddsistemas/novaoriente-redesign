"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type BlurTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

const motionMap = {
  h1: motion.h1,
  h2: motion.h2,
  p: motion.p,
  span: motion.span,
};

export function BlurText({ text, className, as = "h1" }: BlurTextProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionMap[as];
  return (
    <MotionTag
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, filter: "blur(12px)", y: 16 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </MotionTag>
  );
}