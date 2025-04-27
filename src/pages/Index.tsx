import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Smartphone, PenTool, ArrowDown, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavBar from "@/components/NavBar";
import ServiceCard from "@/components/ServiceCard";
import PricingCard from "@/components/PricingCard";
import VideoCard from "@/components/VideoCard";
import Testimonial from "@/components/Testimonial";
import ContactModal from "@/components/ContactModal";
import StickyFooter from "@/components/StickyFooter";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>();
  const navigate = useNavigate();
  
  const openModal = (packageName: string) => {
    setSelectedPackage(packageName);
    setModalOpen(true);
  };
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const navigateToOrder = () => {
    navigate('/order');
  };
  
  return (
    <div className="bg-dark min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        {/* Phone mockup overlay */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="phone-mockup w-[300px] h-[600px] rounded-[40px] border-8 border-black bg-gray-900">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
              alt="TikTok video" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-neon-pink/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <Play className="text-white ml-1" size={32} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Turn Viewers into Buyers with <span className="text-neon-pink animate-glow">Scroll-Stopping</span> Videos
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explainer + Hook-Driven TikTok Videos to Grow Your Brand
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={navigateToOrder}
                className="bg-neon-pink hover:bg-neon-pink/80 text-white px-8 py-6 text-lg"
              >
                See Packages
              </Button>
              <Button 
                onClick={navigateToOrder}
                className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-6 text-lg"
              >
                View Portfolio
              </Button>
            </div>
          </motion.div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <p className="text-gray-400 mb-2">Scroll Down</p>
            <ArrowDown className="text-neon-pink animate-bounce" />
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-dark to-dark/95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What I Offer</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional video production services to make your brand stand out in the crowded social media landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                icon={<Video size={32} />}
                title="Viral Hook Videos"
                description="Fast-paced, trend-driven edits for TikTok/Reels that grab attention in the first 3 seconds and keep viewers watching."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                icon={<Smartphone size={32} />}
                title="Explainer Animations"
                description="Clear & professional visuals for apps, products, or services that communicate your value proposition effectively."
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <ServiceCard 
                icon={<PenTool size={32} />}
                title="Script & CTA Strategy"
                description="Compelling hooks and calls-to-action that keep people watching and drive them to take action on your offers."
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Remove the entire Order Form Section */}
      
      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Portfolio</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Check out some examples of our work
            </p>
          </div>
          
          <Tabs defaultValue="tiktok" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/10">
                <TabsTrigger value="tiktok">TikTok Style</TabsTrigger>
                <TabsTrigger value="explainer">Explainer Style</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="tiktok">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <VideoCard 
                  thumbnail="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                  type="tiktok" 
                  title="Product Demo" 
                  views="1.2M"
                />
                <VideoCard 
                  thumbnail="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80" 
                  type="tiktok" 
                  title="Fashion Trend" 
                  views="872K"
                />
                <VideoCard 
                  thumbnail="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                  type="tiktok" 
                  title="Tech Unboxing" 
                  views="2.4M"
                />
                <VideoCard 
                  thumbnail="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80" 
                  type="tiktok" 
                  title="WFH Setup" 
                  views="934K"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="explainer">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Play className="text-white" size={48} />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Play className="text-white" size={48} />
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                  <Play className="text-white" size={48} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Testimonials */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-white text-center mb-12">What Clients Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Testimonial 
                  quote="Our TikTok engagement increased 300% after implementing these hook videos. Well worth the investment!"
                  author="Sarah Johnson"
                  company="Beauty Basics Co."
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Testimonial 
                  quote="The explainer video perfectly communicated our app's value. We've seen a 40% increase in signups since launching it."
                  author="Michael Chen"
                  company="TechFlow App"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Testimonial 
                  quote="The scriptwriting made all the difference. Our message is clearer and our audience actually takes action now."
                  author="Emily Rodriguez"
                  company="Fitness Revolution"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        selectedPackage={selectedPackage} 
      />
      
      {/* Sticky Footer */}
      <StickyFooter onButtonClick={() => openModal("consultation")} />
    </div>
  );
};

export default Index;
