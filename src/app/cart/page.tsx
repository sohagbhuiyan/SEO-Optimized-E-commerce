'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cartSlice';
import Link from 'next/link';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <section className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({totalQuantity} items)</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 flex items-center space-x-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-green-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="text-right">
          <p className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</p>
          <Link
            href="/checkout"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
