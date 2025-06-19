
import { useState, useRef, useEffect } from 'react';

interface RippleTextProps {
  text: string;
  className?: string;
}

const RippleText = ({ text, className = '' }: RippleTextProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    charRefs.current = charRefs.current.slice(0, text.length);
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const calculateTransform = (index: number) => {
    if (!isHovered || !charRefs.current[index]) return '';
    
    const charElement = charRefs.current[index];
    if (!charElement) return '';
    
    const rect = charElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return '';
    
    const charCenterX = rect.left - containerRect.left + rect.width / 2;
    const charCenterY = rect.top - containerRect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - charCenterX, 2) + 
      Math.pow(mousePosition.y - charCenterY, 2)
    );
    
    const maxDistance = 100;
    const maxOffset = 20;
    
    if (distance < maxDistance) {
      const intensity = 1 - (distance / maxDistance);
      const offsetX = (mousePosition.x - charCenterX) * intensity * -0.3;
      const offsetY = (mousePosition.y - charCenterY) * intensity * -0.3;
      
      return `translate(${offsetX}px, ${offsetY}px) scale(${1 + intensity * 0.1})`;
    }
    
    return '';
  };

  return (
    <div
      ref={containerRef}
      className={`${className} relative inline-block cursor-pointer`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => (charRefs.current[index] = el)}
          className="inline-block transition-transform duration-100 ease-out"
          style={{
            transform: calculateTransform(index),
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default RippleText;
