'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { placeOrder } from '@/redux/features/orderSlice';
import { clearCart } from '@/redux/features/cartSlice';
import Link from 'next/link';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', address: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = { name: '', address: '', phone: '' };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }
    if (!form.address.trim()) {
      newErrors.address = 'Shipping address is required';
      isValid = false;
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    dispatch(placeOrder({ ...form, items }));
    dispatch(clearCart());
    setSubmitted(true);
  };

  if (items.length === 0 && !submitted) {
    return (
      <section className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="text-center py-12">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h1 className="text-2xl font-bold">Thank You for Your Order!</h1>
          <p className="mt-2">Your order has been placed successfully.</p>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
          <Link href="/orders" className="text-blue-600 hover:underline">
            View Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <input
                name="name"
                placeholder="Full Name"
                className={`border p-3 w-full rounded ${errors.name ? 'border-red-500' : ''}`}
                onChange={handleChange}
                value={form.name}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <input
                name="address"
                placeholder="Shipping Address"
                className={`border p-3 w-full rounded ${errors.address ? 'border-red-500' : ''}`}
                onChange={handleChange}
                value={form.address}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <input
                name="phone"
                placeholder="Phone Number"
                className={`border p-3 w-full rounded ${errors.phone ? 'border-red-500' : ''}`}
                onChange={handleChange}
                value={form.phone}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="bg-gray-50 p-4 rounded">
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.title.substring(0, 30)}... (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}