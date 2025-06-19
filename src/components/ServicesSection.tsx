
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const services = [
  { 
    id: 1, 
    name: "BILLING", 
    icon: "💳", 
    description: "Comprehensive billing solutions with automated invoicing, payment processing, and financial reporting",
    details: "Our billing system handles complex pricing models, recurring subscriptions, usage-based billing, and integrates with major payment gateways for seamless transactions."
  },
  { 
    id: 2, 
    name: "CHARGING", 
    icon: "🔋", 
    description: "Advanced charging infrastructure for electric vehicles and renewable energy systems",
    details: "Smart charging solutions with load balancing, real-time monitoring, mobile app integration, and support for all major EV standards and protocols."
  },
  { 
    id: 3, 
    name: "CATALOG", 
    icon: "📚", 
    description: "Dynamic product catalog management with real-time inventory and pricing",
    details: "Advanced catalog system with product variants, bulk operations, automated categorization, and seamless integration with e-commerce platforms."
  },
  { 
    id: 4, 
    name: "EVENTS", 
    icon: "🎯", 
    description: "Comprehensive event management system with booking and analytics",
    details: "Full-featured event platform with registration management, ticket sales, attendee tracking, and detailed analytics for event optimization."
  }
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveService((current) => (current + 1) % services.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to Supabase
    console.log("Signup with email:", email);
    alert("Thanks for signing up! We'll be in touch soon.");
    setEmail("");
    setShowSignup(false);
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
            [ EFFICIENCY, SCALABILITY, AND AGILITY ]
          </p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Unparalleled
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold">
            BSS/OSS <span className="italic">Capabilities</span>
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                activeService === index
                  ? 'bg-white dark:bg-gray-700 shadow-lg scale-105'
                  : 'bg-white/50 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h4 className="font-bold text-lg mb-2">{service.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {service.description}
              </p>
              {activeService === index && (
                <div className="text-xs text-gray-500 dark:text-gray-300 animate-fade-in">
                  {service.details}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold">Real-Time Convergent</h4>
            <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold">EMS</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-4">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Currently loading: <span className="font-semibold text-red-500">{services[activeService].name}</span>
          </p>
        </div>

        {/* Signup Section */}
        <div className="text-center">
          {!showSignup ? (
            <Button 
              onClick={() => setShowSignup(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg rounded-lg"
            >
              Get Started with Our Services
            </Button>
          ) : (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg animate-fade-in">
              <h4 className="text-xl font-bold mb-4">Sign Up for Updates</h4>
              <form onSubmit={handleSignup} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white"
                  required
                />
                <div className="flex space-x-3">
                  <Button 
                    type="submit" 
                    className="bg-red-500 hover:bg-red-600 text-white flex-1"
                  >
                    Sign Up
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowSignup(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
