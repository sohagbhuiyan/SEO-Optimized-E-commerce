'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';

export default function OrdersPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const orders = useSelector((state: RootState) => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  if (!hasMounted) return null;

  if (orders.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          No Orders Found
        </Typography>
        <Typography color="text.secondary">You haven't placed any orders yet.</Typography>
      </Box>
    );
  }

  // Find selected order
  const selectedOrderData = orders.find(order => order.id === selectedOrder);

  // Basic validation helpers
  const isValidString = (value: any): boolean => typeof value === 'string' && value.trim() !== '';
  const isValidPhone = (value: any): boolean => /^\d+$/.test(value); // only digits

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Order History
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{isValidString(order.name) ? order.name : 'Invalid name'}</TableCell>
                <TableCell>
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                </TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() =>
                      setSelectedOrder(selectedOrder === order.id ? null : order.id)
                    }
                  >
                    {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedOrderData && (
        <Box
          sx={{
            backgroundColor: '#fafafa',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Order Details - {selectedOrderData.id}
          </Typography>

          <Grid container spacing={4} mb={3}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Customer:</strong>{' '}
                {isValidString(selectedOrderData.name)
                  ? selectedOrderData.name
                  : 'Invalid Name'}
              </Typography>
              <Typography>
                <strong>Phone:</strong>{' '}
                {isValidPhone(selectedOrderData.phone)
                  ? selectedOrderData.phone
                  : 'Invalid Phone Number'}
              </Typography>
              <Typography>
                <strong>Address:</strong>{' '}
                {isValidString(selectedOrderData.address)
                  ? selectedOrderData.address
                  : 'Invalid Address'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Order Date:</strong>{' '}
                {new Date(selectedOrderData.date).toLocaleDateString()}
              </Typography>
              <Typography>
                <strong>Total Amount:</strong> ${selectedOrderData.totalAmount.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" fontWeight="semibold" mb={1}>
            Items Ordered:
          </Typography>
          <Box>
            {selectedOrderData.items.map(item => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 1,
                  mb: 1,
                  boxShadow: 0.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: 48, height: 48, objectFit: 'contain' }}
                  />
                  <Box>
                    <Typography fontWeight="medium">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography fontWeight="bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
