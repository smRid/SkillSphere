import Link from "next/link";
import { FiSun, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
                <FiSun className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">SunCart</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for summer essentials. From sunglasses to skincare, we&apos;ve got everything you need for the perfect summer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-orange-400 transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-400 transition-colors text-sm">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-orange-400 transition-colors text-sm">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="text-orange-400" />
                <span>support@suncart.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="text-orange-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMapPin className="text-orange-400" />
                <span>123 Summer Blvd, CA 90210</span>
              </li>
            </ul>
          </div>

          {/* Social & Policy */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <FaTwitter className="text-sm" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <FaInstagram className="text-sm" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <FaYoutube className="text-sm" />
              </a>
            </div>
            <div>
              <Link href="/privacy-policy" className="text-sm hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="divider divider-neutral my-8"></div>

        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SunCart. All rights reserved. | Summer Essentials Store</p>
        </div>
      </div>
    </footer>
  );
}
