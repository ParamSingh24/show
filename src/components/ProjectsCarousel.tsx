
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Premium Collection",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    hoverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    label: "NEW"
  },
  {
    id: 2,
    title: "Essential Series",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    hoverImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
    label: "NEW"
  }
];

const ProjectsCarousel = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderStage, setLoaderStage] = useState(0);
  const navigate = useNavigate();

  const handleSeeProjects = () => {
    setShowLoader(true);
    setLoaderStage(0);
    
    // Stage 1: Rectangle loader
    setTimeout(() => setLoaderStage(1), 500);
    
    // Stage 2: Transform to L-shape
    setTimeout(() => setLoaderStage(2), 1500);
    
    // Stage 3: Zoom in effect
    setTimeout(() => setLoaderStage(3), 2500);
    
    // Navigate to projects page
    setTimeout(() => {
      navigate('/projects');
    }, 3500);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 relative">
      {/* Enhanced Loader */}
      {showLoader && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-black flex items-center justify-center">
          <div className="relative">
            {/* Stage 0 & 1: Rectangle loader */}
            <div className={`transition-all duration-1000 ${
              loaderStage >= 2 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}>
              <div className={`bg-red-500 transition-all duration-1000 ${
                loaderStage === 0 ? 'w-8 h-24' : 'w-48 h-24'
              }`}>
                {loaderStage === 1 && (
                  <div className="w-full bg-red-400 h-2 animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Stage 2: L-shape */}
            <div className={`absolute top-0 left-0 transition-all duration-1000 ${
              loaderStage === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}>
              <div className="relative">
                <div className="w-8 h-48 bg-red-500"></div>
                <div className="w-32 h-8 bg-red-500 mt-0"></div>
              </div>
            </div>
            
            {/* Stage 3: Zoom effect */}
            <div className={`absolute top-0 left-0 transition-all duration-1000 ${
              loaderStage === 3 ? 'scale-[20] opacity-100' : 'scale-100 opacity-0'
            }`}>
              <div className="w-16 h-16 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
          Our Projects
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="relative group cursor-pointer"
                onMouseEnter={() => {
                  setActiveProduct(index);
                  setHoveredProduct(index);
                }}
                onMouseLeave={() => setHoveredProduct(null)}
                onTouchStart={() => {
                  setActiveProduct(index);
                  setHoveredProduct(index);
                }}
                onTouchEnd={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                  <div className="absolute top-4 left-4 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium z-10">
                    {product.label}
                  </div>
                  <img
                    src={hoveredProduct === index ? product.hoverImage : product.image}
                    alt={product.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      activeProduct === index ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeProduct === index ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></button>
            ))}
          </div>

          {/* See Our Projects Button */}
          <div className="flex justify-center mt-12">
            <button 
              onClick={handleSeeProjects}
              className="bg-red-500 text-white px-8 py-4 font-semibold hover:bg-red-600 transition-all duration-300 transform hover:scale-105 rounded-lg"
            >
              See Our Projects →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
