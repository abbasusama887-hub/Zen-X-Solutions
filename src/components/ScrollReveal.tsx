/**
 * ScrollReveal.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared scroll-reveal primitives for the entire site.
 *
 * Uses motion/react (v12) — whileInView + variants API.
 * GPU-only: opacity + transform only. once:true — no re-animation on re-scroll.
 * Respects prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { motion } from 'motion/react';

/* ─── reduced-motion check ─────────────────────────────────────────────────── */
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── shared easing ────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ─── viewport trigger ─────────────────────────────────────────────────────── */
const VP = { once: true, margin: '-60px' };

/* ══════════════════════════════════════════════════════════════════════════════
   Reveal  — fade-up entrance for any element
   ══════════════════════════════════════════════════════════════════════════════ */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  distance = 24,
  className = '',
}) => {
  const hidden  = reduceMotion ? { opacity: 0 } : { opacity: 0, y: distance };
  const visible = {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={VP}
    >
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════════
   RevealFade  — opacity-only entrance (no Y movement)
   ══════════════════════════════════════════════════════════════════════════════ */
export const RevealFade: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, transition: { duration: 0.55, delay, ease: EASE } }}
    viewport={VP}
  >
    {children}
  </motion.div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   StaggerGrid + StaggerItem  — staggered entrance for card grids
   ══════════════════════════════════════════════════════════════════════════════ */
interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  className = '',
  stagger = 0.09,
  delayChildren = 0,
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={VP}
    variants={{
      hidden:  {},
      visible: { transition: { staggerChildren: stagger, delayChildren } },
    }}
  >
    {children}
  </motion.div>
);

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => {
  const hidden  = reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 };
  const visible = {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  };

  return (
    <motion.div className={className} variants={{ hidden, visible }}>
      {children}
    </motion.div>
  );
};
