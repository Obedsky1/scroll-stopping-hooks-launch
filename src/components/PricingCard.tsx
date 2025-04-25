
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  onSelect
}: PricingCardProps) => {
  return (
    <div 
      className={`relative rounded-2xl overflow-hidden ${
        isPopular 
          ? 'border-2 border-neon-pink shadow-lg shadow-neon-pink/20' 
          : 'border border-white/10'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-neon-pink text-white px-3 py-1 text-xs uppercase font-bold tracking-wider">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="bg-white/5 backdrop-blur-sm p-6 h-full flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">{price}</span>
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        
        <div className="flex-grow">
          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-neon-pink mt-1">
                  <Check size={16} />
                </span>
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button 
          onClick={onSelect}
          className={`w-full ${
            isPopular 
              ? 'bg-neon-pink hover:bg-neon-pink/80' 
              : 'bg-neon-blue hover:bg-neon-blue/80'
          }`}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;
