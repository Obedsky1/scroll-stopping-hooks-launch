
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: string;
}

const ContactModal = ({ isOpen, onClose, selectedPackage }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    social: "",
    package: selectedPackage || "",
    reference: "",
    goal: "",
    email: "",
    phone: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {submitted ? "Thank You!" : "Let's Create Something Amazing"}
          </DialogTitle>
        </DialogHeader>
        
        {submitted ? (
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-medium">Thanks for reaching out!</h3>
              <p>We'll contact you within 24 hours to confirm your video concept.</p>
            </div>
            <Button onClick={onClose} className="w-full bg-neon-blue hover:bg-neon-blue/80">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business">Business/Brand Name</Label>
                <Input 
                  id="business"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="social">Website or Social Media Handle</Label>
              <Input 
                id="social"
                name="social"
                value={formData.social}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="package">Which package are you purchasing?</Label>
              <Select 
                value={formData.package} 
                onValueChange={(value) => handleSelectChange(value, "package")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter ($149)</SelectItem>
                  <SelectItem value="growth">Growth ($349)</SelectItem>
                  <SelectItem value="viralpro">Viral Pro ($699)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reference">Link to any reference videos (optional)</Label>
              <Input 
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">What is the goal of this video?</Label>
              <Textarea 
                id="goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="Brand awareness, traffic, conversions, etc."
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-neon-pink hover:bg-neon-pink/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit & Let's Start Creating!"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
