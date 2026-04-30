import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Star, ArrowLeft, ShieldCheck, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: "The Mindset Reset",
    price: "799 AED",
    duration: "6 Weeks",
    rating: 4.9,
    reviews: 128,
    features: ["Weekly Live Coaching", "Private Community Access", "Transformation Toolkit", "Lifetime Updates"],
    description: "Are you feeling stuck in a loop of self-doubt? 'The Mindset Reset' is designed to break the patterns of negative thinking and replace them with empowering beliefs. This 6-week intensive program will give you the tools to rewire your brain for success and resilience.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Mastery of Purpose",
    price: "1899 AED",
    duration: "3 Months",
    rating: 5.0,
    reviews: 85,
    features: ["1-on-1 Strategy Calls", "Unlimited Email Support", "Career Breakthrough Plan", "VIP Mastermind Access"],
    description: "Find your 'Why' and turn it into a reality. 'Mastery of Purpose' is a high-touch coaching experience for individuals ready to make a significant impact. We'll dive deep into your core values, identify your unique mission, and build a strategic roadmap for your legacy.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Financial Freedom",
    price: "1099 AED",
    duration: "8 Weeks",
    rating: 4.8,
    reviews: 210,
    features: ["Wealth Building Framework", "Automated Savings Setup", "Debt Elimination Guide", "Monthly Q&A"],
    description: "Money is a mindset. This program is not just about spreadsheets; it's about changing your relationship with wealth. Learn the psychological triggers of spending, the habits of the wealthy, and how to create a financial system that works on autopilot.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80"
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) return <div className="container">Course not found</div>;

  return (
    <div className="course-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="detail-grid">
          <div className="detail-content">
            <span className="badge">Premium Program</span>
            <h1>{course.title}</h1>
            <div className="meta">
              <span className="rating"><Star size={16} fill="#f59e0b" color="#f59e0b" /> {course.rating} ({course.reviews} reviews)</span>
              <span className="students"><Users size={16} /> 500+ Students enrolled</span>
            </div>
            
            <p className="description">{course.description}</p>

            <div className="what-you-get">
              <h3>What you'll get:</h3>
              <ul className="features-list">
                {course.features.map((feature, i) => (
                  <li key={i}><Check size={18} className="check-icon" /> {feature}</li>
                ))}
              </ul>
            </div>

            <div className="guarantee glass">
              <ShieldCheck className="shield-icon" />
              <div>
                <h4>30-Day Money Back Guarantee</h4>
                <p>If you don't feel more empowered within 30 days, we'll refund every cent. No questions asked.</p>
              </div>
            </div>
          </div>

          <div className="purchase-card glass">
            <img src={course.image} alt={course.title} className="card-img" />
            <div className="card-body">
              <div className="price-tag">
                <span className="current-price">{course.price}</span>
                <span className="old-price">3999 AED</span>
              </div>
              <p className="urgency">Special offer ends in 12 hours!</p>
              <Link to="/success" className="btn-primary buy-btn">Complete Purchase</Link>
              
              <div className="card-features">
                <div className="cf-item"><Clock size={16} /> {course.duration}</div>
                <div className="cf-item"><ShieldCheck size={16} /> Lifetime Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
