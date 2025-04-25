
import { useState } from "react";

interface VideoCardProps {
  thumbnail: string;
  type: "tiktok" | "explainer";
  title: string;
  views?: string;
}

const VideoCard = ({ thumbnail, type, title, views }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden rounded-2xl card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[9/16] max-w-[230px] mx-auto overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/80">
          {type === "tiktok" && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div>
                <h4 className="text-white font-medium text-sm">{title}</h4>
                {views && <p className="text-gray-300 text-xs">{views} views</p>}
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 9V3H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 15V21H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 3L14 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 21L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1882 20.5216 12.4278L19.3216 18.4278C19.1346 19.3647 18.3138 20 17.3604 20H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
          
          {type === "explainer" && (
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="text-white font-medium text-sm">{title}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
