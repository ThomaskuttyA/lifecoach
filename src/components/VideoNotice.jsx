import React from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, Bell, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const VideoNotice = () => {
  const { content } = useContent();
  const { videos, notices } = content.videoNotice;

  return (
    <section id="updates" className="video-notice">
      <div className="container grid-layout">
        
        {/* Video Gallery */}
        <div className="video-section">
          <div className="section-header-left">
            <h2 className="section-title-sm">Free Resources</h2>
            <p>Bite-sized wisdom to keep you inspired every day.</p>
          </div>
          
          <div className="video-list">
            {videos.map((video) => (
              <motion.div 
                key={video.id} 
                className="video-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="video-thumb">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay"><Play size={24} fill="white" /></div>
                  <span className="duration-tag">{video.duration}</span>
                </div>
                <div className="video-info">
                  <h4>{video.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="btn-text">View All Videos <ArrowRight size={18} /></button>
        </div>

        {/* Notice Board */}
        <div className="notice-section">
          <div className="glass notice-board">
            <div className="notice-header">
              <div className="title-with-icon">
                <Bell className="bell-icon" />
                <h3>Notice Board</h3>
              </div>
              <span className="live-indicator">
                <span className="pulse"></span> Live Updates
              </span>
            </div>

            <div className="notices">
              {notices.map((notice) => (
                <div key={notice.id} className="notice-card">
                  <div className="notice-meta">
                    <span className={`tag ${notice.type}`}>{notice.type}</span>
                    <span className="date"><Calendar size={14} /> {notice.date}</span>
                  </div>
                  <h4>{notice.title}</h4>
                  <p>{notice.description}</p>
                </div>
              ))}
            </div>
            
            <button className="btn-primary full-width">Join Community Discord</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VideoNotice;
