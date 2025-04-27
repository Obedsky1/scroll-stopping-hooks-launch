
import React from 'react';
import OrderForm from '@/components/OrderForm';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const OrderPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <NavBar />
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-white mb-6 hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Order Your Video</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Choose your package and customize your order below
          </p>
        </div>

        <Carousel className="mb-8">
          <CarouselContent>
            <CarouselItem>
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Client Project 1" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </CarouselItem>
            <CarouselItem>
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04" 
                alt="Client Project 2" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </CarouselItem>
            <CarouselItem>
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
                alt="Client Project 3" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        <OrderForm />
      </div>
    </div>
  );
};

export default OrderPage;
