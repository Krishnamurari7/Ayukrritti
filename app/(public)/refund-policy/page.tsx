import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Divyaarth",
  description: "Understand our refund policy for Divyaarth products. Learn about refund eligibility, process, and timelines.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Your satisfaction is our priority. Learn about our refund process.
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

          {/* Overview */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                At Divyaarth, we strive to ensure complete customer satisfaction with our Ayurvedic products. If you&apos;re not satisfied with your purchase, we&apos;re here to help.
              </p>
              <p>
                This Refund Policy outlines the conditions under which refunds are processed, the timeline, and the procedure to request a refund.
              </p>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Refund Eligibility</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Defective or Damaged Products
                </h3>
                <p className="text-gray-700">
                  If you receive a product that is defective, damaged, or not as described, you are eligible for a full refund or replacement. This must be reported within 7 days of delivery.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wrong Product Delivered
                </h3>
                <p className="text-gray-700">
                  If you receive an incorrect product, we will arrange for a replacement or provide a full refund at no additional cost.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unopened Products
                </h3>
                <p className="text-gray-700">
                  Unopened products with intact seals can be returned within 7 days of delivery for a full refund (excluding shipping charges).
                </p>
              </div>

              <div className="border-l-4 border-red-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Non-Refundable Items
                </h3>
                <p className="text-gray-700">
                  The following items are NOT eligible for refund:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4 text-gray-700">
                  <li>Opened or used products (due to hygiene and safety reasons)</li>
                  <li>Products with broken or tampered seals</li>
                  <li>Products purchased during clearance or special sales (unless defective)</li>
                  <li>Gift cards or vouchers</li>
                  <li>Products returned after 7 days of delivery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Request a Refund</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 1: Contact Customer Support
                </h3>
                <p className="text-gray-700 mb-2">
                  Email us at{" "}
                  <a 
                    href="mailto:support@divyaarth.com" 
                    className="text-green-600 hover:text-green-700 underline font-medium"
                  >
                    support@divyaarth.com
                  </a>
                  {" "}or call{" "}
                  <a 
                    href="tel:+919220229066" 
                    className="text-green-600 hover:text-green-700 underline font-medium"
                  >
                    +91-9220229066
                  </a>
                </p>
                <p className="text-gray-700">
                  Include your order number, reason for refund, and photos of the product (if defective/damaged).
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 2: Return Authorization
                </h3>
                <p className="text-gray-700">
                  Our customer support team will review your request and provide a Return Authorization Number (RAN) if approved. Do not ship the product back without this authorization.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 3: Ship the Product Back
                </h3>
                <p className="text-gray-700 mb-2">
                  Pack the product securely in its original packaging (if possible) and ship it to the address provided by our support team.
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Note:</span> For defective or wrong products, we will cover the return shipping costs. For other returns, customers are responsible for return shipping.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Step 4: Inspection & Refund Processing
                </h3>
                <p className="text-gray-700">
                  Once we receive the returned product, we will inspect it within 2-3 business days. If approved, your refund will be processed.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Timeline */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Refund Timeline</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Once your return is received and approved, your refund will be processed according to the original payment method:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-900">Credit/Debit Card</span>
                  <span className="text-gray-700">5-7 business days</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-900">UPI/Net Banking</span>
                  <span className="text-gray-700">3-5 business days</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-900">Wallet (Paytm, PhonePe, etc.)</span>
                  <span className="text-gray-700">2-3 business days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                  <span className="text-gray-700">7-10 business days (bank transfer)</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                * The timeline may vary depending on your bank or payment provider.
              </p>
            </div>
          </section>

          {/* Partial Refunds */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Partial Refunds</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In certain situations, partial refunds may be granted:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products with obvious signs of use beyond inspection</li>
                <li>Products returned without original packaging or accessories</li>
                <li>Products returned after the 7-day return window (at our discretion)</li>
                <li>Products damaged due to mishandling during return shipping (not properly packaged)</li>
              </ul>
            </div>
          </section>

          {/* Exchanges */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exchanges</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We offer product exchanges in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Defective or damaged products</li>
                <li>Wrong product delivered</li>
                <li>Size or variant issues (if applicable)</li>
              </ul>
              <p className="mt-4">
                To request an exchange, follow the same process as refunds. Once we receive and inspect the returned product, we will ship the replacement at no additional cost.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you have any questions about our Refund Policy, please contact us:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
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
                  <span className="font-medium">Address:</span> C-56/11, Sector-62, Noida, Uttar Pradesh
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
