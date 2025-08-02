export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  address: string;
  phone: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
}