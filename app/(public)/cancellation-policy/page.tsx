import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy | Divyaarth",
  description: "Learn about our order cancellation policy, process, and timelines for Divyaarth products.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cancellation Policy</h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Understand our order cancellation process and timelines
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
                At Divyaarth, we understand that sometimes you may need to cancel your order. This Cancellation Policy outlines the conditions under which orders can be cancelled and the process to do so.
              </p>
              <p>
                We strive to make the cancellation process as simple and hassle-free as possible while ensuring fair practices for all customers.
              </p>
            </div>
          </section>

          {/* When Can You Cancel */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">When Can You Cancel an Order?</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ✓ Before Order is Shipped
                </h3>
                <p className="text-gray-700">
                  You can cancel your order anytime before it is shipped. Once shipped, cancellation is not possible, but you can return the product after delivery (refer to our Refund Policy).
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ✓ Order Status: &quot;Processing&quot; or &quot;Confirmed&quot;
                </h3>
                <p className="text-gray-700">
                  If your order status shows &quot;Processing&quot; or &quot;Confirmed,&quot; you can request cancellation through your account dashboard or by contacting customer support.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ✗ After Order is Shipped
                </h3>
                <p className="text-gray-700">
                  Once the order status changes to &quot;Shipped&quot; or &quot;Out for Delivery,&quot; cancellation requests cannot be processed. You may refuse delivery or return the product after receiving it.
                </p>
              </div>
            </div>
          </section>

          {/* How to Cancel */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Cancel Your Order</h2>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Method 1: Self-Service Cancellation</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 border-l-4 border-green-600 p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 1: Login to Your Account</h4>
                  <p className="text-gray-700">
                    Go to www.divyaarth.com and log in to your account using your credentials.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-green-600 p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 2: Navigate to Orders</h4>
                  <p className="text-gray-700">
                    Click on &quot;My Orders&quot; from your account dashboard to view all your orders.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-green-600 p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 3: Select Order to Cancel</h4>
                  <p className="text-gray-700">
                    Find the order you want to cancel and click on &quot;Cancel Order&quot; button (available only if the order hasn&apos;t been shipped).
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-green-600 p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Step 4: Confirm Cancellation</h4>
                  <p className="text-gray-700">
                    Select the reason for cancellation and confirm. You&apos;ll receive a confirmation email once the cancellation is processed.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Method 2: Contact Customer Support</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-3">
                    If you&apos;re unable to cancel through the website, contact our customer support:
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
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium">Phone:</span>{" "}
                    <a 
                      href="tel:+919220229066" 
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      +91-9220229066
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    Please provide your order number and registered email/phone number for verification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cancellation Charges */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cancellation Charges</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  ✓ No Cancellation Charges
                </h3>
                <p className="text-gray-700">
                  We do NOT charge any cancellation fees if you cancel your order before it is shipped. You will receive a full refund of the amount paid.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Refund Processing Time
                </h3>
                <p className="text-gray-700 mb-3">
                  Once your cancellation is confirmed, the refund will be processed within:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                  <li>Prepaid Orders: 5-7 business days to your original payment method</li>
                  <li>Cash on Delivery (COD): No refund applicable (no payment made)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Seller Cancellation */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cancellation by Divyaarth</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In rare cases, we may need to cancel your order due to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Product unavailability or out of stock</li>
                <li>Pricing errors or technical glitches on the website</li>
                <li>Inability to deliver to your address</li>
                <li>Suspected fraudulent transaction</li>
                <li>Force majeure events (natural disasters, pandemics, etc.)</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
                <p className="text-gray-700">
                  <span className="font-semibold">If we cancel your order:</span> You will receive a full refund within 5-7 business days and an email notification explaining the reason for cancellation.
                </p>
              </div>
            </div>
          </section>

          {/* Partial Cancellation */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Partial Order Cancellation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If your order contains multiple items, you can cancel individual items (partial cancellation) as long as they haven&apos;t been shipped.
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How to Cancel Specific Items:
                </h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Go to &quot;My Orders&quot; and select the order</li>
                  <li>Click on &quot;Cancel Items&quot;</li>
                  <li>Select the items you want to cancel</li>
                  <li>Confirm the cancellation</li>
                </ol>
                <p className="text-sm text-gray-600 mt-3">
                  The refund will be processed only for the cancelled items. Remaining items will be delivered as per the original order.
                </p>
              </div>
            </div>
          </section>

          {/* Refused Delivery */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Refused Delivery</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you refuse to accept delivery without prior cancellation:
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  For Prepaid Orders:
                </h3>
                <p className="text-gray-700">
                  Refund will be processed after deducting return shipping charges (₹60-₹100 depending on location). Refunds will take 7-10 business days.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  For Cash on Delivery (COD) Orders:
                </h3>
                <p className="text-gray-700 mb-2">
                  Repeated refusals without valid reasons may result in:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Temporary or permanent suspension of COD option for your account</li>
                  <li>Restriction from placing future orders</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                We encourage customers to cancel orders properly before shipment rather than refusing delivery.
              </p>
            </div>
          </section>

          {/* Non-Cancellable Orders */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Non-Cancellable Orders</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The following orders CANNOT be cancelled once placed:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Orders with status &quot;Shipped&quot; or &quot;Out for Delivery&quot;</li>
                  <li>Customized or personalized products (if any)</li>
                  <li>Combo packs or special promotional offers (at our discretion)</li>
                </ul>
              </div>
              <p className="mt-4">
                For shipped orders, you may return the product after delivery (refer to our Refund Policy).
              </p>
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Important Notes</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancellation requests are processed within 24 hours during business days.</li>
                <li>You will receive a cancellation confirmation email once the cancellation is successful.</li>
                <li>If you don&apos;t receive a confirmation, your cancellation request may not have been processed. Contact support immediately.</li>
                <li>Orders cannot be modified after placement. To make changes, cancel the order and place a new one.</li>
                <li>For urgent cancellations, call our support team directly at +91-9220229066.</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Help with Cancellation?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                If you have any questions about cancelling your order, contact our customer support:
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
