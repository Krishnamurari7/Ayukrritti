"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_text: string | null;
  cta_link: string | null;
  display_order: number;
  is_active: boolean;
}

interface HeroSliderProps {
  banners: Banner[];
}

export function HeroSlider({ banners }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, banners.length]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyYzU1ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Content - Dynamic from banners */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">100% Pure Ayurvedic</span>
            </div>
            
            {/* Animated content based on current slide */}
            <div key={currentIndex} className="animate-in fade-in slide-in-from-left duration-500">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {banners[currentIndex].title.split(' ').slice(0, 2).join(' ')}
                <span className="block text-green-700">
                  {banners[currentIndex].title.split(' ').slice(2).join(' ')}
                </span>
              </h1>
              
              {banners[currentIndex].subtitle && (
                <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mt-3 sm:mt-4">
                  {banners[currentIndex].subtitle}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {banners[currentIndex].cta_text && banners[currentIndex].cta_link && (
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                  <Link href={banners[currentIndex].cta_link!}>
                    {banners[currentIndex].cta_text}
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
              )}
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="border-2 border-green-600 text-green-700 hover:bg-green-50"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">5000+</p>
                <p className="text-xs sm:text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">100%</p>
                <p className="text-xs sm:text-sm text-gray-600">Natural Products</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-green-700">50+</p>
                <p className="text-xs sm:text-sm text-gray-600">Products</p>
              </div>
            </div>
          </div>

          {/* Right Image - Slider */}
          <div className="relative">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-600/20 z-10"></div>
              
              {/* Slider Images */}
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              {banners.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {banners.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl">
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-gray-900">GMP Certified</p>
                  <p className="text-xs sm:text-sm text-gray-600">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
