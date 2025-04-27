
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface VideoType {
  id: string;
  title: string;
  price: number;
  description: string;
}

const videoTypes: VideoType[] = [
  {
    id: "explainer",
    title: "Explainer Video",
    price: 99,
    description: "Clear, professional explainer videos for your product or service"
  },
  {
    id: "tiktok",
    title: "TikTok Hook Video",
    price: 49,
    description: "Engaging, viral-style videos optimized for social media"
  },
  {
    id: "youtube",
    title: "Longform YouTube Video",
    price: 199,
    description: "In-depth, high-quality content for your YouTube channel"
  }
];

const addOns = [
  { id: "screenshots", label: "Screenshot Edits", price: 20 },
  { id: "howItWorks", label: "How it Works Video", price: 70 },
];

const OrderForm = () => {
  const [selectedType, setSelectedType] = useState<string>("explainer");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    website: "",
    brief: ""
  });

  // Calculate total price whenever selections change
  useEffect(() => {
    const basePrice = videoTypes.find(type => type.id === selectedType)?.price || 0;
    const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    
    setTotal((basePrice * quantity) + addOnsTotal);
  }, [selectedType, quantity, selectedAddOns]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      const response = await fetch("https://formsubmit.co/your-email@example.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          videoType: selectedType,
          quantity,
          addOns: selectedAddOns,
          totalPrice: total
        }),
      });

      if (response.ok) {
        toast.success("Order submitted successfully! Redirecting to payment...");
        // Redirect to Paystack after a brief delay
        setTimeout(() => {
          window.location.href = `https://paystack.com/pay/YOURPAYMENTLINK?amount=${total}`;
        }, 2000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto p-6 bg-background">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Video Type Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Choose Your Video Type</h3>
          <RadioGroup 
            value={selectedType} 
            onValueChange={setSelectedType}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {videoTypes.map((type) => (
              <Card 
                key={type.id}
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedType === type.id ? 'border-primary' : 'border-border hover:border-primary/50'
                }`}
              >
                <CardContent className="p-6">
                  <RadioGroupItem 
                    value={type.id} 
                    id={type.id}
                    className="absolute right-4 top-4"
                  />
                  <div className="space-y-2">
                    <h4 className="font-semibold">{type.title}</h4>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    <p className="text-lg font-semibold">${type.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>

        {/* Quantity Selection */}
        <div className="space-y-2">
          <Label htmlFor="quantity">Number of Videos</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="max-w-[200px]"
          />
        </div>

        {/* Add-ons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Optional Add-ons</h3>
          {addOns.map((addon) => (
            <div key={addon.id} className="flex items-center space-x-2">
              <Checkbox
                id={addon.id}
                checked={selectedAddOns.includes(addon.id)}
                onCheckedChange={(checked) => {
                  setSelectedAddOns(
                    checked
                      ? [...selectedAddOns, addon.id]
                      : selectedAddOns.filter((id) => id !== addon.id)
                  );
                }}
              />
              <Label htmlFor={addon.id}>
                {addon.label} (+${addon.price})
              </Label>
            </div>
          ))}
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              required
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brief">Project Brief (Optional)</Label>
            <Textarea
              id="brief"
              value={formData.brief}
              onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
              placeholder="Tell us about your project..."
              className="h-32"
            />
          </div>
        </div>

        {/* Total Price Display */}
        <motion.div 
          className="text-2xl font-bold text-center py-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          Total: ${total}
        </motion.div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full bg-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Order Now"}
        </Button>
      </form>
    </section>
  );
};

export default OrderForm;
