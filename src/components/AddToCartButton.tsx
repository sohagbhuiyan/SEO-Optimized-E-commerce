'use client';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useDispatch();

    const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
    >
      Add to Cart
    </button>
  );
}