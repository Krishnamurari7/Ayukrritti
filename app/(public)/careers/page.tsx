import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | Ayukrriti Ayurveda",
  description: "Explore career opportunities at Ayukrriti Ayurveda. Join us in our mission to provide natural Ayurvedic wellness solutions.",
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Ayukrriti Ayurveda</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Join us in our mission to bring natural Ayurvedic wellness to people&apos;s lives
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Why Join Us Section */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join Ayukrriti Ayurveda?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Ayukrriti Ayurveda, we&apos;re not just a company; we&apos;re a family dedicated to making a positive impact on people&apos;s health and wellbeing through authentic Ayurvedic products.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Work with a passionate team committed to natural wellness</li>
                <li>Competitive salary and benefits package</li>
                <li>Opportunities for professional growth and development</li>
                <li>Flexible work environment</li>
                <li>Health and wellness benefits</li>
                <li>Be part of India&apos;s growing Ayurveda industry</li>
              </ul>
            </div>
          </section>

          {/* Current Openings Section */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Openings</h2>
            
            <div className="space-y-6">
              {/* Job Opening 1 */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Digital Marketing Executive
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> Noida, Uttar Pradesh
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Experience:</span> 2-4 years
                </p>
                <p className="text-gray-700 mb-3">
                  We&apos;re looking for a creative and analytical digital marketing professional to help us expand our online presence and reach more customers.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="/contact?subject=Career: Digital Marketing Executive"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>

              {/* Job Opening 2 */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  E-commerce Operations Manager
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> Noida, Uttar Pradesh
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Experience:</span> 3-5 years
                </p>
                <p className="text-gray-700 mb-3">
                  Manage our e-commerce operations, inventory, fulfillment, and customer service to ensure seamless customer experiences.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="/contact?subject=Career: E-commerce Operations Manager"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>

              {/* Job Opening 3 */}
              <div className="border-l-4 border-green-600 pl-6 py-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Product Development Executive (Ayurveda)
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Location:</span> Noida, Uttar Pradesh
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Experience:</span> 3-6 years
                </p>
                <p className="text-gray-700 mb-3">
                  Join our R&D team to develop new Ayurvedic formulations and improve existing products. Knowledge of Ayurveda and pharmaceuticals required.
                </p>
                <div className="flex gap-4">
                  <Link 
                    href="/contact?subject=Career: Product Development Executive"
                    className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* How to Apply Section */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you&apos;re passionate about Ayurveda and natural wellness, we&apos;d love to hear from you!
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Send your resume and cover letter to:
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  <a 
                    href="mailto:careers@ayukrriti.com" 
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    careers@ayukrriti.com
                  </a>
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Subject Line:</span> Application for [Position Name]
                </p>
                <p className="text-sm text-gray-600">
                  Please include the position you&apos;re applying for in the subject line. We&apos;ll review your application and get back to you within 2-3 weeks.
                </p>
              </div>
            </div>
          </section>

          {/* Internship Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Internship Opportunities</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We also offer internship programs for students and fresh graduates interested in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Digital Marketing</li>
                <li>Content Writing</li>
                <li>Graphic Design</li>
                <li>Business Development</li>
                <li>Operations Management</li>
              </ul>
              <p className="mt-4">
                Internships typically last 3-6 months and include a stipend. To apply, send your resume to{" "}
                <a 
                  href="mailto:internships@ayukrriti.com" 
                  className="text-green-600 hover:text-green-700 underline font-medium"
                >
                  internships@ayukrriti.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
