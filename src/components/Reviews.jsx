import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const Reviews = () => {
  const { content } = useContent();
  const { reviews } = content;

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
