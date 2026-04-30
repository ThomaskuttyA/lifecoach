import React from 'react';
import { Camera, Play, Music, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const socialPlatforms = [
  {
    name: "Instagram",
    handle: "@nayorabloom",
    followers: "45K+",
    color: "#E1306C",
    icon: <Camera size={32} />,
    link: "#"
  },
  {
    name: "YouTube",
    handle: "Nayora Bloom Coaching",
    followers: "120K+",
    color: "#FF0000",
    icon: <Play size={32} />,
    link: "#"
  },
  {
    name: "TikTok",
    handle: "@nayorabloom_official",
    followers: "250K+",
    color: "#000000",
    icon: <Music size={32} />,
    link: "#"
  },
  {
    name: "Facebook",
    handle: "Nayora Bloom Mindset",
    followers: "30K+",
    color: "#1877F2",
    icon: <Share2 size={32} />,
    link: "#"
  }
];

const SocialConnect = () => {
  return (
    <section className="social-connect">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join Our Community</h2>
          <p>Get daily inspiration, behind-the-scenes content, and exclusive tips across all platforms.</p>
        </div>

        <div className="social-grid">
          {socialPlatforms.map((platform, i) => (
            <motion.a 
              key={platform.name}
              href={platform.link}
              className="social-card glass"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="icon-box" style={{ backgroundColor: platform.color }}>
                {platform.icon}
              </div>
              <div className="platform-info">
                <h3>{platform.name}</h3>
                <p className="handle">{platform.handle}</p>
                <span className="followers">{platform.followers} Followers</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialConnect;
