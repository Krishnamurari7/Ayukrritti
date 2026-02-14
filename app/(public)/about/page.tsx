import Image from "next/image";
import {
  Award,
  Users,
  Leaf,
  Heart,
  MapPin,
  Phone,
  Clock,
  Star,
  CheckCircle,
  Target,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AboutStoryImage } from "@/components/about-story-image";

export const metadata: Metadata = {
  title: "About Us - Ayukrriti Ayurveda | Authentic Ayurvedic Products & Wellness",
  description:
    "Discover Ayukrriti Ayurveda - Your trusted source for 100% authentic Ayurvedic products. Learn about our mission, values, and commitment to holistic wellness.",
};

// Icon mapping helper
const iconMap: Record<string, any> = {
  Users,
  Leaf,
  Award,
  Heart,
  MapPin,
  CheckCircle,
  Target,
  Shield,
  Phone,
  Clock,
  Star,
};

const getIcon = (iconName: string) => iconMap[iconName] || Leaf;

export default async function AboutPage() {
  const supabase = await createClient();

  // Fetch content sections (hero, story, cta)
  const { data: contentData } = await supabase
    .from("about_content")
    .select("*")
    .eq("is_active", true);

  // Default content
  let heroContent = {
    title: "Bringing Ancient Ayurvedic Wisdom to Modern Lives",
    description: "For over 25 years, Ayukrriti Ayurveda has been dedicated to providing authentic, high-quality Ayurvedic products and wellness solutions that promote holistic health.",
    features: ["100% Natural Products", "Expert Consultations", "Pan-India Delivery"],
  };

  let storyContent = {
    title: "Our Story",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop",
    paragraphs: [
      "Ayukrriti Ayurveda was founded in 1999 by Dr. Ramesh Sharma, a visionary Ayurvedic physician with a dream to make authentic Ayurvedic healthcare accessible to everyone.",
      "What started as a small clinic in Delhi has grown into a trusted wellness brand with multiple centers across India, serving thousands of customers who believe in the power of natural healing.",
      "Our commitment to quality, authenticity, and customer satisfaction has made us one of the most respected names in the Ayurvedic wellness industry.",
    ],
  };

  let ctaContent = {
    title: "Start Your Wellness Journey Today",
    description: "Experience the power of authentic Ayurveda. Book a free consultation with our experts or explore our range of natural products.",
    buttons: [
      { text: "Book Free Consultation", link: "/contact" },
      { text: "Explore Products", link: "/products" },
    ],
  };

  // Parse content from database
  if (contentData) {
    contentData.forEach((item) => {
      if (item.section_key === "hero" && item.content) {
        heroContent = item.content;
      } else if (item.section_key === "story" && item.content) {
        storyContent = item.content;
      } else if (item.section_key === "cta" && item.content) {
        ctaContent = item.content;
      }
    });
  }

  // Fetch stats
  const { data: statsData } = await supabase
    .from("about_stats")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const stats = (statsData || []).map((stat) => ({
    ...stat,
    icon: getIcon(stat.icon),
  }));

  // Fetch values
  const { data: valuesData } = await supabase
    .from("about_values")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const values = (valuesData || []).map((value) => ({
    ...value,
    icon: getIcon(value.icon),
  }));

  // Fetch centers
  const { data: centersData } = await supabase
    .from("about_centers")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const centers = centersData || [];

  // Fetch achievements
  const { data: achievementsData } = await supabase
    .from("about_achievements")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const achievements = (achievementsData || []).map((achievement) => ({
    ...achievement,
    icon: getIcon(achievement.icon),
  }));

  // Fetch team
  const { data: teamData } = await supabase
    .from("about_team")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  const team = teamData || [];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a8f4a] via-green-800 to-[#D4AF37] text-white py-20 md:py-28 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                🌿 About Ayukrriti Ayurveda
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {heroContent.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {(heroContent.features || []).map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-full border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg">
                  <CheckCircle className="h-6 w-6 text-[#D4AF37]" />
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 premium-card border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl overflow-hidden group">
                <CardContent className="p-8 bg-gradient-to-br from-white to-gray-50 relative">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <stat.icon className="h-12 w-12 mx-auto mb-4 text-[#D4AF37] group-hover:scale-125 transition-transform duration-300" />
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#F4E4B7] to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#1a8f4a]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-block mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                  📖 Our Journey
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-[#1a8f4a]">
                {storyContent.title}
              </h2>
              <div className="space-y-5 text-gray-700 text-base md:text-lg leading-relaxed">
                {(storyContent.paragraphs || []).map((paragraph: string, index: number) => (
                  <p key={index} className="pl-4 border-l-4 border-[#D4AF37]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37] group">
              {storyContent.image ? (
                <AboutStoryImage
                  src={storyContent.image}
                  alt={storyContent.title || "Our Story"}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#F4E4B7] to-white flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1a8f4a]/30 to-transparent group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block mb-6">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                💎 Our Core Values
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These core values guide everything we do at Ayukrriti Ayurveda
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 premium-card border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl overflow-hidden group"
              >
                <CardContent className="p-8 bg-gradient-to-br from-white to-gray-50 relative">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-[#F4E4B7] to-white rounded-full flex items-center justify-center border-4 border-[#D4AF37] shadow-lg group-hover:scale-125 transition-transform duration-500">
                      <value.icon className="h-10 w-10 text-[#1a8f4a]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#1a8f4a] group-hover:text-[#D4AF37] transition-colors">{value.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Centers Section */}
      <section id="centers" className="py-16 md:py-20 bg-gradient-to-br from-[#F4E4B7] to-white scroll-mt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block mb-6">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                📍 Visit Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Our Centers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Visit our wellness centers for personalized consultations and
              authentic Ayurvedic treatments
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {centers.map((center) => (
              <Card
                key={center.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 premium-card border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl group"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative aspect-video sm:aspect-square overflow-hidden">
                    <Image
                      src={center.image}
                      alt={center.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1a8f4a]/40 to-transparent"></div>
                  </div>
                  <CardContent className="p-6 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                    <h3 className="text-xl font-bold mb-4 text-[#1a8f4a] group-hover:text-[#D4AF37] transition-colors">
                      {center.name}
                    </h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-[#D4AF37]" />
                        <span className="font-medium">{center.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                        <span className="font-medium">{center.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                        <span className="font-medium">{center.timing}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {(center.services || []).map((service: string) => (
                        <span
                          key={service}
                          className="px-3 py-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-xs font-semibold rounded-full shadow-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 md:py-20 scroll-mt-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block mb-6">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                🏆 Milestones
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              Our Achievements
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Milestones that mark our journey of excellence in Ayurvedic
              wellness
            </p>
          </div>
          <div className="relative">
            {/* Timeline line - Enhanced with gradient */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#1a8f4a] to-[#D4AF37] transform md:-translate-x-1/2 rounded-full shadow-lg" />

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot - Enhanced with gradient and animation */}
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full transform -translate-x-1/2 z-10 ring-4 ring-white shadow-xl animate-pulse" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Card className="inline-block hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 premium-card border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl overflow-hidden group">
                      <CardContent className="p-7 bg-gradient-to-br from-white to-gray-50 relative">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10">
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              index % 2 === 0 ? "md:justify-end" : ""
                            }`}
                          >
                            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <achievement.icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-lg font-bold text-[#D4AF37]">
                              {achievement.year}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-[#1a8f4a]">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#F4E4B7] to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block mb-6">
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-full text-sm font-bold shadow-lg">
                👨‍⚕️ Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our team of experienced Ayurvedic practitioners is dedicated to
              your wellness journey
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <Card
                key={member.id || member.name}
                className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 premium-card overflow-hidden group border-2 border-gray-100 hover:border-[#D4AF37] rounded-3xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardContent className="p-7 bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-base text-[#D4AF37] font-semibold mb-3">{member.role}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/20 rounded-full">
                    <Star className="h-4 w-4 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="text-sm font-bold text-gray-700">{member.experience} Experience</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#1a8f4a] via-green-800 to-[#D4AF37] text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="inline-block px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold shadow-lg border border-white/30">
              🚀 Get Started
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
            {ctaContent.title}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {ctaContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {(ctaContent.buttons || []).map((button: any, index: number) => (
              <a
                key={index}
                href={button.link}
                className={
                  index === 0
                    ? "inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-xl hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform text-lg"
                    : "inline-flex items-center justify-center px-8 py-4 border-3 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#1a8f4a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-lg"
                }
              >
                {button.text}
                <span className="ml-2">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
