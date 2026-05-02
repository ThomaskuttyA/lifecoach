import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const CoursePlans = () => {
  const { content } = useContent();
  const { courses } = content;

  return (
    <section id="courses" className="courses">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="subtitle">Transformation Programs</span>
          <h2 className="section-title">Design Your Ideal Future</h2>
          <p>Choose the path that aligns with your goals. Each program is crafted to deliver measurable breakthroughs.</p>
        </motion.div>

        <div className="course-grid">
          {courses.map((course, index) => (
            <motion.div 
              key={course.id} 
              className={`course-card ${course.popular ? 'popular' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {course.popular && <span className="popular-badge">Most Popular</span>}
              <div className="course-content">
                <div className="course-stats">
                  <span className="duration">{course.duration}</span>
                  <span className="rating"><Star size={14} fill="#f59e0b" color="#f59e0b" /> {course.rating}</span>
                </div>
                <h3>{course.title}</h3>
                <p className="price">{course.price}</p>
                <ul className="features">
                  {course.features.map((feature, i) => (
                    <li key={i}><Check size={16} className="check" /> {feature}</li>
                  ))}
                </ul>
                <Link to={`/course/${course.id}`} className={`btn-purchase ${course.popular ? 'btn-primary' : ''}`}>
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePlans;
