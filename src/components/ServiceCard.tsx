
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl card-hover border border-white/10">
      <div className="h-14 w-14 flex items-center justify-center text-neon-pink mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default ServiceCard;
