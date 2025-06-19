
import { useState } from "react";
import { Button } from "@/components/ui/button";

const chatbotData = {
  greetings: ["Hello! How can I help you today?", "Hi there! What would you like to know?"],
  services: "We offer comprehensive BSS/OSS solutions including Billing, Charging infrastructure, Catalog management, and Event systems.",
  projects: "Our portfolio includes Digital Innovation Hub, Sustainable Architecture, AI-Powered Analytics, Cloud Infrastructure, Mobile Experience, and Data Visualization projects.",
  contact: "You can reach us through our contact form or email us at info@company.com",
  default: "I'm here to help! You can ask me about our services, projects, or how to get in touch."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    { text: chatbotData.greetings[0], isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    // Simple keyword-based responses
    let response = chatbotData.default;
    const lowerInput = userMessage.toLowerCase();

    if (lowerInput.includes('service') || lowerInput.includes('billing') || lowerInput.includes('charging')) {
      response = chatbotData.services;
    } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      response = chatbotData.projects;
    } else if (lowerInput.includes('contact') || lowerInput.includes('reach') || lowerInput.includes('email')) {
      response = chatbotData.contact;
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      response = chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)];
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInputValue("");
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg"
      >
        💬
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-red-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Assistant</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-600 p-1 h-auto"
            >
              ✕
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white text-sm"
              />
              <Button type="submit" size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
