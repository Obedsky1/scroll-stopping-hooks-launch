
import { Button } from "@/components/ui/button";

interface StickyFooterProps {
  onButtonClick: () => void;
}

const StickyFooter = ({ onButtonClick }: StickyFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-sm p-4 border-t border-white/10 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-white font-medium">Ready to Go Viral?</p>
        <Button 
          onClick={onButtonClick}
          className="bg-neon-pink hover:bg-neon-pink/80"
        >
          Book a Free Creative Call
        </Button>
      </div>
    </div>
  );
};

export default StickyFooter;
