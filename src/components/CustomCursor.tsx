import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context || !isEnabled) return;

    const root = document.documentElement;
    root.classList.add('spider-cursor-active');

    const target = { x: 0, y: 0 };
    const spider = { x: 0, y: 0 };
    const clickPoint = { x: 0, y: 0 };
    const pointer = {
      visible: false,
      speed: 0,
      requestedSpeed: 0,
      heading: 0,
      gait: 0,
      hoverLabel: '',
      clickTime: -Infinity,
      previousX: 0,
      previousY: 0,
      previousMoveTime: 0,
    };
    let frameId = 0;
    let previousFrameTime = 0;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * pixelRatio);
      canvas.height = Math.round(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawSpider = (time: number, deltaTime: number) => {
      const follow = 1 - Math.exp(-deltaTime / 0.035);
      spider.x += (target.x - spider.x) * follow;
      spider.y += (target.y - spider.y) * follow;

      pointer.requestedSpeed *= Math.exp(-deltaTime * 5.5);
      const speedResponse = 1 - Math.exp(-deltaTime * (pointer.requestedSpeed > pointer.speed ? 15 : 5));
      pointer.speed += (pointer.requestedSpeed - pointer.speed) * speedResponse;
      pointer.gait += deltaTime * (7 + pointer.speed * 0.04);

      const distanceX = target.x - spider.x;
      const distanceY = target.y - spider.y;
      if (Math.hypot(distanceX, distanceY) > 0.1) {
        const desiredHeading = Math.atan2(distanceY, distanceX);
        const headingDifference = Math.atan2(
          Math.sin(desiredHeading - pointer.heading),
          Math.cos(desiredHeading - pointer.heading),
        );
        pointer.heading += headingDifference * Math.min(1, deltaTime * 12);
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const clickAge = time - pointer.clickTime;
      if (clickAge >= 0 && clickAge < 360) {
        const progress = clickAge / 360;
        context.beginPath();
        context.arc(clickPoint.x, clickPoint.y, 5 + progress * 16, 0, Math.PI * 2);
        context.strokeStyle = `rgba(236, 225, 223, ${(1 - progress) * 0.28})`;
        context.lineWidth = 1;
        context.stroke();
      }

      context.save();
      context.translate(spider.x, spider.y + Math.sin(time * 0.004) * 0.35);
      context.rotate(pointer.heading);

      const stride = 0.8 + Math.min(pointer.speed / 350, 1) * 5;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 1.55;
      context.strokeStyle = 'rgba(236, 225, 223, 0.92)';

      for (const side of [-1, 1]) {
        for (let legIndex = 0; legIndex < 4; legIndex += 1) {
          const rootX = -5 + legIndex * 3.2;
          const forward = legIndex > 1 ? 1 : -1;
          const phase = pointer.gait + legIndex * (Math.PI / 2) + (side < 0 ? Math.PI : 0);
          const swing = Math.sin(phase) * stride;
          const kneeX = rootX + forward * 4 + swing * 0.55;
          const kneeY = side * (9 + (legIndex % 2) * 1.5);
          const footX = rootX + forward * 12 + swing;
          const footY = side * (17 + Math.max(0, Math.cos(phase)) * 1.2);

          context.beginPath();
          context.moveTo(rootX, 0);
          context.quadraticCurveTo(rootX + forward * 2, kneeY * 0.45, kneeX, kneeY);
          context.lineTo(footX, footY);
          context.stroke();

          context.beginPath();
          context.arc(kneeX, kneeY, 1.15, 0, Math.PI * 2);
          context.fillStyle = '#be1920';
          context.fill();
        }
      }

      context.beginPath();
      context.ellipse(-2, 0, 7, 8.5, 0, 0, Math.PI * 2);
      context.fillStyle = '#be1920';
      context.fill();
      context.lineWidth = 1.35;
      context.strokeStyle = '#ece1df';
      context.stroke();

      context.beginPath();
      context.arc(6, 0, 4.2, 0, Math.PI * 2);
      context.fillStyle = '#ece1df';
      context.fill();
      context.beginPath();
      context.arc(7.2, -1, 0.9, 0, Math.PI * 2);
      context.fillStyle = '#000612';
      context.fill();

      context.restore();

      if (pointer.hoverLabel) {
        context.save();
        context.font = '700 10px Inter, sans-serif';
        context.textBaseline = 'middle';
        const labelWidth = context.measureText(pointer.hoverLabel).width;
        const labelX = spider.x + 20;
        const labelY = spider.y - 19;
        context.fillStyle = 'rgba(0, 6, 18, 0.92)';
        context.fillRect(labelX, labelY - 9, labelWidth + 14, 18);
        context.strokeStyle = 'rgba(236, 225, 223, 0.24)';
        context.lineWidth = 1;
        context.strokeRect(labelX, labelY - 9, labelWidth + 14, 18);
        context.fillStyle = '#ece1df';
        context.fillText(pointer.hoverLabel.toUpperCase(), labelX + 7, labelY);
        context.restore();
      }

      context.restore();
    };

    const animate = (time: number) => {
      frameId = 0;
      if (!pointer.visible) return;
      const deltaTime = previousFrameTime
        ? Math.min((time - previousFrameTime) / 1000, 0.05)
        : 1 / 60;
      previousFrameTime = time;
      drawSpider(time, deltaTime);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (!pointer.visible) {
        spider.x = event.clientX;
        spider.y = event.clientY;
        pointer.visible = true;
      } else {
        const elapsed = Math.max(now - pointer.previousMoveTime, 1);
        const movement = Math.hypot(event.clientX - pointer.previousX, event.clientY - pointer.previousY);
        pointer.requestedSpeed = Math.min((movement / elapsed) * 1000, 1400);
      }

      target.x = event.clientX;
      target.y = event.clientY;
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      pointer.previousMoveTime = now;
      if (!frameId) frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseDown = (event: MouseEvent) => {
      clickPoint.x = event.clientX;
      clickPoint.y = event.clientY;
      pointer.clickTime = performance.now();
      if (pointer.visible && !frameId) frameId = window.requestAnimationFrame(animate);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement | null;
      const interactiveElement = targetElement?.closest(
        'button, a, [role="button"], input, textarea, select, .interactive-card, [data-cursor]',
      );
      pointer.hoverLabel = interactiveElement?.getAttribute('data-cursor') || '';
    };

    const handleMouseLeave = () => {
      pointer.visible = false;
      pointer.requestedSpeed = 0;
      pointer.speed = 0;
      previousFrameTime = 0;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      root.classList.remove('spider-cursor-active');
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[100] h-screen w-screen pointer-events-none"
      aria-hidden="true"
    />
  );
};