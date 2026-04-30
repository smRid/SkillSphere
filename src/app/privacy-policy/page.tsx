export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-lg">Last updated: 2024</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-6">
            At SunCart, we collect information you provide directly to us, such as when you create an account,
            make a purchase, or contact us for support. This may include your name, email address, and profile photo URL.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-6">
            We use the information we collect to provide, maintain, and improve our services, process transactions,
            send you notifications, and communicate with you about products and offers.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-6">
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
            This does not include trusted third parties who assist us in operating our website.
          </p>

          <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
          <p className="text-gray-600 mb-6">
            We implement a variety of security measures to maintain the safety of your personal information
            when you enter, submit, or access your personal information.
          </p>

          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy, please contact us at support@suncart.com.
          </p>
        </div>
      </div>
    </div>
  );
}
