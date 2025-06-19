
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-black/20 dark:bg-white/5"></div>
      
      {/* Fixed Background Video/Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80')`
        }}
      ></div>
      
      {/* Content with smooth upward movement */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div 
          className="text-center max-w-4xl px-6 transition-all duration-300 ease-out"
          style={{
            transform: `translateY(${-scrollY * 1.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 500)
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white animate-fade-in">
            Connection
          </h1>
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-white animate-fade-in">
            Share quality time.
            <br />
            And space.
          </h2>
          <div className="flex items-center justify-center space-x-4 text-white/80 animate-fade-in">
            <span>Los Angeles</span>
            <span>•</span>
            <span>May 5 1:56 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
