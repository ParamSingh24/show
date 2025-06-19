
import { useState, useEffect } from "react";

const caseStudies = [
  {
    id: 1,
    title: "Digital Transformation Success",
    company: "TechCorp Industries",
    description: "How we helped a traditional manufacturing company embrace digital innovation",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    results: "300% increase in operational efficiency"
  },
  {
    id: 2,
    title: "Cloud Migration Excellence",
    company: "Global Finance Ltd",
    description: "Seamless transition to cloud infrastructure with zero downtime",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    results: "50% reduction in IT costs"
  },
  {
    id: 3,
    title: "AI Implementation Strategy",
    company: "RetailMax Solutions",
    description: "Revolutionary AI-powered customer experience transformation",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    results: "150% improvement in customer satisfaction"
  }
];

const CaseStudySection = () => {
  const [currentStudy, setCurrentStudy] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [redOverlay, setRedOverlay] = useState({ show: false, corner: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStudy]);

  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setRedOverlay({ show: true, corner: 'top-left' });
    
    setTimeout(() => {
      setRedOverlay({ show: true, corner: 'full' });
    }, 300);
    
    setTimeout(() => {
      setCurrentStudy((prev) => (prev + 1) % caseStudies.length);
    }, 600);
    
    setTimeout(() => {
      setRedOverlay({ show: false, corner: '' });
      setIsTransitioning(false);
    }, 900);
  };

  return (
    <section className="h-screen relative overflow-hidden bg-white dark:bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={caseStudies[currentStudy].image}
          alt={caseStudies[currentStudy].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Red Transition Overlay */}
      <div className={`absolute inset-0 bg-red-600 transition-all duration-300 ${
        redOverlay.show && redOverlay.corner === 'top-left' ? 'clip-path-triangle-tl' :
        redOverlay.show && redOverlay.corner === 'full' ? 'clip-path-full' :
        'clip-path-none'
      }`} style={{
        clipPath: redOverlay.show && redOverlay.corner === 'top-left' ? 'polygon(0 0, 50% 0, 0 50%)' :
                 redOverlay.show && redOverlay.corner === 'full' ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' :
                 'polygon(0 0, 0 0, 0 0)'
      }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
              Case Study
            </h2>
            <h3 className="text-3xl md:text-5xl font-light mb-8 text-white animate-fade-in">
              {caseStudies[currentStudy].title}
            </h3>
            <p className="text-xl text-white/90 mb-6 animate-fade-in">
              {caseStudies[currentStudy].description}
            </p>
            <div className="flex items-center space-x-8 text-white/80 animate-fade-in">
              <span className="text-lg">{caseStudies[currentStudy].company}</span>
              <span>•</span>
              <span className="text-green-400 font-semibold">{caseStudies[currentStudy].results}</span>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center space-x-4 mt-8">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning && index !== currentStudy) {
                      setCurrentStudy(index);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStudy ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
