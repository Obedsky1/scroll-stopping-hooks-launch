
import React from 'react';
import OrderForm from '@/components/OrderForm';
import NavBar from '@/components/NavBar';

const OrderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Your Video</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Choose your package and customize your order below
          </p>
        </div>
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;
