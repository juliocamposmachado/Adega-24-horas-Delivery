import { useEffect, useState } from 'react';
import { Wine } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Começar fade out após 2.5 segundos
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Chamar onFinish após 3 segundos
    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-950 via-wine-900/20 to-gray-950 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-8 animate-pulse-slow">
        {/* Logo animado */}
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-gold-500/30 rounded-full animate-pulse"></div>
          <Wine className="w-32 h-32 mx-auto text-gold-500 relative z-10 animate-bounce-slow" />
        </div>

        {/* Texto principal */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent animate-gradient">
            ADEGA 24 HORAS
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-wine-400">
            RÁDIO TATUAPÉ FM
          </h2>
          <p className="text-lg text-gray-400 mt-4">
            🚀 Express Delivery
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold-500 to-wine-500 animate-loading"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

