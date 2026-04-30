import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Marketing Director",
    text: "Working with Nayora Bloom was a turning point in my life. She helped me realize that my limitations were mostly self-imposed. I've never been more confident.",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Founder",
    text: "The 'Mastery of Purpose' course gave me the clarity I needed when I was burned out. Nayora Bloom's approach is both empathetic and incredibly practical.",
    image: "https://i.pravatar.cc/150?u=michael"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Creative Artist",
    text: "I was stuck for years. Within 3 months of coaching, I've launched my studio and regained my passion. Truly life-changing experience.",
    image: "https://i.pravatar.cc/150?u=elena"
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Success Stories</h2>
          <p>Don't just take our word for it—hear from those who have transformed their lives.</p>
        </motion.div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id} 
              className="review-card glass"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Quote className="quote-icon" size={40} />
              <p className="review-text">"{review.text}"</p>
              <div className="reviewer-info">
                <img src={review.image} alt={review.name} className="reviewer-img" />
                <div>
                  <h4 className="reviewer-name">{review.name}</h4>
                  <p className="reviewer-role">{review.role}</p>
                </div>
              </div>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
