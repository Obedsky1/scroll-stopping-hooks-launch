
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigateToOrder = () => {
    navigate('/order');
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
        ? 'bg-dark/95 backdrop-blur-sm py-3 shadow-lg' 
        : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <span className="text-neon-pink">Hook</span>
          <span className="text-neon-blue">Studio</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => navigate('/#services')}
            className="text-white hover:text-neon-pink transition duration-300"
          >
            Services
          </button>
          <button 
            onClick={navigateToOrder}
            className="text-white hover:text-neon-pink transition duration-300"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/#portfolio')}
            className="text-white hover:text-neon-pink transition duration-300"
          >
            Portfolio
          </button>
        </div>
        
        <Button 
          onClick={navigateToOrder}
          className="bg-neon-pink hover:bg-neon-pink/80 text-white transition-all duration-300"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
