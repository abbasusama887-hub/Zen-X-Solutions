import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Zap,
  Cloud,
  Brain,
  Users,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Database,
  Cpu,
  Globe,
  GitBranch,
  Server,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface PlatformFeature {
  id: number;
  category: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  visual: React.FC;
  metric: string;
  metricLabel: string;
}

/* ── Inline SVG mini-dashboards for each card ── */

const AnalyticsVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col gap-2 p-1">
    {/* Mini chart header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#ece1df]/80 animate-pulse" />
        <span className="text-[9px] font-mono font-bold text-[#ece1df]/60 uppercase tracking-widest">Live Feed</span>
      </div>
      <span className="text-[9px] font-mono text-[#ece1df]/40">SAS-CORE v4.2</span>
    </div>
    {/* Area chart bars */}
    <div className="flex items-end gap-1 h-16 mt-1">
      {[38, 55, 42, 72, 61, 88, 75, 95, 82, 100, 88, 76].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition-all duration-700"
          style={{
            height: `${h}%`,
            background: i === 9
              ? 'linear-gradient(to top, #be1920, #ff4444)'
              : i >= 7
              ? 'rgba(190,25,32,0.55)'
              : 'rgba(236,225,223,0.15)',
          }}
        />
      ))}
    </div>
    {/* KPI row */}
    <div className="grid grid-cols-3 gap-1 mt-1">
      {[
        { v: '↑12.4%', l: 'Revenue' },
        { v: '98.7%', l: 'Uptime' },
        { v: '3.2ms', l: 'Latency' },
      ].map((k) => (
        <div key={k.l} className="bg-[#ece1df]/08 rounded p-1 text-center" style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}>
          <div className="text-[10px] font-black text-[#ece1df]">{k.v}</div>
          <div className="text-[8px] text-[#ece1df]/45 mt-0.5">{k.l}</div>
        </div>
      ))}
    </div>
  </div>
);

const AutomationVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-center items-center gap-2 p-1">
    <div className="flex items-center gap-0">
      {[
        { label: 'Trigger', color: 'bg-[#be1920]' },
        { label: 'Process', color: 'bg-[#ece1df]/25' },
        { label: 'Validate', color: 'bg-[#ece1df]/25' },
        { label: 'Deploy', color: 'bg-[#be1920]/70' },
      ].map((node, i) => (
        <React.Fragment key={node.label}>
          <div className={`flex flex-col items-center gap-1`}>
            <div className={`w-9 h-9 rounded-lg ${node.color} border border-[#ece1df]/20 flex items-center justify-center`}>
              <GitBranch className="w-3.5 h-3.5 text-[#ece1df]" />
            </div>
            <span className="text-[7px] font-bold text-[#ece1df]/50 uppercase tracking-wide">{node.label}</span>
          </div>
          {i < 3 && (
            <div className="flex items-center gap-0 mb-4">
              <div className="w-3 h-[2px] bg-[#ece1df]/20" />
              <div className="w-0 h-0 border-t-[3px] border-b-[3px] border-l-[4px] border-t-transparent border-b-transparent border-l-[#ece1df]/30" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
    {/* Stats below */}
    <div className="flex items-center gap-3 mt-1">
      <div className="text-center">
        <div className="text-[11px] font-black text-[#ece1df]">847</div>
        <div className="text-[7px] text-[#ece1df]/40">Tasks/min</div>
      </div>
      <div className="w-px h-6 bg-[#ece1df]/15" />
      <div className="text-center">
        <div className="text-[11px] font-black text-[#ece1df]">↓64%</div>
        <div className="text-[7px] text-[#ece1df]/40">Manual ops</div>
      </div>
      <div className="w-px h-6 bg-[#ece1df]/15" />
      <div className="text-center">
        <div className="text-[11px] font-black text-[#ece1df]">99.9%</div>
        <div className="text-[7px] text-[#ece1df]/40">Accuracy</div>
      </div>
    </div>
  </div>
);

const CloudVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-between p-1">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-mono text-[#ece1df]/50 uppercase tracking-widest">Infrastructure</span>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[#be1920] animate-pulse" />
        <span className="text-[9px] font-mono text-[#ece1df]/40">All systems nominal</span>
      </div>
    </div>
    {/* Server nodes grid */}
    <div className="grid grid-cols-4 gap-1.5 mt-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-md border flex items-center justify-center"
          style={{
            backgroundColor: i < 6 ? 'rgba(190,25,32,0.18)' : 'rgba(236,225,223,0.05)',
            borderColor: i < 6 ? 'rgba(190,25,32,0.35)' : 'rgba(236,225,223,0.1)',
          }}
        >
          <Server className={`w-3 h-3 ${i < 6 ? 'text-[#be1920]' : 'text-[#ece1df]/25'}`} />
        </div>
      ))}
    </div>
    {/* Resource bars */}
    <div className="space-y-1 mt-2">
      {[
        { l: 'CPU', v: 34 },
        { l: 'MEM', v: 58 },
        { l: 'NET', v: 72 },
      ].map((r) => (
        <div key={r.l} className="flex items-center gap-1.5">
          <span className="text-[8px] font-mono text-[#ece1df]/40 w-6">{r.l}</span>
          <div className="flex-1 h-1 rounded-full bg-[#ece1df]/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${r.v}%`, background: 'linear-gradient(to right, #be1920, rgba(190,25,32,0.5))' }}
            />
          </div>
          <span className="text-[8px] font-mono text-[#ece1df]/40">{r.v}%</span>
        </div>
      ))}
    </div>
  </div>
);

const BIVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col gap-1.5 p-1">
    <div className="flex items-center justify-between mb-0.5">
      <span className="text-[9px] font-mono text-[#ece1df]/50 uppercase tracking-widest">BI Dashboard</span>
      <span className="text-[8px] font-mono text-[#ece1df]/30">Q4 2024</span>
    </div>
    {/* Donut ring placeholder (SVG circle) */}
    <div className="flex items-center gap-3">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(236,225,223,0.08)" strokeWidth="7" />
        <circle cx="26" cy="26" r="20" fill="none" stroke="#be1920" strokeWidth="7"
          strokeDasharray="125.66" strokeDashoffset="31.4" strokeLinecap="round"
          transform="rotate(-90 26 26)" />
        <text x="26" y="30" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ece1df">75%</text>
      </svg>
      <div className="flex flex-col gap-1">
        {[
          { c: '#be1920', l: 'Revenue', v: '75%' },
          { c: 'rgba(190,25,32,0.5)', l: 'Pipeline', v: '18%' },
          { c: 'rgba(236,225,223,0.2)', l: 'Other', v: '7%' },
        ].map((item) => (
          <div key={item.l} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.c }} />
            <span className="text-[8px] text-[#ece1df]/50">{item.l}</span>
            <span className="text-[8px] font-bold text-[#ece1df]/70 ml-auto">{item.v}</span>
          </div>
        ))}
      </div>
    </div>
    {/* KPI cards */}
    <div className="grid grid-cols-2 gap-1 mt-0.5">
      {[
        { v: '$2.4M', l: 'ARR' },
        { v: '+34%', l: 'YoY Growth' },
      ].map((k) => (
        <div key={k.l} className="rounded-md p-1.5" style={{ backgroundColor: 'rgba(190,25,32,0.15)', borderWidth: 1, borderColor: 'rgba(190,25,32,0.25)', borderStyle: 'solid' }}>
          <div className="text-[11px] font-black text-[#ece1df]">{k.v}</div>
          <div className="text-[7px] text-[#ece1df]/45">{k.l}</div>
        </div>
      ))}
    </div>
  </div>
);

const CollabVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col justify-between p-1">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-mono text-[#ece1df]/50 uppercase tracking-widest">Team Workspace</span>
      <span className="text-[8px] font-mono text-[#be1920]">● 24 online</span>
    </div>
    {/* Avatar cluster */}
    <div className="flex justify-center mt-2">
      <div className="relative w-36 h-16">
        {[
          { x: 0, y: 8, label: 'AL' },
          { x: 28, y: 0, label: 'KM' },
          { x: 56, y: 8, label: 'JS' },
          { x: 84, y: 0, label: 'RB' },
          { x: 112, y: 8, label: '+20' },
        ].map((a, i) => (
          <div
            key={i}
            className="absolute w-9 h-9 rounded-full border-2 flex items-center justify-center text-[8px] font-black"
            style={{
              left: a.x,
              top: a.y,
              backgroundColor: i === 2 ? '#be1920' : 'rgba(190,25,32,0.25)',
              borderColor: i === 2 ? '#be1920' : 'rgba(236,225,223,0.2)',
              color: '#ece1df',
            }}
          >
            {a.label}
          </div>
        ))}
      </div>
    </div>
    {/* Activity feed */}
    <div className="space-y-1 mt-2">
      {[
        { user: 'AL', action: 'pushed report · 2m ago' },
        { user: 'KM', action: 'approved workflow · 5m ago' },
      ].map((e) => (
        <div key={e.user + e.action} className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#be1920]/40 flex items-center justify-center text-[7px] font-bold text-[#ece1df]">{e.user}</div>
          <span className="text-[8px] text-[#ece1df]/40 truncate">{e.action}</span>
        </div>
      ))}
    </div>
  </div>
);

const ScalabilityVisual: React.FC = () => (
  <div className="w-full h-full flex flex-col gap-2 p-1">
    <div className="flex items-center justify-between">
      <span className="text-[9px] font-mono text-[#ece1df]/50 uppercase tracking-widest">Growth Metrics</span>
      <Activity className="w-3 h-3 text-[#be1920]" />
    </div>
    {/* Stepped growth bars */}
    <div className="flex items-end gap-1 h-14 mt-1">
      {[15, 22, 30, 38, 50, 62, 78, 95].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${h}%`,
            background: i === 7
              ? 'linear-gradient(to top, #be1920, rgba(190,25,32,0.6))'
              : `rgba(190,25,32,${0.12 + i * 0.06})`,
          }}
        />
      ))}
    </div>
    {/* Scale tiers */}
    <div className="space-y-1 mt-1">
      {[
        { tier: 'Startup', nodes: 3, active: false },
        { tier: 'Growth', nodes: 8, active: false },
        { tier: 'Enterprise', nodes: 16, active: true },
      ].map((t) => (
        <div
          key={t.tier}
          className="flex items-center justify-between px-2 py-1 rounded"
          style={{
            backgroundColor: t.active ? 'rgba(190,25,32,0.2)' : 'rgba(236,225,223,0.04)',
            borderWidth: 1,
            borderColor: t.active ? 'rgba(190,25,32,0.4)' : 'rgba(236,225,223,0.08)',
            borderStyle: 'solid',
          }}
        >
          <span className={`text-[8px] font-bold ${t.active ? 'text-[#ece1df]' : 'text-[#ece1df]/40'}`}>{t.tier}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: Math.min(t.nodes, 8) }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-sm"
                style={{ backgroundColor: t.active ? 'rgba(190,25,32,0.8)' : 'rgba(236,225,223,0.12)' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PLATFORM_FEATURES: PlatformFeature[] = [
  {
    id: 1,
    category: 'Analytics',
    title: 'Real-Time Data Analytics',
    description: 'Monitor business data in real time and turn complex information into actionable insights.',
    icon: BarChart3,
    visual: AnalyticsVisual,
    metric: '10M+',
    metricLabel: 'Events/sec processed',
  },
  {
    id: 2,
    category: 'Automation',
    title: 'Advanced Workflow Automation',
    description: 'Streamline repetitive processes, automate workflows, and improve operational efficiency.',
    icon: Zap,
    visual: AutomationVisual,
    metric: '↓64%',
    metricLabel: 'Manual operations reduced',
  },
  {
    id: 3,
    category: 'Cloud',
    title: 'Secure Cloud Platform',
    description: 'Access scalable cloud infrastructure designed for secure, reliable, and flexible business operations.',
    icon: Cloud,
    visual: CloudVisual,
    metric: '99.99%',
    metricLabel: 'Guaranteed uptime SLA',
  },
  {
    id: 4,
    category: 'Business Intelligence',
    title: 'Business Intelligence',
    description: 'Transform business data into clear insights that support informed decision-making.',
    icon: Brain,
    visual: BIVisual,
    metric: '+34%',
    metricLabel: 'Avg. revenue growth',
  },
  {
    id: 5,
    category: 'Collaboration',
    title: 'Team Collaboration',
    description: 'Connect teams, share insights, and keep business workflows aligned across your organization.',
    icon: Users,
    visual: CollabVisual,
    metric: '5×',
    metricLabel: 'Team productivity gain',
  },
  {
    id: 6,
    category: 'Scalability',
    title: 'Scalable Business Solutions',
    description: 'Scale your analytics and workflows as your organization grows.',
    icon: TrendingUp,
    visual: ScalabilityVisual,
    metric: '∞',
    metricLabel: 'Horizontal scalability',
  },
];

/* ─────────────────────────────────────────────
   COVERFLOW MATH
───────────────────────────────────────────── */
function getCardTransform(offset: number, isMobile: boolean) {
  const absOffset = Math.abs(offset);

  if (absOffset === 0) {
    return {
      translateX: 0,
      translateZ: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      brightness: 1,
    };
  }

  const dir = offset > 0 ? 1 : -1;
  const clampedAbs = Math.min(absOffset, 2);

  const translateXBase = isMobile ? 64 : 110;
  const translateX = dir * translateXBase * clampedAbs;
  const rotateY = dir * (clampedAbs === 1 ? 22 : 38);
  const scale = clampedAbs === 1 ? 0.78 : 0.62;
  const opacity = clampedAbs === 1 ? 0.72 : absOffset > 2 ? 0 : 0.45;
  const translateZ = -(clampedAbs * (isMobile ? 60 : 90));
  const zIndex = 20 - clampedAbs * 5;
  const brightness = clampedAbs === 1 ? 0.7 : 0.45;

  return { translateX, translateZ, rotateY, scale, opacity, zIndex, brightness };
}

/* ─────────────────────────────────────────────
   SINGLE CARD
───────────────────────────────────────────── */
interface CardProps {
  feature: PlatformFeature;
  offset: number;
  isMobile: boolean;
  onClick: () => void;
}

const CoverflowCard: React.FC<CardProps> = ({ feature, offset, isMobile, onClick }) => {
  const { translateX, translateZ, rotateY, scale, opacity, zIndex, brightness } =
    getCardTransform(offset, isMobile);

  const isActive = offset === 0;
  const Icon = feature.icon;
  const Visual = feature.visual;

  return (
    <motion.div
      onClick={onClick}
      aria-label={`${feature.category}: ${feature.title}`}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      animate={{
        x: `${translateX}%`,
        z: translateZ,
        rotateY,
        scale,
        opacity,
      }}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="absolute top-0 left-0 right-0 mx-auto cursor-pointer select-none"
      style={{
        zIndex,
        width: isMobile ? '86vw' : 380,
        maxWidth: isMobile ? 340 : 380,
        filter: `brightness(${brightness})`,
        transformOrigin: 'center center',
      }}
    >
      <div
        className={`
          relative rounded-2xl overflow-hidden
          border transition-[box-shadow,border-color] duration-300
          ${isActive
            ? 'border-[#ece1df]/30 shadow-[0_16px_60px_rgba(0,0,0,0.55),0_0_12px_rgba(236,225,223,0.16),0_0_40px_rgba(190,25,32,0.18)] hover:shadow-[0_16px_60px_rgba(0,0,0,0.55),0_0_18px_rgba(236,225,223,0.32),0_0_44px_rgba(190,25,32,0.2)]'
            : 'border-[#ece1df]/12 shadow-[0_6px_24px_rgba(0,0,0,0.3),0_0_10px_rgba(236,225,223,0.12)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.3),0_0_16px_rgba(236,225,223,0.28)]'
          }
        `}
        style={{
          background: isActive
            ? 'linear-gradient(145deg, #1a0406 0%, #0f0002 60%, #000612 100%)'
            : 'linear-gradient(145deg, #110203 0%, #0a0001 100%)',
          borderColor: isActive ? 'rgba(236,225,223,0.25)' : 'rgba(236,225,223,0.10)',
        }}
      >
        {/* Top section: category + icon */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ece1df]/55">
              {feature.category}
            </span>
          </div>
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: isActive ? 'rgba(190,25,32,0.28)' : 'rgba(190,25,32,0.15)',
              border: '1px solid rgba(190,25,32,0.35)',
            }}
          >
            <Icon className="w-4 h-4 text-[#be1920]" />
          </div>
        </div>

        {/* Visual / mini-dashboard */}
        <div
          className="mx-5 rounded-xl overflow-hidden"
          style={{
            height: 148,
            backgroundColor: 'rgba(0,6,18,0.65)',
            border: '1px solid rgba(236,225,223,0.08)',
          }}
        >
          <Visual />
        </div>

        {/* Bottom content */}
        <div className="px-5 pt-4 pb-5">
          <h3 className="text-[15px] font-display font-extrabold text-[#ece1df] leading-snug tracking-tight">
            {feature.title}
          </h3>
          <p className="mt-1.5 text-[11px] text-[#ece1df]/60 leading-relaxed line-clamp-2">
            {feature.description}
          </p>

          {/* Metric + CTA row */}
          <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#ece1df]/10">
            <div>
              <div className="text-base font-display font-black text-[#ece1df] tabular-nums leading-none">
                {feature.metric}
              </div>
              <div className="text-[9px] text-[#ece1df]/45 mt-0.5 leading-none">{feature.metricLabel}</div>
            </div>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-1 text-[10px] font-bold text-[#be1920] uppercase tracking-wider"
              >
                <span>Explore</span>
                <ArrowUpRight className="w-3 h-3" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Active card: subtle red bottom glow strip */}
        {isActive && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #be1920, transparent)' }}
          />
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export const PlatformShowcaseCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // drag/swipe state
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = PLATFORM_FEATURES.length;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const rmMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsMobile(mq.matches);
    setPrefersReducedMotion(rmMq.matches);
    const handleMq = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleRm = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handleMq);
    rmMq.addEventListener('change', handleRm);
    return () => {
      mq.removeEventListener('change', handleMq);
      rmMq.removeEventListener('change', handleRm);
    };
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  // Pointer/touch drag
  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = false;
  };
  const onDragMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    if (Math.abs(clientX - dragStartX.current) > 8) isDragging.current = true;
  };
  const onDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    dragStartX.current = null;
    isDragging.current = false;
  };

  const cardHeight = 370;

  return (
    <section
      id="platform"
      className="relative py-28 bg-[#000612] border-t border-[#ece1df]/10 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(190,25,32,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(236,225,223,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(236,225,223,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ece1df]/70 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
            <span>Platform Capabilities</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#be1920]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#ece1df] tracking-tight leading-tight">
            Explore Our Powerful Platform
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#ece1df]/60 leading-relaxed">
            Explore powerful analytics, automation, cloud, and business intelligence capabilities
            designed to help organisations make smarter decisions.
          </p>
        </div>

        {/* ── Coverflow stage ── */}
        <div
          ref={containerRef}
          className="relative mx-auto touch-pan-y"
          style={{
            height: cardHeight,
            perspective: prefersReducedMotion ? 'none' : '1200px',
            perspectiveOrigin: '50% 50%',
            maxWidth: isMobile ? '100%' : 900,
          }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={(e) => { onDragEnd(e.clientX); }}
          onMouseLeave={() => { dragStartX.current = null; }}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
          role="region"
          aria-label="Platform capabilities carousel"
          aria-roledescription="carousel"
        >
          <div
            className="relative w-full h-full"
            style={{ transformStyle: prefersReducedMotion ? 'flat' : 'preserve-3d' }}
          >
            {PLATFORM_FEATURES.map((feature, idx) => {
              let offset = idx - activeIndex;
              // Wrap so cards cycle around
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;
              // Hide cards that are > 2 away (they'd be invisible anyway)
              if (Math.abs(offset) > 2) return null;

              return (
                <CoverflowCard
                  key={feature.id}
                  feature={feature}
                  offset={prefersReducedMotion ? (offset === 0 ? 0 : offset > 0 ? 99 : -99) : offset}
                  isMobile={isMobile}
                  onClick={() => {
                    if (!isDragging.current) {
                      if (offset < 0) prev();
                      else if (offset > 0) next();
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Navigation controls ── */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous capability"
            className="w-10 h-10 rounded-xl border border-[#ece1df]/15 text-[#ece1df] flex items-center justify-center transition-all hover:border-[#ece1df]/30 hover:bg-[#ece1df]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be1920]"
            style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot pagination */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel pagination">
            {PLATFORM_FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveIndex(i)}
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to ${f.title}`}
                className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be1920] ${
                  activeIndex === i
                    ? 'w-8 h-2 bg-[#be1920]'
                    : 'w-2 h-2 hover:bg-[#ece1df]/40'
                }`}
                style={activeIndex !== i ? { backgroundColor: 'rgba(236,225,223,0.2)' } : {}}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next capability"
            className="w-10 h-10 rounded-xl border border-[#ece1df]/15 text-[#ece1df] flex items-center justify-center transition-all hover:border-[#ece1df]/30 hover:bg-[#ece1df]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#be1920]"
            style={{ backgroundColor: 'rgba(236,225,223,0.06)' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Active card title below pagination */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-center mt-5"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#ece1df]/40">
              {PLATFORM_FEATURES[activeIndex].category}
              <span className="mx-2 text-[#be1920]">·</span>
              {activeIndex + 1} / {total}
            </span>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
