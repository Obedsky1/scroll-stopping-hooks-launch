
import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
}

const Testimonial = ({ quote, author, company }: TestimonialProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
      <Quote className="text-neon-pink mb-4" size={24} />
      <p className="text-gray-300 mb-4 italic">{quote}</p>
      <div>
        <p className="text-white font-medium">{author}</p>
        <p className="text-gray-400 text-sm">{company}</p>
      </div>
    </div>
  );
};

export default Testimonial;
