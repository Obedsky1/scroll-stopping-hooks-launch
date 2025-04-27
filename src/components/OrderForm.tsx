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
  categories?: Category[];
}

interface Category {
  id: string;
  name: string;
  price: number;
}

const videoTypes: VideoType[] = [
  {
    id: "explainer",
    title: "Explainer Video",
    price: 99,
    description: "Clear, professional explainer videos for your product or service",
    categories: [
      { id: "product", name: "Product Demo", price: 99 },
      { id: "software", name: "Software Tutorial", price: 129 },
      { id: "service", name: "Service Overview", price: 89 },
      { id: "corporate", name: "Corporate Presentation", price: 149 }
    ]
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    website: "",
    brief: ""
  });

  useEffect(() => {
    let basePrice = videoTypes.find(type => type.id === selectedType)?.price || 0;
    
    if (selectedType === "explainer" && selectedCategory) {
      const category = videoTypes[0].categories?.find(cat => cat.id === selectedCategory);
      if (category) {
        basePrice = category.price;
      }
    }
    
    const addOnsTotal = selectedAddOns.reduce((sum, addonId) => {
      const addon = addOns.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    
    setTotal((basePrice * quantity) + addOnsTotal);
  }, [selectedType, selectedCategory, quantity, selectedAddOns]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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
    <section className="w-full max-w-4xl mx-auto p-6 bg-background/95 backdrop-blur-sm rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold mb-3">Choose Your Video Type</h3>
          <RadioGroup 
            value={selectedType} 
            onValueChange={(value) => {
              setSelectedType(value);
              setSelectedCategory(null);
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
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

          {selectedType === "explainer" && (
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Select Category</h4>
              <RadioGroup 
                value={selectedCategory || ''} 
                onValueChange={setSelectedCategory}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                {videoTypes[0].categories?.map((category) => (
                  <Card 
                    key={category.id}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedCategory === category.id ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <RadioGroupItem 
                        value={category.id} 
                        id={category.id}
                        className="absolute right-3 top-3"
                      />
                      <div className="space-y-1">
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-lg font-semibold">${category.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

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

        <motion.div 
          className="text-2xl font-bold text-center py-4"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
        >
          Total: ${total}
        </motion.div>

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
