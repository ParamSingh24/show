import { useState } from 'react';
import RippleText from './RippleText';
import { Button } from "@/components/ui/button";

const InteractiveSection = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = {
    reports: {
      title: 'Reports',
      image: '/lovable-uploads/f0d9bad5-0b73-442e-9df4-1d781d3a8adf.png',
      elements: [
        { type: 'card', content: 'Business overview report', position: 'top-left' },
        { type: 'notification', content: 'Mark Bosman: @Megan let\'s talk about a strategy to improve these metrics.', position: 'top-right' },
        { type: 'share', content: 'Send to PDF, WhatsApp, Word, Slack, Excel, Teams, Email, Shared URL', position: 'bottom-right' }
      ]
    },
    forecasts: {
      title: 'Forecasts',
      image: '/lovable-uploads/3a163f30-448e-44e0-b131-2124183d65de.png',
      elements: [
        { type: 'invoice', content: 'Invoices table with customer data', position: 'center-left' },
        { type: 'metrics', content: 'Today $3,296, Next 8-30 days $100,548', position: 'top-right' },
        { type: 'chart', content: 'Financial forecasting chart', position: 'bottom-right' },
        { type: 'cash', content: 'Cash runway 6 months', position: 'bottom-left' },
        { type: 'overdue', content: 'Overdue $1,498', position: 'bottom-center' }
      ]
    },
    dashboards: {
      title: 'Dashboards',
      image: '/lovable-uploads/e048a8d8-f65a-4c76-8230-5db759e92e85.png',
      elements: [
        { type: 'expenses', content: 'Expenses $56.2K with pie chart breakdown', position: 'bottom-left' },
        { type: 'income', content: 'Total income 36.5% $426.8K', position: 'top-right' },
        { type: 'cash', content: 'Cash 202.9% $288,721', position: 'bottom-right' }
      ]
    },
    consolidations: {
      title: 'Consolidations',
      image: '/lovable-uploads/95785133-edb3-4dbd-b002-3fbeda4afdb9.png',
      elements: [
        { type: 'global', content: 'Global Finance with CU flag', position: 'top-center' },
        { type: 'branches', content: 'US Branch and AUS Branch', position: 'center' },
        { type: 'locations', content: 'Texas and California offices', position: 'bottom-center' },
        { type: 'integrations', content: 'QuickBooks + Xero + Sage', position: 'right' }
      ]
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background with dynamic image */}
      <div className="absolute inset-0">
        {activeSection && sections[activeSection as keyof typeof sections] && (
          <img 
            src={sections[activeSection as keyof typeof sections].image}
            alt={sections[activeSection as keyof typeof sections].title}
            className="w-full h-full object-cover opacity-30 transition-all duration-700"
          />
        )}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 text-white/80 text-sm mb-8">
            <span>★ 4.8 rating on Capterra</span>
            <span>★ 4.8 rating on G2</span>
            <span>★ 350+ reviews on Xero</span>
            <span>★ 550+ reviews on QuickBooks</span>
          </div>
          
          <h2 className="text-6xl md:text-8xl font-bold text-white leading-tight">
            Create reports, forecasts,<br />
            dashboards & consolidations
          </h2>
          
          <div className="flex items-center justify-center space-x-2 mt-8 text-white">
            <span className="text-yellow-400">✨</span>
            <span className="text-xl">Now with AI-insights</span>
          </div>
        </div>

        {/* Interactive Text Section */}
        <div className="text-center mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="flex flex-col items-center">
                <span className="mb-3 text-2xl md:text-3xl font-semibold text-white">
                  {section.title}
                </span>
                <Button
                  variant="default"
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${activeSection === key ? 'bg-yellow-400 text-blue-900 scale-105' : 'bg-white/90 text-blue-900 hover:bg-yellow-200'}`}
                  onMouseEnter={() => setActiveSection(key)}
                  onMouseLeave={() => setActiveSection(null)}
                  onFocus={() => setActiveSection(key)}
                  onBlur={() => setActiveSection(null)}
                >
                  {section.title}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Elements */}
        <div className="relative h-96">
          {activeSection && sections[activeSection as keyof typeof sections] && (
            <div className="absolute inset-0">
              {sections[activeSection as keyof typeof sections].elements.map((element, index) => (
                <div
                  key={index}
                  className={`absolute bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-scale-in ${
                    element.position === 'top-left' ? 'top-0 left-0' :
                    element.position === 'top-right' ? 'top-0 right-0' :
                    element.position === 'top-center' ? 'top-0 left-1/2 transform -translate-x-1/2' :
                    element.position === 'center-left' ? 'top-1/2 left-0 transform -translate-y-1/2' :
                    element.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                    element.position === 'right' ? 'top-1/2 right-0 transform -translate-y-1/2' :
                    element.position === 'bottom-left' ? 'bottom-0 left-0' :
                    element.position === 'bottom-center' ? 'bottom-0 left-1/2 transform -translate-x-1/2' :
                    element.position === 'bottom-right' ? 'bottom-0 right-0' :
                    'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    maxWidth: '280px'
                  }}
                >
                  <div className="text-sm font-medium text-gray-800 dark:text-white">
                    {element.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mt-16">
          <button className="bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 mr-4">
            Start 14-day free trial →
          </button>
          <button className="text-white hover:text-blue-300 font-semibold transition-colors duration-300">
            📅 See what we do
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSection;
