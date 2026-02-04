"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface FooterProps {
  settings?: Record<string, any>;
}

export function Footer({ settings = {} }: FooterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get settings with fallback values
  const contactEmail = settings.contact_email || "info@ayukrriti.com";
  const contactPhone = settings.contact_phone || "+91-9220229066";
  const contactAddress = settings.contact_address || "C-56/11, Sector-62, Noida, Uttar Pradesh";
  const companyDescription = settings.company_description || "Treating your health-related issues with our natural remedy products. Just natural ingredients to make you fit and healthy.";
  const companyName = settings.company_name || "Ayukrriti Ayurveda";
  const socialFacebook = settings.social_facebook || "https://facebook.com";
  const socialPinterest = settings.social_pinterest || "https://pinterest.com";
  const socialInstagram = settings.social_instagram || "https://instagram.com";
  const socialYoutube = settings.social_youtube || "https://youtube.com";
  const socialLinkedin = settings.social_linkedin || "https://linkedin.com";

  return (
    <footer className="bg-gradient-to-br from-[#1a8f4a] via-green-900 to-[#157a3d] text-white border-t-4 border-[#D4AF37] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1 - Brand & Contact Info */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image 
                src="/logo.png" 
                alt="Ayukrriti Ayurveda" 
                width={180} 
                height={60}
                className="h-14 w-auto bg-white rounded-lg p-2"
              />
            </div>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              {companyDescription}
            </p>

            {/* Address */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-start gap-3 text-white/90">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{contactAddress}</span>
              </div>
              
              <div className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href={`tel:${contactPhone}`} className="font-semibold hover:text-[#D4AF37] transition-colors">
                  {contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <svg className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${contactEmail}`} className="font-semibold hover:text-[#D4AF37] transition-colors">
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Footer Menu */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span> Footer Menu
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                About Us
              </Link>
              <Link href="/products?category=diabetic-care" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Diabetic Care
              </Link>
              <Link href="/products?category=digestive-care" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Digestive Care
              </Link>
              <Link href="/products?category=health-nutrition" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Health & Nutrition
              </Link>
              <Link href="/products?category=immunity-booster" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Immunity Booster
              </Link>
              <Link href="/blogs" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Blogs
              </Link>
              <Link href="/products" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                All Products
              </Link>
            </nav>
          </div>

          {/* Column 3 - Important Links */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
              <span className="text-xl">🔗</span> Important Links
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/careers" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Contact Us
              </Link>
              <Link href="/authenticity" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Authenticity
              </Link>
              <Link href="/refund-policy" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Refund Policy
              </Link>
              <Link href="/privacy-policy" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/shipping-policy" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Shipping Policy
              </Link>
              <Link href="/cancellation-policy" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Cancellation policy
              </Link>
              <Link href="/terms-and-conditions" className="text-sm sm:text-base text-white/90 font-medium hover:text-[#D4AF37] transition-colors">
                Terms and Conditions
              </Link>
            </nav>
          </div>

          {/* Column 4 - Newsletter Signup */}
          <div className="space-y-5">
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
              <span className="text-xl">💌</span> Sign Up & Save 10%
            </h3>
            <p className="text-sm sm:text-base text-white/90 font-medium">
              Get a 10% discount on your first order.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border-2 border-[#D4AF37] rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#F4E4B7] focus:bg-white/20 transition-all text-sm backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all text-sm shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
              >
                SUBSCRIBE NOW 🎉
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialFacebook && (
                <a
                  href={socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socialPinterest && (
                <a
                  href={socialPinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              {socialInstagram && (
                <a
                  href={socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {socialYoutube && (
                <a
                  href={socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {socialLinkedin && (
                <a
                  href={socialLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>

            {/* Payment Methods */}
            <div className="pt-3">
              <p className="text-sm text-white/90 mb-2 font-bold">We Accept:</p>
              <div className="bg-white/95 rounded-xl p-3 flex items-center justify-center gap-2 flex-wrap shadow-lg">
                <div className="flex items-center">
                  <div className="w-6 h-5 bg-red-500 rounded-full -mr-2 shadow-sm"></div>
                  <div className="w-6 h-5 bg-yellow-400 rounded-full opacity-90 shadow-sm"></div>
                </div>
                <div className="px-2 py-1 bg-[#1a1f71] rounded shadow-sm">
                  <span className="text-[11px] font-bold text-white">VISA</span>
                </div>
                <div className="px-2 py-1 bg-[#006fcf] rounded shadow-sm">
                  <span className="text-[11px] font-bold text-white">AMEX</span>
                </div>
                <div className="px-2 py-1 bg-[#ff6600] rounded shadow-sm">
                  <span className="text-[11px] font-bold text-white">DISCOVER</span>
                </div>
                <div className="flex items-center px-2 py-1 border-2 border-gray-300 rounded shadow-sm">
                  <span className="text-[11px] font-bold">
                    <span className="text-[#003087]">Pay</span>
                    <span className="text-[#009cde]">Pal</span>
                  </span>
                </div>
                <div className="px-2 py-1 border-2 border-gray-300 rounded shadow-sm">
                  <span className="text-[11px] font-bold text-gray-700">GPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t-2 border-[#D4AF37]/30 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <p className="text-sm sm:text-base text-white/90 font-medium text-center md:text-left">
              © {new Date().getFullYear()}, <span className="font-bold text-[#D4AF37]">{companyName}</span>. {companyName} Ayurveda & Wellness Private Limited. All rights reserved.
            </p>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white flex items-center justify-center hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 transform md:absolute md:right-0"
              aria-label="Scroll to top"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
