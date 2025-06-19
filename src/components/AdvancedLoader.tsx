
import { useState, useEffect } from 'react';

interface AdvancedLoaderProps {
  onComplete: () => void;
}

const AdvancedLoader = ({ onComplete }: AdvancedLoaderProps) => {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 3) {
        setStage(stage + 1);
        setProgress(0);
      } else {
        onComplete();
      }
    }, stage === 2 ? 1000 : 1500);

    return () => clearTimeout(timer);
  }, [stage, onComplete]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (stage === 2 ? 5 : 2);
      });
    }, 50);

    return () => clearInterval(progressTimer);
  }, [stage]);

  const getLoaderShape = () => {
    switch (stage) {
      case 0:
        return 'w-32 h-8 rounded-sm'; // Rectangle
      case 1:
        return 'w-32 h-32 rounded-lg'; // Square
      case 2:
        return 'w-32 h-32 rounded-lg transform rotate-45'; // L-shape (rotated square)
      case 3:
        return 'w-screen h-screen rounded-none'; // Full screen
      default:
        return 'w-32 h-8 rounded-sm';
    }
  };

  const getContainerScale = () => {
    if (stage === 3) return 'scale-150';
    return 'scale-100';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <div className={`transition-all duration-1000 ease-in-out ${getContainerScale()}`}>
        <div 
          className={`bg-white transition-all duration-1000 ease-in-out ${getLoaderShape()}`}
          style={{
            background: stage === 2 ? 
              `linear-gradient(90deg, white ${progress}%, transparent ${progress}%)` : 
              'white'
          }}
        >
          {stage < 2 && (
            <div 
              className="h-full bg-gray-300 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
      </div>
      
      {stage === 3 && (
        <div className="absolute inset-0 bg-white animate-pulse" />
      )}
    </div>
  );
};

export default AdvancedLoader;
