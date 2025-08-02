'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  );
}