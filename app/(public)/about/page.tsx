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

export const metadata: Metadata = {
  title: "About Us - Aarogya India | Authentic Ayurvedic Products & Wellness",
  description:
    "Discover Aarogya India - Your trusted source for 100% authentic Ayurvedic products. Learn about our mission, values, and commitment to holistic wellness.",
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
  // Static content data
  const heroContent = {
    title: "Bringing Ancient Ayurvedic Wisdom to Modern Lives",
    description: "For over 25 years, Aarogya India has been dedicated to providing authentic, high-quality Ayurvedic products and wellness solutions that promote holistic health.",
    features: ["100% Natural Products", "Expert Consultations", "Pan-India Delivery"],
  };

  const storyContent = {
    title: "Our Story",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=600&h=600&fit=crop",
    paragraphs: [
      "Aarogya India was founded in 1999 by Dr. Ramesh Sharma, a visionary Ayurvedic physician with a dream to make authentic Ayurvedic healthcare accessible to everyone.",
      "What started as a small clinic in Delhi has grown into a trusted wellness brand with multiple centers across India, serving thousands of customers who believe in the power of natural healing.",
      "Our commitment to quality, authenticity, and customer satisfaction has made us one of the most respected names in the Ayurvedic wellness industry.",
    ],
  };

  const ctaContent = {
    title: "Start Your Wellness Journey Today",
    description: "Experience the power of authentic Ayurveda. Book a free consultation with our experts or explore our range of natural products.",
    buttons: [
      { text: "Book Free Consultation", link: "/contact" },
      { text: "Explore Products", link: "/products" },
    ],
  };

  const stats: Array<{ icon: any; value: string; label: string }> = [];
  const values: Array<{ icon: any; title: string; description: string }> = [];
  const centers: Array<any> = [];
  const achievements: Array<any> = [];
  const team: Array<any> = [];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {heroContent.title}
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {heroContent.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-10 w-10 mx-auto mb-3 text-[#1a8f4a]" />
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16 bg-green-50/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                {storyContent.title}
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {storyContent.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden">
              <Image
                src={storyContent.image}
                alt={storyContent.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at Aarogya India
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow group"
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#1a8f4a]/10 rounded-full flex items-center justify-center group-hover:bg-[#1a8f4a] transition-colors">
                    <value.icon className="h-8 w-8 text-[#1a8f4a] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Centers Section */}
      <section id="centers" className="py-12 md:py-16 bg-green-50/50 scroll-mt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Centers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our wellness centers for personalized consultations and
              authentic Ayurvedic treatments
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {centers.map((center) => (
              <Card
                key={center.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative aspect-video sm:aspect-square">
                    <Image
                      src={center.image}
                      alt={center.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-5 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-3 text-[#1a8f4a]">
                      {center.name}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#1a8f4a]" />
                        <span>{center.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0 text-[#1a8f4a]" />
                        <span>{center.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 text-[#1a8f4a]" />
                        <span>{center.timing}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {center.services.map((service: string) => (
                        <span
                          key={service}
                          className="px-2 py-1 bg-[#1a8f4a]/10 text-[#1a8f4a] text-xs rounded-full"
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
      <section id="achievements" className="py-12 md:py-16 scroll-mt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Milestones that mark our journey of excellence in Ayurvedic
              wellness
            </p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1a8f4a]/20 transform md:-translate-x-1/2" />

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.year}
                  className={`relative flex items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[#1a8f4a] rounded-full transform -translate-x-1/2 z-10 ring-4 ring-white" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Card className="inline-block hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <div
                          className={`flex items-center gap-3 mb-2 ${
                            index % 2 === 0 ? "md:justify-end" : ""
                          }`}
                        >
                          <achievement.icon className="h-6 w-6 text-[#1a8f4a]" />
                          <span className="text-sm font-bold text-[#1a8f4a]">
                            {achievement.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
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
      <section className="py-12 md:py-16 bg-green-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Meet Our Experts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced Ayurvedic practitioners is dedicated to
              your wellness journey
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card
                key={member.name}
                className="text-center hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-[#1a8f4a] mb-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Star className="h-3 w-3" />
                    {member.experience} Experience
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {ctaContent.title}
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            {ctaContent.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaContent.buttons.map((button: any, index: number) => (
              <a
                key={index}
                href={button.link}
                className={
                  index === 0
                    ? "inline-flex items-center justify-center px-6 py-3 bg-white text-[#1a8f4a] font-semibold rounded-lg hover:bg-green-50 transition-colors"
                    : "inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                }
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
