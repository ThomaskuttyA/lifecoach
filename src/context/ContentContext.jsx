import React, { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

const initialContent = {
  hero: {
    badge: "Mindset & Growth Coach",
    title: "Unlock Your True Potential & Design Your Life",
    description: "Transformation doesn't happen by chance, it happens by design. Join 5,000+ individuals who have redefined their success through our proven mindset shifts.",
    image: "/coach-hero.png",
    stats: {
      number: "10+",
      label: "Years of Experience"
    }
  },
  courses: [
    {
      id: 1,
      title: "The Mindset Reset",
      price: "799 AED",
      duration: "6 Weeks",
      rating: 4.9,
      features: ["Weekly Live Coaching", "Private Community Access", "Transformation Toolkit", "Lifetime Updates"],
      popular: false
    },
    {
      id: 2,
      title: "Mastery of Purpose",
      price: "1899 AED",
      duration: "3 Months",
      rating: 5.0,
      features: ["1-on-1 Strategy Calls", "Unlimited Email Support", "Career Breakthrough Plan", "VIP Mastermind Access"],
      popular: true
    },
    {
      id: 3,
      title: "Financial Freedom",
      price: "1099 AED",
      duration: "8 Weeks",
      rating: 4.8,
      features: ["Wealth Building Framework", "Automated Savings Setup", "Debt Elimination Guide", "Monthly Q&A"],
      popular: false
    }
  ],
  reviews: [
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
  ],
  videoNotice: {
    videos: [
      { id: 1, title: "Morning Routine for Peak Performance", duration: "12:45", thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
      { id: 2, title: "Overcoming Imposter Syndrome", duration: "15:20", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80" },
      { id: 3, title: "Designing Your Dream Career", duration: "22:10", thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=80" },
    ],
    notices: [
      { id: 1, title: "Live Mindset Workshop", date: "Today, 6:00 PM", type: "live", description: "Join us for a live session on building resilience. Check your email for the Zoom link!" },
      { id: 2, title: "New Module Added: Goal Setting", date: "Yesterday", type: "update", description: "The 'Mastery of Purpose' course just got a new module on SMART goals." },
      { id: 3, title: "VIP Mastermind Enrollment", date: "Starts May 15", type: "event", description: "Early bird registration for the Summer Mastermind opens next week." },
    ]
  }
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('siteContent');
    return savedContent ? JSON.parse(savedContent) : initialContent;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(content));
  }, [content]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  const updateHero = (heroData) => {
    setContent(prev => ({ ...prev, hero: { ...prev.hero, ...heroData } }));
  };

  const updateCourses = (coursesData) => {
    setContent(prev => ({ ...prev, courses: coursesData }));
  };

  const updateReviews = (reviewsData) => {
    setContent(prev => ({ ...prev, reviews: reviewsData }));
  };

  const updateVideoNotice = (videoNoticeData) => {
    setContent(prev => ({ ...prev, videoNotice: videoNoticeData }));
  };

  const login = (password) => {
    if (password === 'admin123') { // Simple password for demo
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateHero, 
      updateCourses, 
      updateReviews, 
      updateVideoNotice,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
