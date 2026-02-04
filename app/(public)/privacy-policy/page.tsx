import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Ayukrriti Ayurveda",
  description: "Learn how Ayukrriti Ayurveda collects, uses, and protects your personal information. Our commitment to your privacy.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Your privacy is important to us. Learn how we protect your information.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Welcome to Ayukrriti Ayurveda Ayurveda & Wellness Private Limited (&quot;Ayukrriti Ayurveda,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). We are committed to protecting your personal information and your right to privacy.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.ayukrriti.com and use our services.
              </p>
              <p>
                By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Personal Information
                </h3>
                <p className="text-gray-700 mb-2">
                  When you register, place an order, or contact us, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely through payment gateways)</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Automatically Collected Information
                </h3>
                <p className="text-gray-700 mb-2">
                  When you visit our website, we automatically collect:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Cookies and Tracking Technologies
                </h3>
                <p className="text-gray-700">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings in your browser.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Communicate with you about products, services, and promotions</li>
                <li>Respond to customer service requests and support needs</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage trends and preferences</li>
                <li>Detect and prevent fraud or security issues</li>
                <li>Comply with legal obligations</li>
                <li>Send newsletters and marketing communications (with your consent)</li>
              </ul>
            </div>
          </section>

          {/* Sharing Your Information */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Sharing Your Information</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                  <p className="text-gray-700 text-sm">
                    Payment processors, shipping companies, and email service providers who help us operate our business.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                  <p className="text-gray-700 text-sm">
                    Government authorities when required by law or to protect our rights and safety.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                  <p className="text-gray-700 text-sm">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p>
                These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure payment processing through certified payment gateways</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You have the following rights regarding your personal information:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1">✓</div>
                  <div>
                    <span className="font-semibold">Access:</span> Request a copy of the personal information we hold about you
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1">✓</div>
                  <div>
                    <span className="font-semibold">Correction:</span> Request correction of inaccurate or incomplete information
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1">✓</div>
                  <div>
                    <span className="font-semibold">Deletion:</span> Request deletion of your personal information (subject to legal obligations)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1">✓</div>
                  <div>
                    <span className="font-semibold">Opt-out:</span> Unsubscribe from marketing emails at any time
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-600 mt-1">✓</div>
                  <div>
                    <span className="font-semibold">Portability:</span> Request transfer of your data to another service provider
                  </div>
                </div>
              </div>

              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a 
                  href="mailto:privacy@ayukrriti.com" 
                  className="text-green-600 hover:text-green-700 underline font-medium"
                >
                  privacy@ayukrriti.com
                </a>
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Retention</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p>
                When your information is no longer required, we will securely delete or anonymize it.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Children&apos;s Privacy</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Links</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
              </p>
              <p>
                Continued use of our services after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="text-gray-900 font-semibold mb-3">
                  Ayukrriti Ayurveda Ayurveda & Wellness Private Limited
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Email:</span>{" "}
                  <a 
                    href="mailto:privacy@ayukrriti.com" 
                    className="text-green-600 hover:text-green-700 underline"
                  >
                    privacy@ayukrriti.com
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
