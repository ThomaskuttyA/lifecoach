import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const { hero } = content;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-badge" variants={itemVariants}>
            {hero.badge}
          </motion.span>
          <motion.h1 className="hero-title" variants={itemVariants}>
            {hero.title.split(' ').map((word, i) => (
              word === 'True' || word === 'Potential' ? <span key={i} className="highlight">{word} </span> : word + ' '
            ))}
          </motion.h1>
          <motion.p className="hero-description" variants={itemVariants}>
            {hero.description}
          </motion.p>
          <motion.div className="hero-btns" variants={itemVariants}>
            <motion.button 
              className="btn-primary lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ x: 5 }}
            >
              <div className="play-icon"><Play size={20} fill="currentColor" /></div>
              <span>Watch Intro</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="image-card">
            <img src={hero.image} alt="Nayora Bloom" className="hero-img" />
            <motion.div 
              className="experience-tag glass"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <span className="number">{hero.stats.number}</span>
              <span className="label">{hero.stats.label}</span>
            </motion.div>
          </div>
          <div className="blob-bg"></div>
        </motion.div>
      </div>
      
      {/* Decorative floating elements */}
      <motion.div 
        className="floating-blob blob-1"
        animate={{ 
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="floating-blob blob-2"
        animate={{ 
          y: [0, -40, 0],
          x: [0, -20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default Hero;
