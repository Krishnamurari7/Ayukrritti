import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Divyaarth",
  description: "Learn about our shipping process, delivery times, and shipping charges for Divyaarth products across India.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Fast and reliable delivery of Ayurvedic wellness products to your doorstep
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
                At Divyaarth, we are committed to delivering your orders quickly and safely. This Shipping Policy outlines our shipping process, delivery timelines, and charges.
              </p>
              <p>
                We currently ship to all serviceable locations across India through trusted courier partners.
              </p>
            </div>
          </section>

          {/* Shipping Coverage */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Coverage</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Domestic Shipping (India)
                </h3>
                <p className="text-gray-700">
                  We ship to all pin codes serviced by our courier partners across India, including metro cities, tier-2 cities, and remote areas.
                </p>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  International Shipping
                </h3>
                <p className="text-gray-700">
                  Currently, we do not offer international shipping. We are working on expanding our services globally. Stay tuned!
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Timeline */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Delivery Timeline</h2>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                Delivery times vary based on your location and product availability:
              </p>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Metro Cities</h3>
                    <span className="text-green-600 font-semibold">3-5 Business Days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Tier-2 Cities</h3>
                    <span className="text-green-600 font-semibold">5-7 Business Days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    State capitals and major cities
                  </p>
                </div>

                <div className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">Remote Areas</h3>
                    <span className="text-green-600 font-semibold">7-10 Business Days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Rural areas, hill stations, and remote locations
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> These are estimated delivery times and may vary due to unforeseen circumstances, weather conditions, festivals, or courier delays. Orders are typically processed within 1-2 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Shipping Charges */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Charges</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-green-900 mb-3">
                  🎉 Free Shipping on Orders Above ₹499
                </h3>
                <p className="text-gray-700">
                  Enjoy free delivery across India on all orders totaling ₹499 or more!
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Standard Shipping Charges
                </h3>
                <p className="text-gray-700 mb-3">
                  For orders below ₹499, the following shipping charges apply:
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Orders up to ₹299</span>
                    <span className="font-semibold text-gray-900">₹60</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Orders ₹300 - ₹498</span>
                    <span className="font-semibold text-gray-900">₹40</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Order Processing */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Processing</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Order Confirmation
                </h3>
                <p className="text-gray-700">
                  Once your order is placed, you&apos;ll receive an order confirmation email with your order details and order number.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Order Processing Time
                </h3>
                <p className="text-gray-700">
                  Orders are processed within 1-2 business days (Monday to Saturday, excluding public holidays). Orders placed on weekends or holidays will be processed on the next business day.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Shipping Confirmation
                </h3>
                <p className="text-gray-700">
                  Once your order is shipped, you&apos;ll receive a shipping confirmation email with tracking details. You can track your order using the tracking number provided.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Track Your Order
                </h3>
                <p className="text-gray-700">
                  You can track your order status by logging into your account or using the tracking link sent to your email/SMS.
                </p>
              </div>
            </div>
          </section>

          {/* Delivery Partners */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Delivery Partners</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                We work with trusted courier partners to ensure safe and timely delivery:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold text-gray-900">Blue Dart</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold text-gray-900">Delhivery</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold text-gray-900">DTDC</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold text-gray-900">Shiprocket</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * The courier partner is assigned based on serviceability and fastest delivery to your location.
              </p>
            </div>
          </section>

          {/* Delivery Issues */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Delivery Issues</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Failed Delivery Attempts
                </h3>
                <p className="text-gray-700">
                  If the courier is unable to deliver your order, they will make up to 3 delivery attempts. Please ensure someone is available to receive the package or provide delivery instructions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delayed Delivery
                </h3>
                <p className="text-gray-700">
                  If your order is delayed beyond the estimated delivery time, please contact our customer support with your order number. We&apos;ll work with the courier to expedite delivery.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Damaged or Missing Package
                </h3>
                <p className="text-gray-700">
                  If you receive a damaged package or items are missing, please refuse delivery and contact us immediately with photos. We&apos;ll arrange for a replacement at no additional cost.
                </p>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Notes</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Please ensure your shipping address is accurate and complete. We are not responsible for delays or non-delivery due to incorrect addresses.</li>
                <li>Provide a mobile number for SMS updates on your order status.</li>
                <li>Signature may be required upon delivery for high-value orders.</li>
                <li>We do not deliver to PO Box addresses.</li>
                <li>Orders cannot be redirected to another address once shipped.</li>
                <li>If you&apos;re unavailable, you can authorize someone else to receive the delivery on your behalf.</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help with Shipping?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                For any shipping-related queries, contact our customer support:
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
                  <span className="font-medium">Support Hours:</span> Monday - Saturday, 10:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
