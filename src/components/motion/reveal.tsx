"use client";

import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // Same element on server and client so hydration matches; reduced motion just skips the animation.
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: reduce
            ? { duration: 0 }
            : {
                ...fadeUp.visible.transition,
                delay,
              },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
