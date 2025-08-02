import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

// 🔁 Load cart from localStorage if available
const storedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
const initialState: CartState = storedCart
  ? JSON.parse(storedCart)
  : { items: [], totalQuantity: 0, totalAmount: 0 };

const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;

      saveToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }

      saveToLocalStorage(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const quantityDiff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += item.price * quantityDiff;

        if (item.quantity <= 0) {
          const itemIndex = state.items.findIndex(i => i.id === action.payload.id);
          state.items.splice(itemIndex, 1);
        }
      }

      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;

      saveToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
