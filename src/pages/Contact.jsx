import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge">Get in Touch</span>
            <h1>Request a <span className="text-gradient">Callback</span></h1>
            <p className="lead">Ready to transform your life? Leave your details below and Nayora Bloom or one of our senior coaches will call you back within 24 hours.</p>

            <div className="info-cards">
              <div className="info-item glass">
                <div className="icon-box"><Phone size={24} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+971 50 123 4567</p>
                </div>
              </div>
              <div className="info-item glass">
                <div className="icon-box"><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@nayorabloom.ae</p>
                </div>
              </div>
              <div className="info-item glass">
                <div className="icon-box"><MapPin size={24} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Business Bay, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper glass"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="callback-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+971 -- --- ----" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="email@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea rows="4" placeholder="How can Nayora help you?"></textarea>
                </div>
                <button type="submit" className="btn-primary full-width">
                  Request Call Back <Send size={18} />
                </button>
              </form>
            ) : (
              <motion.div 
                className="form-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <CheckCircle size={64} className="success-icon" />
                <h3>Request Received!</h3>
                <p>Thank you for reaching out. A member of the Nayora Bloom team will contact you shortly to schedule your call.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn-text">Send another request</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
