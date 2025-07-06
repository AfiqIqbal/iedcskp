
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  
  const loadingTexts = [
    "Initializing IEDC GEC PKD...",
    "Loading innovation data...",
    "Preparing experience...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-animated">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse shadow-glow"></div>
            <div className="absolute inset-2 bg-gradient-primary rounded-full animate-spin-slow"></div>
            <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
              <div className="text-2xl font-bold text-gradient">IEDC</div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 animate-bounce-slow">
            IEDC GEC PKD
          </h1>
          <p className="text-white/90 text-lg animate-fade-in">
            Innovation • Entrepreneurship • Development
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/90 text-sm mt-3 font-medium">
            {progress}%
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white/90 text-lg animate-pulse font-medium">
          {loadingTexts[currentText]}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float"
              style={{
                background: `linear-gradient(45deg, rgba(37, 99, 235, 0.4), rgba(59, 130, 246, 0.4))`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
