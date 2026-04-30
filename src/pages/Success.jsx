import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Success = () => {
  return (
    <div className="success-page">
      <div className="container">
        <motion.div 
          className="success-card glass"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icon-wrapper">
            <CheckCircle size={80} className="check-icon" />
          </div>
          <h1>Purchase Successful!</h1>
          <p>Congratulations! You've just taken the first step towards your transformation. Check your email for access instructions and your welcome kit.</p>
          
          <div className="next-steps">
            <h3>Next Steps:</h3>
            <ul>
              <li>Check your inbox for login details</li>
              <li>Join the private Discord community</li>
              <li>Schedule your first 1-on-1 session</li>
            </ul>
          </div>

          <Link to="/" className="btn-primary">
            Go to My Dashboard <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;
