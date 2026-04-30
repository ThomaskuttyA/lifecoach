import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import Success from './pages/Success';
import Contact from './pages/Contact';
import SocialConnect from './components/SocialConnect';
import { Mail, Heart, Camera, Send, Users, Play, Music, MapPin, Phone } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <SocialConnect />
        </main>

        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <Heart className="logo-icon" fill="#6366f1" color="#6366f1" />
                <span>Nayora Bloom</span>
              </div>
              <p>Empowering individuals to break through barriers and design their ideal lives since 2014.</p>
              <div className="social-links">
                <a href="#"><Camera size={20} /></a>
                <a href="#"><Send size={20} /></a>
                <a href="#"><Users size={20} /></a>
                <a href="#"><Play size={20} /></a>
                <a href="#"><Music size={20} /></a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Programs</h4>
              <a href="/#courses">Mindset Reset</a>
              <a href="/#courses">Mastery of Purpose</a>
              <a href="/#courses">Financial Freedom</a>
            </div>

            <div className="footer-links">
              <h4>Company</h4>
              <a href="#">About Nayora</a>
              <Link to="/contact">Contact</Link>
              <a href="#">Privacy Policy</a>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Inspired</h4>
              <p>Get weekly mindset shifts delivered to your inbox.</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Email Address" />
                <button className="btn-primary">Join</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Nayora Bloom Coaching. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
