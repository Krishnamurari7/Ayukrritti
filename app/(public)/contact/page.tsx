"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Headphones,
  Leaf,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 1800 123 4567 (Toll Free)", "+91 11 2634 5678"],
    color: "bg-green-100 text-[#1a8f4a]",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@aarogyaindia.com", "info@aarogyaindia.com"],
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: MapPin,
    title: "Head Office",
    details: ["A-12, Green Park Extension", "New Delhi - 110016, India"],
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    color: "bg-purple-100 text-purple-600",
  },
];

const faqs = [
  {
    question: "How can I book a consultation with an Ayurvedic expert?",
    answer:
      "You can book a free consultation by filling out the contact form or calling our toll-free number. Our experts will get back to you within 24 hours.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes, we offer Cash on Delivery across India. You can also pay via UPI, Credit/Debit cards, or Net Banking.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unopened products. For quality issues, we provide free replacement within 30 days.",
  },
  {
    question: "Are your products 100% natural?",
    answer:
      "Yes, all our products are made from 100% natural ingredients following authentic Ayurvedic formulations. We are AYUSH Ministry certified.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within India. We are working on expanding our delivery to other countries soon.",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success(
        "Message sent successfully! Our team will contact you soon."
      );
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
            <Headphones className="h-5 w-5" />
            <span className="text-sm">24/7 Customer Support</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Have questions about our products or need expert Ayurvedic advice?
            We're here to help you on your wellness journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-16 mb-12">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-5 text-center">
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-full ${info.color} flex items-center justify-center`}
                >
                  <info.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#1a8f4a]/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-[#1a8f4a]" />
                </div>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your query..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1.5 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1a8f4a] hover:bg-[#157a3d] h-12 text-base"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#1a8f4a]/10 rounded-full flex items-center justify-center">
                <Leaf className="h-5 w-5 text-[#1a8f4a]" />
              </div>
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Contact */}
            <Card className="mt-6 bg-gradient-to-r from-[#1a8f4a] to-[#2d5a27] text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">
                  Need Immediate Help?
                </h3>
                <p className="text-green-100 text-sm mb-4">
                  Call our toll-free helpline for instant support from our
                  wellness experts.
                </p>
                <a
                  href="tel:18001234567"
                  className="inline-flex items-center gap-2 bg-white text-[#1a8f4a] px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  1800 123 4567
                </a>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Find Us Here</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video md:aspect-[3/1] bg-gray-100 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8523456789!2d77.2090!3d28.5574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMzJzI2LjYiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Aarogya India Location"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
