import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, CartItem } from '@/types';

interface OrderState {
  orders: Order[];
}

// 🔁 Load orders from localStorage if available
const storedOrders = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
const initialState: OrderState = storedOrders
  ? { orders: JSON.parse(storedOrders) }
  : { orders: [] };

const saveOrdersToLocalStorage = (orders: Order[]) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<{
      name: string;
      address: string;
      phone: string;
      items: CartItem[];
    }>) => {
      const totalAmount = action.payload.items.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
      );

      const newOrder: Order = {
        id: Date.now().toString(),
        name: action.payload.name,
        address: action.payload.address,
        phone: action.payload.phone,
        items: action.payload.items,
        totalAmount,
        date: new Date().toISOString(),
      };

      state.orders.push(newOrder);

      saveOrdersToLocalStorage(state.orders);
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
