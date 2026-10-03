import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mousePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateAvailability = () => {
      setIsEnabled(mousePointer.matches && !reducedMotion.matches);
    };

    updateAvailability();
    mousePointer.addEventListener('change', updateAvailability);
    reducedMotion.addEventListener('change', updateAvailability);
    return () => {
      mousePointer.removeEventListener('change', updateAvailability);
      reducedMotion.removeEventListener('change', updateAvailability);
    };
  }, []);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const cursor = cursorRef.current;
    if (!ring || !dot || !cursor || !isEnabled) return;

    const root = document.documentElement;
    const target = { x: 0, y: 0 };
    const ringTarget = { x: 0, y: 0 };
    const ringPosition = { x: 0, y: 0 };
    const magneticOffset = { x: 0, y: 0 };
    let isPointerVisible = false;
    let frameId = 0;
    let previousFrameTime = 0;

    const positionElement = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const animateRing = (time: number) => {
      frameId = 0;
      if (!isPointerVisible) return;

      const deltaTime = previousFrameTime
        ? Math.min((time - previousFrameTime) / 1000, 0.05)
        : 1 / 60;
      previousFrameTime = time;
      const follow = 1 - Math.exp(-deltaTime / 0.024);
      ringPosition.x += (ringTarget.x - ringPosition.x) * follow;
      ringPosition.y += (ringTarget.y - ringPosition.y) * follow;
      positionElement(ring, ringPosition.x, ringPosition.y);

      if (Math.hypot(ringTarget.x - ringPosition.x, ringTarget.y - ringPosition.y) > 0.1) {
        frameId = window.requestAnimationFrame(animateRing);
      } else {
        ringPosition.x = ringTarget.x;
        ringPosition.y = ringTarget.y;
        positionElement(ring, ringTarget.x, ringTarget.y);
        previousFrameTime = 0;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      positionElement(dot, target.x, target.y);

      if (!isPointerVisible) {
        isPointerVisible = true;
        ringPosition.x = target.x;
        ringPosition.y = target.y;
        positionElement(ring, target.x, target.y);
        root.classList.add('custom-cursor-visible');
      }

      const hoveredCard = (event.target as HTMLElement | null)?.closest('.interactive-card');
      if (hoveredCard) {
        const bounds = hoveredCard.getBoundingClientRect();
        const centerX = bounds.left + bounds.width / 2;
        const centerY = bounds.top + bounds.height / 2;
        const distance = Math.hypot(centerX - target.x, centerY - target.y) || 1;
        const strength = Math.min(3.5 / distance, 1);
        magneticOffset.x = (centerX - target.x) * strength;
        magneticOffset.y = (centerY - target.y) * strength;
      } else {
        magneticOffset.x = 0;
        magneticOffset.y = 0;
      }
      ringTarget.x = target.x + magneticOffset.x;
      ringTarget.y = target.y + magneticOffset.y;

      if (!frameId) frameId = window.requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement | null;
      const cursorTarget = targetElement?.closest(
        'button, a, [role="button"], input, textarea, select, [data-cursor]',
      );
      const cardTarget = targetElement?.closest('.interactive-card');
      const imageTarget = targetElement?.closest('img, video, canvas');

      cursor.classList.toggle('custom-cursor--interactive', Boolean(cursorTarget));
      cursor.classList.toggle('custom-cursor--card', Boolean(cardTarget));
      cursor.classList.toggle(
        'custom-cursor--media',
        !cursorTarget && !cardTarget && Boolean(imageTarget),
      );
    };

    const handleMouseDown = () => {
      const ripple = ring.querySelector<HTMLElement>('.custom-cursor__ripple');
      ripple?.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0.55)', opacity: 0.55 },
          { transform: 'translate(-50%, -50%) scale(1.7)', opacity: 0 },
        ],
        { duration: 260, easing: 'ease-out' },
      );
    };

    const handleMouseLeave = () => {
      isPointerVisible = false;
      previousFrameTime = 0;
      root.classList.remove('custom-cursor-visible');
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    root.classList.add('custom-cursor-active');
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      root.classList.remove('custom-cursor-active', 'custom-cursor-visible');
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span ref={ringRef} className="custom-cursor__ring">
        <span className="custom-cursor__ripple" />
      </span>
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
};
