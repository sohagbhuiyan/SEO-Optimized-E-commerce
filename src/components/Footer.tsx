import Link from 'next/link';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-12 px-6 py-10 ">
      <div className="max-w-7xl mx-auto flex justify-between md:px-10">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">E-commerce Store</h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Your trusted destination for quality products.
            <br />
            Fast delivery & secure shopping experience.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 sm:mt-0 mt-8 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 text-blue-300" />
            <p>123 Main Street, Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-300" />
            <p>+880 1234-567890</p>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-300" />
            <p>support@estore.com</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} E-commerce Store. All rights reserved.
      </div>
    </footer>
  );
}
