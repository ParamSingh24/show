
import { useState, useEffect } from "react";

const clientSets = [
  ["Apple", "Google", "Microsoft"],
  ["Netflix", "Spotify", "Adobe"],
  ["Tesla", "Amazon", "Meta"],
  ["Uber", "Airbnb", "Stripe"]
];

const uniqueImages = {
  left: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80",
  right: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2048&q=80"
};

const ClientShowcase = () => {
  const [showCustomers, setShowCustomers] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % clientSets.length);
    }, 1500); // Faster changing

    return () => clearInterval(interval);
  }, []);

  const currentClients = clientSets[currentSet];

  return (
    <section className="py-20 bg-black dark:bg-white text-white dark:text-black transition-colors duration-300 relative">
      <div className="container mx-auto px-6">
        <div 
          className="relative"
          onMouseEnter={() => setShowCustomers(true)}
          onMouseLeave={() => {
            setShowCustomers(false);
            setSelectedSide(null);
          }}
        >
          {/* Background Image */}
          {selectedSide && (
            <div className="absolute inset-0 z-0">
              <img 
                src={uniqueImages[selectedSide]}
                alt={`${selectedSide} image`}
                className="w-full h-full object-cover opacity-30 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          )}

          {/* Client Grid */}
          <div className={`relative z-10 grid grid-cols-3 gap-8 transition-all duration-300 ${showCustomers ? 'blur-sm opacity-30' : ''}`}>
            {[0, 1, 2, 3].map((rowIndex) => (
              <div key={rowIndex} className="col-span-3 grid grid-cols-3 gap-8">
                {currentClients.map((client, clientIndex) => (
                  <div 
                    key={`${rowIndex}-${clientIndex}`}
                    className="h-24 flex items-center justify-center text-2xl font-semibold hover:text-red-500 transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedSide(clientIndex === 0 ? 'left' : 'right')}
                  >
                    {client}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Overlay Controls */}
          {showCustomers && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="flex space-x-8">
                <button 
                  onClick={() => setSelectedSide('left')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
                >
                  ← Left View
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-200 transform hover:scale-105">
                  Meet our customers →
                </button>
                <button 
                  onClick={() => setSelectedSide('right')}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
                >
                  Right View →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;
