'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaHome, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

export default function Navbar() {
  const cartItems = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <nav className="bg-gray-500 text-white sticky top-0 p-4 mb-6 z-1000">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-commerce Store
        </Link>
        <div className="flex space-x-6 text-xl">
          <Link href="/" className="hover:text-blue-200" title="Home">
            <FaHome />
          </Link>
          <Link href="/cart" className="relative hover:text-blue-200" title="Cart">
            <FaShoppingCart />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems}
              </span>
            )}
          </Link>
          <Link href="/orders" className="hover:text-blue-200" title="Orders">
            <FaClipboardList />
          </Link>
        </div>
      </div>
    </nav>
  );
}
