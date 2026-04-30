import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Videos', href: '/#updates' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Updates', href: '/#updates' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Heart className="logo-icon" />
          <span>Nayora Bloom</span>
        </Link>

        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            link.href.startsWith('/#') || link.href === '/' ? (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            )
          ))}
          <Link to="/#courses" className="btn-primary">Get Started</Link>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu glass">
          {navLinks.map((link) => (
            link.href.startsWith('/#') || link.href === '/' ? (
              <a 
                key={link.name} 
                href={link.href} 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
          <Link 
            to="/#courses" 
            className="btn-primary mobile-cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
