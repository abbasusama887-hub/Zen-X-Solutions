import React, { useState, useRef, useEffect } from 'react';

interface HeroVideoBackgroundProps {
  defaultVideoUrl?: string;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({
  defaultVideoUrl = '/videos/hero-network.mp4',
}) => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* HTML5 Background Video with deep #000612 dark scrim */}
      <video
        src={defaultVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => {
          setVideoLoaded(true);
          setVideoError(false);
        }}
        onError={() => {
          setVideoError(true);
          setVideoLoaded(false);
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-25' : 'opacity-0'
        }`}
      />

      {/* Fallback Animated Canvas Scene in #ece1df and #be1920 over #000612 */}
      {(!videoLoaded || videoError) && (
        <div className="absolute inset-0 w-full h-full opacity-40">
          <HeroNetworkCanvas />
        </div>
      )}

      {/* High-Contrast Measured Scrim in #000612 */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#000612] via-[#000612]/75 to-[#000612]/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#000612]/60 to-[#000612]"
        aria-hidden="true"
      />

    </div>
  );
};

// Animated Network Canvas in Clean Dark #000612 with #ece1df and #be1920 nodes
const HeroNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodes = [
      { x: 0.5, y: 0.48, r: 16, color: '#ece1df', isCenter: true },
      { x: 0.22, y: 0.28, r: 7, color: '#ece1df' },
      { x: 0.62, y: 0.16, r: 7, color: '#be1920' },
      { x: 0.82, y: 0.32, r: 7, color: '#ece1df' },
      { x: 0.88, y: 0.62, r: 7, color: '#be1920' },
      { x: 0.68, y: 0.78, r: 7, color: '#ece1df' },
      { x: 0.42, y: 0.82, r: 7, color: '#ece1df' },
      { x: 0.16, y: 0.68, r: 7, color: '#ece1df' },
      { x: 0.32, y: 0.36, r: 5, color: '#be1920' },
      { x: 0.72, y: 0.46, r: 5, color: '#ece1df' },
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.48;

      // Draw subtle background matrix grid
      ctx.strokeStyle = 'rgba(236, 225, 223, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw radiating connections
      nodes.forEach((node, idx) => {
        if (node.isCenter) return;
        const nx = width * node.x;
        const ny = height * node.y;

        // Draw curved connection line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const cpX = (centerX + nx) / 2 + Math.sin(t + idx) * 12;
        const cpY = (centerY + ny) / 2 + Math.cos(t + idx) * 12;
        ctx.quadraticCurveTo(cpX, cpY, nx, ny);
        ctx.strokeStyle = 'rgba(236, 225, 223, 0.12)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Traveling pulse particle along curve
        const progress = (t * 0.4 + idx * 0.15) % 1;
        const px = Math.pow(1 - progress, 2) * centerX + 2 * (1 - progress) * progress * cpX + Math.pow(progress, 2) * nx;
        const py = Math.pow(1 - progress, 2) * centerY + 2 * (1 - progress) * progress * cpY + Math.pow(progress, 2) * ny;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#be1920';
        ctx.fill();

        // Outer Node Circle
        ctx.beginPath();
        ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      // Center Hub with expanding radar rings
      const pulseSize = Math.sin(t * 2) * 4;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 28 + pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(190, 25, 32, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#be1920';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
