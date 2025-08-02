'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useState } from 'react';

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <section className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </section>
    );
  }

  const selectedOrderData = orders.find(order => order.id === selectedOrder);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Customer Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Items</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Total Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Order Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrderData && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-4">Order Details - {selectedOrderData.id}</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p><strong>Customer:</strong> {selectedOrderData.name}</p>
              <p><strong>Phone:</strong> {selectedOrderData.phone}</p>
              <p><strong>Address:</strong> {selectedOrderData.address}</p>
            </div>
            <div>
              <p><strong>Order Date:</strong> {new Date(selectedOrderData.date).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> ${selectedOrderData.totalAmount.toFixed(2)}</p>
            </div>
          </div>
          
          <h3 className="font-semibold mb-2">Items Ordered:</h3>
          <div className="space-y-2">
            {selectedOrderData.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded">
                <div className="flex items-center space-x-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}