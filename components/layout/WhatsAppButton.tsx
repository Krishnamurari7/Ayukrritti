"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface WhatsAppButtonProps {
  whatsappNumber?: string;
}

export function WhatsAppButton({ whatsappNumber = "919876543210" }: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultMessage = "Hello! I'm interested in your Ayurvedic products.";
  
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        
        {/* Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 whitespace-nowrap bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          Chat with us on WhatsApp
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </button>
    </div>
  );
}
