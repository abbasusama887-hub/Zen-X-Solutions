import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation for Light #ece1df with dark #000612 nodes
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 300 : 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const paletteColors = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e8e8e8'),
      new THREE.Color('#cccccc'),
      new THREE.Color('#aaaaaa'),
      new THREE.Color('#e5232c'), // minimal small red accent
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical distribution with random radius
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 26;
      const sinPhi = Math.sin(phi);

      positions[i3] = r * sinPhi * Math.cos(theta);
      positions[i3 + 1] = r * sinPhi * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // 95% dark tones, 5% minimal red accent
      const isRedAccent = Math.random() < 0.05;
      const color = isRedAccent ? paletteColors[4] : paletteColors[Math.floor(Math.random() * 4)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      scales[i] = Math.random() * 2.0 + 0.8;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture for clean dark nodes on light background
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 64;
    canvasTexture.height = 64;
    const ctx = canvasTexture.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0,    'rgba(255, 255, 255, 0.95)');
      gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.60)');
      gradient.addColorStop(0.7,  'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1,    'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: texture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle Architectural Geometric Orbit rings in dark #000612
    const ringGroup = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(12, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x000612,
      transparent: true,
      opacity: 0.14,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(16, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x000612,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0006;
      mouseY = (event.clientY - windowHalfY) * 0.0006;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      if (!prefersReducedMotion) {
        particles.rotation.y = elapsedTime * 0.04 + targetX * 0.8;
        particles.rotation.x = targetY * 0.8;

        ringGroup.rotation.z = elapsedTime * 0.02;
        ringGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + targetY * 0.5;
        ringGroup.rotation.y = Math.cos(elapsedTime * 0.1) * 0.2 + targetX * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};
