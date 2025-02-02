'use client'

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  blur: string;
  animation: string;
}

type AnimationType = 'float' | 'float2' | 'floatReverse' | 'floatReverse2';

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => {
    const randomAnimation = (): AnimationType => {
      const animations: AnimationType[] = ['float', 'float2', 'floatReverse', 'floatReverse2'];
      return animations[Math.floor(Math.random() * animations.length)];
    };

    return {
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 20) + 11,
      blur: (Math.random() * 1.6).toFixed(2),
      animation: `${Math.floor(Math.random() * 20) + 21}s ${randomAnimation()} infinite`
    };
  });
};

const NotFoundPage = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    setParticles(generateParticles(80));
  }, []);

  const handleGoBack = (): void => {
    window.history.back();
  };

  return (
    <div className="relative flex h-screen items-center justify-center bg-orange-50 text-orange-900 overflow-hidden font-sans">
      {particles.map((particle, i) => (
        <span
          key={particle.id}
          className="absolute block pointer-events-none text-orange-500"
          style={{
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            filter: `blur(${particle.blur}px)`,
            animation: particle.animation,
          }}
        >
          {i < 40 ? '4' : '0'}
        </span>
      ))}

      <div 
        className="relative w-[600px] max-w-full m-5 bg-white/80 backdrop-blur-sm p-8 md:p-14 text-center shadow-lg animate-appearance rounded-lg border border-orange-200"
        role="alert"
        aria-label="404 error page"
      >
        <p className="text-xl md:text-2xl m-0 mb-2 tracking-wide text-orange-800">
          Damnit stranger,
        </p>
        <p className="text-xl md:text-2xl m-0 mb-2 tracking-wide text-orange-800">
          You got lost in the <strong className="text-orange-600">404</strong> galaxy.
        </p>
        <button 
          className="inline-block mt-8 px-6 py-3 border-2 border-orange-500 bg-transparent text-base text-orange-600 font-bold cursor-pointer hover:bg-orange-500 hover:text-white transition-colors rounded-md"
          onClick={handleGoBack}
          type="button"
          aria-label="Go back to previous page"
        >
          Go back to earth.
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;