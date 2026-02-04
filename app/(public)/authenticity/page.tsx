import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Product Authenticity | Ayukrriti Ayurveda",
  description: "Learn how to verify the authenticity of Ayukrriti Ayurveda products. We ensure 100% genuine Ayurvedic products with quality certifications.",
};

export default function AuthenticityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Product Authenticity</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Your health is our priority. Learn how we ensure 100% authentic Ayurvedic products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Authenticity</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Ayukrriti Ayurveda, we understand that your health and wellbeing depend on the quality and authenticity of the products you consume. That&apos;s why we are committed to providing only 100% genuine, certified Ayurvedic products.
              </p>
              <p>
                Every product that carries the Ayukrriti Ayurveda name has undergone rigorous quality checks and meets the highest standards of Ayurvedic medicine manufacturing.
              </p>
            </div>
          </section>

          {/* Quality Certifications */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quality Certifications</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  GMP Certified Manufacturing
                </h3>
                <p className="text-gray-700">
                  Our manufacturing facilities are certified under Good Manufacturing Practice (GMP) guidelines, ensuring the highest standards of hygiene, quality control, and production processes.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ISO Certified
                </h3>
                <p className="text-gray-700">
                  We maintain ISO 9001:2015 certification for quality management systems, demonstrating our commitment to consistent quality and customer satisfaction.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AYUSH Approved
                </h3>
                <p className="text-gray-700">
                  All our products are manufactured in AYUSH (Ministry of Ayurveda, Yoga & Naturopathy, Unani, Siddha and Homoeopathy) approved facilities and comply with Indian government regulations.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Laboratory Tested
                </h3>
                <p className="text-gray-700">
                  Every batch of our products is tested in NABL accredited laboratories for purity, potency, and safety before reaching you.
                </p>
              </div>
            </div>
          </section>

          {/* How to Verify Authenticity */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Verify Product Authenticity</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 1: Check the Security Seal
                </h3>
                <p className="text-gray-700">
                  Every Ayukrriti Ayurveda product comes with a tamper-proof security seal. If the seal is broken or missing, do not use the product.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 2: Verify Batch Number
                </h3>
                <p className="text-gray-700">
                  Each product has a unique batch number printed on the packaging. You can verify this batch number on our website or by contacting our customer support.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 3: Check Manufacturing Date & Expiry
                </h3>
                <p className="text-gray-700">
                  Ensure the product has a clearly printed manufacturing date and expiry date. Never use products past their expiry date.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 4: QR Code Verification (Coming Soon)
                </h3>
                <p className="text-gray-700">
                  We are implementing QR code-based verification on all products. You&apos;ll soon be able to scan the QR code with your smartphone to instantly verify authenticity.
                </p>
              </div>
            </div>
          </section>

          {/* Sourcing Transparency */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sourcing Transparency</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We believe in complete transparency about where our ingredients come from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All herbs are sourced from certified organic farms or sustainable wild harvesting</li>
                <li>We work directly with farmers and cooperatives to ensure quality from the source</li>
                <li>Every ingredient is traced back to its origin</li>
                <li>We conduct regular audits of our suppliers</li>
                <li>No synthetic additives, preservatives, or harmful chemicals are used</li>
              </ul>
            </div>
          </section>

          {/* Buy Only From Authorized Sellers */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Buy Only From Authorized Sellers</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-gray-900 font-semibold mb-3">⚠️ Important Notice</p>
                <p className="text-gray-700 mb-3">
                  To ensure you receive genuine Ayukrriti Ayurveda products, please purchase only from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our official website: www.ayukrriti.com</li>
                  <li>Authorized retail stores (check our Store Locator)</li>
                  <li>Verified online marketplaces with &quot;Official Store&quot; badge</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We are not responsible for products purchased from unauthorized sellers. Such products may be counterfeit, expired, or improperly stored.
                </p>
              </div>
            </div>
          </section>

          {/* Report Counterfeit */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Report Counterfeit Products</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you suspect you&apos;ve received a counterfeit or tampered product:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-gray-900 font-semibold mb-3">📞 Contact Us Immediately</p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  <a 
                    href="mailto:authenticity@ayukrriti.com" 
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    authenticity@ayukrriti.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Phone:</span>{" "}
                  <a 
                    href="tel:+919220229066" 
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    +91-9220229066
                  </a>
                </p>
                <p className="text-gray-700 mt-4">
                  Please provide photos of the product, packaging, batch number, and details of where you purchased it. Our team will investigate and take appropriate action.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
