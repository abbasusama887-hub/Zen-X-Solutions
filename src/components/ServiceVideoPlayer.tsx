import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Code2,
  ShoppingBag,
  Search,
  MapPin,
  Video,
  Upload,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceVideoPlayerProps {
  service: ServiceItem;
  className?: string;
  autoPlay?: boolean;
}

export const ServiceVideoPlayer: React.FC<ServiceVideoPlayerProps> = ({
  service,
  className = '',
  autoPlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [customVideoSrc, setCustomVideoSrc] = useState<string | null>(null);

  const videoSrc = customVideoSrc || service.videoUrl;

  useEffect(() => {
    setVideoError(false);
  }, [service.id, customVideoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoSrc(url);
      setVideoError(false);
    }
  };

  return (
    <div className={`relative rounded-2xl bg-[#000612] border border-[#000612]/20 overflow-hidden group select-none shadow-2xl ${className}`}>
      {/* Top Video Metadata Overlay */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-xs pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-[#000612]/90 border border-white/20 text-[#ece1df] font-mono font-bold text-[11px] backdrop-blur-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5232c] animate-pulse" />
            {service.videoBadge || `Service #${service.number}`}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#000612]/80 text-[#ece1df]/80 text-[10px] backdrop-blur-md border border-white/10">
            {service.videoDuration || '0:09 Animation'}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          <label
            title="Load custom MP4 video file"
            className="cursor-pointer px-2 py-1 rounded bg-[#000612]/85 hover:bg-white text-[#ece1df] hover:text-[#000612] border border-white/20 text-[10px] flex items-center gap-1 transition-colors backdrop-blur-md font-semibold"
          >
            <Upload className="w-3 h-3" />
            <span className="hidden md:inline">Custom MP4</span>
            <input
              type="file"
              accept="video/mp4,video/webm,video/mov"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Video Element or Animated Simulation */}
      <div className="relative aspect-video w-full flex items-center justify-center bg-[#000612] overflow-hidden">
        {videoSrc && !videoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={autoPlay}
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoError(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        ) : (
          /* High-Fidelity Animated Simulation */
          <ServiceAnimationSimulation service={service} />
        )}

        {/* Ambient Gradient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#000612] via-transparent to-[#000612]/40 opacity-70" />
      </div>

      {/* Bottom Video Controls Bar */}
      <div className="p-3 bg-[#000612] border-t border-white/10 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-[#ece1df] hover:text-[#000612] border border-white/15 transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-[#ece1df] hover:text-[#000612] border border-white/15 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <span className="text-[11px] text-[#ece1df]/80 font-medium truncate max-w-[200px] sm:max-w-md">
            {service.videoTitle || `${service.title} Technical Showcase`}
          </span>
        </div>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white text-[#ece1df] hover:text-[#000612] border border-white/15 transition-colors cursor-pointer"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// Animated Simulation Component in Clean Obsidian & Warm White
const ServiceAnimationSimulation: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const key = service.videoKey || 'web-development';

  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-[#000612] via-[#151c28] to-[#000612]">
      {/* Background grid wireframe */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(236,225,223,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,225,223,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Render Scene Based on Video Key */}
      {key === 'web-development' && (
        <div className="relative z-10 w-full max-w-lg space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#ece1df] pb-1 border-b border-white/15">
            <span>struct CoreEngine &lt;TypeScript&gt;</span>
            <span className="text-[#ece1df]/70 font-semibold">Zen X Core</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/15 font-mono text-[10px] text-[#ece1df]/80 space-y-1">
              <div className="text-[#ece1df] font-bold">export const deploy = async () =&gt; &#123;</div>
              <div className="pl-2 text-[#ece1df]/70">ssr: true, cache: 'edge',</div>
              <div className="pl-2 text-white font-bold">latency: '&lt; 0.8s',</div>
              <div>&#125;</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/15 flex flex-col justify-between">
              <div className="text-[11px] font-bold text-[#ece1df] flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#ece1df]" />
                <span>Responsive Viewports</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-8 h-10 border border-white/30 rounded-sm bg-[#000612] p-0.5 flex flex-col justify-between">
                  <div className="w-full h-1 bg-white/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ece1df] mx-auto" />
                </div>
                <div className="w-14 h-10 border border-white/30 rounded-sm bg-[#000612] p-0.5 flex flex-col justify-between">
                  <div className="w-full h-1 bg-white/60" />
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="h-4 bg-white/10" />
                    <div className="h-4 bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-[10px] font-mono text-[#ece1df]/80 tracking-widest uppercase">
            Zen X Solutions · Multi-Screen Engine Online
          </div>
        </div>
      )}

      {key === 'website-design' && (
        <div className="relative z-10 w-full max-w-md text-center space-y-3">
          <div className="relative mx-auto w-48 h-28 border border-white/30 rounded-xl bg-white/5 p-2 shadow-lg">
            <div className="w-full h-2 bg-white/15 rounded mb-1 flex items-center gap-1 px-1">
              <div className="w-1 h-1 rounded-full bg-white/80" />
              <div className="w-1 h-1 rounded-full bg-white/40" />
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="h-14 bg-white/5 rounded border border-white/15 p-1">
                <div className="w-full h-1 bg-white/60 mb-1" />
                <div className="w-3/4 h-1 bg-white/30" />
              </div>
              <div className="col-span-2 h-14 bg-white/10 rounded border border-white/25 p-1 flex flex-col justify-between">
                <div className="text-[8px] font-bold text-[#ece1df] text-left">Zen X Agency</div>
                <div className="w-12 h-3 bg-white text-[#000612] rounded text-[6px] flex items-center justify-center font-bold">
                  Explore
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#ece1df]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5232c]" />
            <span>Design System: #ece1df & #000612</span>
          </div>
        </div>
      )}

      {key === 'mobile-app-development' && (
        <div className="relative z-10 flex items-center justify-center gap-4">
          <div className="w-28 h-48 border border-white/30 rounded-2xl bg-[#000612] p-2 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="w-10 h-2 bg-white/20 rounded-full mx-auto" />
            <div className="space-y-1.5 my-auto">
              <div className="text-[9px] font-extrabold text-[#ece1df] text-center">
                Zen X Mobile
              </div>
              <div className="p-1 rounded bg-white/5 border border-white/15 text-[7px] text-[#ece1df]">
                120Hz Gesture Pipeline
              </div>
              <div className="p-1 rounded bg-white text-[#000612] text-[7px] text-center font-bold">
                Deploying Native
              </div>
            </div>
            <div className="w-8 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono font-bold text-[#ece1df] block">
              iOS & Android Core
            </span>
            <span className="text-[11px] text-[#ece1df]/70 block max-w-[140px]">
              Offline-First SQLite · Biometric Auth · 4.9★
            </span>
          </div>
        </div>
      )}

      {key === 'shopify-development' && (
        <div className="relative z-10 w-full max-w-md space-y-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#000612]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-[#ece1df]">Shopify Plus Checkout</div>
                <div className="text-[10px] text-[#ece1df]/70">Multi-Currency Stripe Engine</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-[#ece1df]">$4.2M GMV</div>
              <div className="text-[9px] text-[#ece1df]/60">+32% Conversion</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[#ece1df]/70">
            <span>Cart Drawer</span>
            <span>·</span>
            <span>1-Click Buy</span>
            <span>·</span>
            <span className="text-[#ece1df] font-bold">PCI-DSS Level 1</span>
          </div>
        </div>
      )}

      {key === 'ecommerce-management' && (
        <div className="relative z-10 w-full max-w-md space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/15">
              <div className="text-[9px] text-[#ece1df]/60">Products</div>
              <div className="text-sm font-bold text-[#ece1df]">2,924</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/15">
              <div className="text-[9px] text-[#ece1df]/60">Inventory</div>
              <div className="text-sm font-bold text-[#ece1df]">99.4%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-white/5 border border-white/15">
              <div className="text-[9px] text-[#ece1df]/60">Sales Vol</div>
              <div className="text-sm font-bold text-[#ece1df]">+573%</div>
            </div>
          </div>
          <div className="h-12 w-full bg-white/5 rounded-lg border border-white/15 flex items-end p-2 gap-1.5">
            <div className="w-1/6 h-4 bg-white/20 rounded-t" />
            <div className="w-1/6 h-6 bg-white/40 rounded-t" />
            <div className="w-1/6 h-8 bg-white/60 rounded-t" />
            <div className="w-1/6 h-10 bg-white/80 rounded-t" />
            <div className="w-1/6 h-7 bg-white/60 rounded-t" />
            <div className="w-1/6 h-11 bg-white rounded-t" />
          </div>
        </div>
      )}

      {key === 'local-seo' && (
        <div className="relative z-10 w-full max-w-md text-center space-y-2">
          <div className="relative w-36 h-24 mx-auto border border-white/30 rounded-xl bg-white/5 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-[#ece1df] animate-bounce" />
          </div>
          <div className="text-xs font-bold text-[#ece1df]">
            Google Maps 3-Pack Dominance
          </div>
          <div className="text-[10px] text-[#ece1df]/70">
            4.8★ Rating · 12 Local Citation Hubs Synced
          </div>
        </div>
      )}

      {key === 'seo-services' && (
        <div className="relative z-10 w-full max-w-md space-y-2.5">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/20 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#ece1df]" />
            <span className="text-xs font-mono text-[#ece1df]">
              high-growth commercial keywords
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#ece1df]/70 px-2">
            <span>Rank #1 Organic</span>
            <span className="text-white font-bold">+210% Inbound Traffic</span>
          </div>
        </div>
      )}

      {/* General fallback */}
      {!['web-development', 'website-design', 'mobile-app-development', 'shopify-development', 'ecommerce-management', 'local-seo', 'seo-services'].includes(key) && (
        <div className="relative z-10 text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#ece1df] mx-auto">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-sm font-bold text-[#ece1df]">{service.title} Live Telemetry</div>
          <div className="text-xs text-[#ece1df]/70">24/7 Global SLA Response Under 15 Minutes</div>
        </div>
      )}
    </div>
  );
};
