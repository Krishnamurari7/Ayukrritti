import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Divyaarth",
  description: "Read the terms and conditions for using Divyaarth website and purchasing our Ayurvedic products.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Last Updated */}
          <div className="mb-8 text-sm text-gray-600">
            <p>Last Updated: February 2, 2026</p>
          </div>

          {/* Introduction */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Introduction</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to Divyaarth Ayurveda & Wellness Private Limited (&quot;Divyaarth,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website www.divyaarth.com and the purchase of our products.
              </p>
              <p>
                By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or services.
              </p>
              <p className="font-semibold">
                Please read these Terms carefully along with our Privacy Policy, Shipping Policy, Refund Policy, and Cancellation Policy.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Eligibility</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To use our services and purchase products, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into a binding contract</li>
                <li>Provide accurate and complete information during registration and checkout</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p>
                By using our website, you represent and warrant that you meet all eligibility requirements.
              </p>
            </div>
          </section>

          {/* Account Registration */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Account Registration</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To place orders and access certain features, you may need to create an account. When creating an account:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You must provide accurate, current, and complete information</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
              </ul>
            </div>
          </section>

          {/* Product Information */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Product Information and Pricing</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900">4.1 Product Descriptions</h3>
              <p>
                We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.2 Pricing</h3>
              <p>
                All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. Price changes will not affect orders already placed.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">4.3 Product Availability</h3>
              <p>
                Product availability is subject to change. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion.
              </p>
            </div>
          </section>

          {/* Ordering and Payment */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Ordering and Payment</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900">5.1 Order Placement</h3>
              <p>
                By placing an order, you make an offer to purchase the products. We reserve the right to accept or decline your order for any reason. Order confirmation does not guarantee acceptance.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">5.2 Payment Methods</h3>
              <p>
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Credit/Debit Cards (Visa, Mastercard, Rupay, American Express)</li>
                <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                <li>Net Banking</li>
                <li>Digital Wallets</li>
                <li>Cash on Delivery (COD) - subject to availability</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">5.3 Payment Security</h3>
              <p>
                All payment transactions are processed through secure payment gateways. We do not store your complete payment card information on our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">5.4 Order Acceptance</h3>
              <p>
                Your order is accepted when we send you a shipping confirmation email. We may refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud.
              </p>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Shipping and Delivery</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Shipping and delivery are governed by our Shipping Policy. By placing an order, you agree to the terms outlined in the Shipping Policy.
              </p>
              <p>
                We are not responsible for delays caused by courier services, natural disasters, or other circumstances beyond our control.
              </p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Returns, Refunds, and Cancellations</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Returns, refunds, and cancellations are governed by our Refund Policy and Cancellation Policy. Please review these policies before making a purchase.
              </p>
            </div>
          </section>

          {/* Product Usage */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Product Usage and Disclaimer</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">⚠️ Important Medical Disclaimer</h3>
                <p className="text-gray-700 mb-3">
                  Our Ayurvedic products are meant to support health and wellness. They are not intended to diagnose, treat, cure, or prevent any disease.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Consult with a qualified healthcare provider before using our products, especially if you are pregnant, nursing, have a medical condition, or are taking medications</li>
                  <li>Do not exceed the recommended dosage</li>
                  <li>Discontinue use and consult a doctor if adverse reactions occur</li>
                  <li>Keep products out of reach of children</li>
                  <li>Results may vary from person to person</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Intellectual Property Rights</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                All content on this website, including text, graphics, logos, images, videos, and software, is the property of Divyaarth or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproduce, distribute, modify, or create derivative works from our content</li>
                <li>Use our trademarks or logos without written permission</li>
                <li>Copy or scrape product information for commercial purposes</li>
                <li>Frame or link to our website in a misleading manner</li>
              </ul>
            </div>
          </section>

          {/* User Conduct */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. User Conduct</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the website for any unlawful purpose</li>
                <li>Impersonate any person or entity</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Post false or misleading reviews</li>
                <li>Engage in fraudulent transactions</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Limitation of Liability</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To the maximum extent permitted by law, Divyaarth shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, revenue, or data</li>
                <li>Interruption of business or service</li>
                <li>Damages arising from use or inability to use our products or website</li>
                <li>Adverse reactions or side effects from product use</li>
              </ul>
              <p className="mt-4">
                Our total liability for any claim shall not exceed the amount paid by you for the product(s) in question.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Indemnification</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You agree to indemnify and hold harmless Divyaarth, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your violation of these Terms</li>
                <li>Your use of our products or website</li>
                <li>Your violation of any third-party rights</li>
                <li>Your fraudulent or illegal activities</li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Governing Law and Dispute Resolution</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900">13.1 Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">13.2 Jurisdiction</h3>
              <p>
                Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6">13.3 Dispute Resolution</h3>
              <p>
                We encourage you to contact our customer support to resolve any issues amicably before pursuing legal action.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">14. Changes to Terms</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page with an updated &quot;Last Updated&quot; date.
              </p>
              <p>
                Your continued use of the website after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </div>
          </section>

          {/* Severability */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">15. Severability</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">16. Contact Information</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-gray-900 font-semibold mb-3">
                  Divyaarth Ayurveda & Wellness Private Limited
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  <a 
                    href="mailto:support@divyaarth.com" 
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    support@divyaarth.com
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
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span> C-56/11, Sector-62, Noida, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
