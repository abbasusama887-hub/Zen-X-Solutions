import React from 'react';
import logoImg from '../assets/images/LOGO.png';

interface ZenXLogoProps {
  className?: string;
  /**
   * Rendered pixel height of the <img> element.
   * Width is always `auto` — aspect ratio is always preserved.
   * Because the LOGO.png is 600×600 with transparent whitespace around the
   * artwork, you should pass a height that is LARGER than the visible space
   * available so the actual artwork fills the slot properly.
   */
  height?: number;
  // Legacy props kept so existing callers (mobile menu, CTA, footer) compile fine
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

const SIZE_H: Record<string, number> = {
  sm: 52,
  md: 64,
  lg: 88,
  xl: 120,
};

export const ZenXLogo: React.FC<ZenXLogoProps> = ({
  className = '',
  height,
  size = 'md',
}) => {
  const h = height ?? SIZE_H[size] ?? 64;

  return (
    <div
      className={`inline-flex items-center shrink-0 select-none ${className}`}
      style={{ lineHeight: 0 }}
    >
      <img
        src={logoImg}
        alt="Zen X Solutions"
        draggable={false}
        style={{
          height: h,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          maxWidth: 'none',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        className="hover:scale-105 hover:opacity-90"
      />
    </div>
  );
};
