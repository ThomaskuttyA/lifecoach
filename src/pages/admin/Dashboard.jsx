import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Home, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  LogOut, 
  Save, 
  Plus, 
  Trash2,
  Heart,
  Image as ImageIcon,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';

// Helper to handle image upload to Base64
const handleImageUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const { content, updateHero, updateCourses, updateReviews, updateVideoNotice, logout } = useContent();
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const triggerSave = (msg = 'Changes saved successfully!', type = 'success') => {
    setSaveStatus({ type, message: msg });
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: <Home size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'reviews', label: 'Reviews', icon: <MessageSquare size={18} /> },
    { id: 'updates', label: 'Notices & Videos', icon: <Bell size={18} /> },
  ];

  const handleSaveWrapper = (updateFn, data) => {
    try {
      updateFn(data);
      triggerSave();
    } catch (err) {
      console.error(err);
      triggerSave('Failed to save changes. Please check if your image is too large.', 'error');
    }
  };

  return (
    <div className="admin-dashboard">
      <AnimatePresence>
        {saveStatus && (
          <motion.div 
            className={`global-alert ${saveStatus.type}`}
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
          >
            {saveStatus.type === 'success' ? <CheckCircle2 size={20} /> : <Bell size={20} />}
            <span>{saveStatus.message}</span>
            <button onClick={() => setSaveStatus(null)} className="close-alert">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Heart className="logo-icon" fill="#6366f1" color="#6366f1" size={24} />
            <span>Nayora Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/')} className="nav-item site-link">
            <ArrowLeft size={18} />
            <span>View Website</span>
          </button>
          <button onClick={handleLogout} className="nav-item logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-info">
            <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p>Manage your {activeTab} content here.</p>
          </div>
        </header>

        <section className="admin-content">
          {activeTab === 'hero' && <HeroEditor content={content.hero} onSave={(data) => handleSaveWrapper(updateHero, data)} />}
          {activeTab === 'courses' && <CoursesEditor content={content.courses} onSave={(data) => handleSaveWrapper(updateCourses, data)} />}
          {activeTab === 'reviews' && <ReviewsEditor content={content.reviews} onSave={(data) => handleSaveWrapper(updateReviews, data)} />}
          {activeTab === 'updates' && <UpdatesEditor content={content.videoNotice} onSave={(data) => handleSaveWrapper(updateVideoNotice, data)} />}
        </section>
      </main>

      <style jsx="true">{`
        .admin-dashboard {
          display: grid;
          grid-template-columns: 280px 1fr;
          min-height: 100vh;
          background: #020617;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .admin-sidebar {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          background: #0f172a;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .sidebar-header {
          margin-bottom: 3rem;
          padding: 0 0.5rem;
        }

        .sidebar-header .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: white;
        }

        .sidebar-nav {
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 0.875rem 1rem;
          background: transparent;
          border: none;
          color: #64748b;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.5rem;
          text-align: left;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
        }

        .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .nav-item.site-link {
          color: #94a3b8;
          margin-top: auto;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-item.logout {
          margin-top: 0.5rem;
        }

        .nav-item.logout:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .admin-main {
          padding: 3rem 4rem;
          overflow-y: auto;
          background: #020617;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4rem;
        }

        .admin-header h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          letter-spacing: -0.025em;
        }

        .admin-header p {
          color: #64748b;
          font-size: 1.1rem;
        }

        .global-alert {
          position: fixed;
          top: 0;
          left: 50%;
          z-index: 2000;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          min-width: 320px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
          font-weight: 600;
          backdrop-filter: blur(8px);
        }

        .global-alert.success {
          background: rgba(16, 185, 129, 0.95);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .global-alert.error {
          background: rgba(239, 68, 68, 0.95);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .close-alert {
          margin-left: auto;
          background: transparent;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          opacity: 0.7;
        }

        .close-alert:hover {
          opacity: 1;
        }

        .save-status {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          color: #10b981;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .admin-content {
          max-width: 1000px;
        }

        /* Editor Common Styles */
        .editor-section {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .form-control {
          width: 100%;
          padding: 0.875rem 1.125rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
          font-size: 0.95rem;
        }

        .form-control:focus {
          background: white;
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .image-upload-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.02);
          padding: 1rem;
          border-radius: 12px;
          border: 1px dashed rgba(255, 255, 255, 0.1);
        }

        .preview-box {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #6366f1;
        }

        .preview-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .btn-delete-img {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #ef4444;
          color: white;
          border: none;
          padding: 4px;
          border-radius: 6px;
          cursor: pointer;
        }

        .upload-controls {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .btn-upload {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          background: #6366f1;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          width: fit-content;
          transition: all 0.2s;
        }

        .btn-upload:hover {
          background: #4f46e5;
          transform: translateY(-1px);
        }

        .btn-save {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          margin-top: 1rem;
        }

        .item-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .item-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 1.5rem;
          position: relative;
        }

        .btn-remove {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-remove:hover {
          background: #ef4444;
          color: white;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px dashed rgba(255, 255, 255, 0.2);
          width: 100%;
          justify-content: center;
          padding: 1.5rem;
          border-radius: 16px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 2rem;
        }

        .btn-add:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: #6366f1;
          color: white;
        }
      `}</style>
    </div>
  );
};

// Sub-Editors
const HeroEditor = ({ content, onSave }) => {
  const [data, setData] = useState(content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(data);
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await handleImageUpload(file);
      setData({ ...data, image: base64 });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="editor-section">
      <div className="form-group">
        <label>Hero Badge</label>
        <input 
          type="text" 
          className="form-control" 
          value={data.badge} 
          onChange={e => setData({...data, badge: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Main Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={data.title} 
          onChange={e => setData({...data, title: e.target.value})}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          rows="4"
          className="form-control" 
          value={data.description} 
          onChange={e => setData({...data, description: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Hero Photo</label>
        <div className="image-upload-wrapper">
          {data.image && (
            <div className="preview-box">
              <img src={data.image} alt="Preview" />
              <button 
                type="button" 
                className="btn-delete-img"
                onClick={() => setData({ ...data, image: '' })}
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
          <div className="upload-controls">
            <input 
              type="file" 
              accept="image/*" 
              id="hero-upload" 
              hidden 
              onChange={onFileChange}
            />
            <label htmlFor="hero-upload" className="btn-upload">
              <ImageIcon size={18} />
              <span>{data.image ? 'Change Photo' : 'Upload Photo'}</span>
            </label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Or paste Image URL here"
              value={data.image} 
              onChange={e => setData({...data, image: e.target.value})}
            />
          </div>
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label>Stats Number</label>
          <input 
            type="text" 
            className="form-control" 
            value={data.stats.number} 
            onChange={e => setData({...data, stats: {...data.stats, number: e.target.value}})}
          />
        </div>
        <div className="form-group">
          <label>Stats Label</label>
          <input 
            type="text" 
            className="form-control" 
            value={data.stats.label} 
            onChange={e => setData({...data, stats: {...data.stats, label: e.target.value}})}
          />
        </div>
      </div>
      <button type="submit" className="btn-primary btn-save">
        <Save size={18} /> Save Hero Section
      </button>

      <style jsx="true">{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
      `}</style>
    </form>
  );
};

const CoursesEditor = ({ content, onSave }) => {
  const [courses, setCourses] = useState(content);

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, {
      id: newId,
      title: "New Course",
      price: "0 AED",
      duration: "4 Weeks",
      rating: 5.0,
      features: ["Feature 1"],
      popular: false
    }]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div>
      <div className="item-list">
        {courses.map((course) => (
          <div key={course.id} className="item-card editor-section">
            <button className="btn-remove" onClick={() => removeCourse(course.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Course Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={course.title} 
                onChange={e => updateCourse(course.id, 'title', e.target.value)}
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Price</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={course.price} 
                  onChange={e => updateCourse(course.id, 'price', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={course.duration} 
                  onChange={e => updateCourse(course.id, 'duration', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Features (Comma separated)</label>
              <input 
                type="text" 
                className="form-control" 
                value={course.features.join(', ')} 
                onChange={e => updateCourse(course.id, 'features', e.target.value.split(',').map(f => f.trim()))}
              />
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={course.popular} 
                  onChange={e => updateCourse(course.id, 'popular', e.target.checked)}
                />
                Most Popular
              </label>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-add" onClick={addCourse}>
        <Plus size={20} /> Add New Course
      </button>
      <button className="btn-primary btn-save" onClick={() => onSave(courses)}>
        <Save size={18} /> Save All Courses
      </button>

      <style jsx="true">{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }
        .checkbox-label input {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
};

const ReviewsEditor = ({ content, onSave }) => {
  const [reviews, setReviews] = useState(content);

  const updateReview = (id, field, value) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addReview = () => {
    const newId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
    setReviews([...reviews, {
      id: newId,
      name: "New Reviewer",
      role: "Client",
      text: "Experience details...",
      image: "https://i.pravatar.cc/150?u=new"
    }]);
  };

  const removeReview = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  return (
    <div>
      <div className="item-list">
        {reviews.map((review) => (
          <div key={review.id} className="item-card editor-section">
            <button className="btn-remove" onClick={() => removeReview(review.id)}>
              <Trash2 size={16} />
            </button>
            <div className="grid-2">
              <div className="form-group">
                <label>Reviewer Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={review.name} 
                  onChange={e => updateReview(review.id, 'name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Role / Designation</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={review.role} 
                  onChange={e => updateReview(review.id, 'role', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Review Text</label>
              <textarea 
                rows="3"
                className="form-control" 
                value={review.text} 
                onChange={e => updateReview(review.id, 'text', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Reviewer Photo</label>
              <div className="image-upload-wrapper">
                {review.image && (
                  <div className="preview-box">
                    <img src={review.image} alt="Preview" />
                    <button 
                      type="button" 
                      className="btn-delete-img"
                      onClick={() => updateReview(review.id, 'image', '')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                <div className="upload-controls">
                  <input 
                    type="file" 
                    accept="image/*" 
                    id={`review-upload-${review.id}`} 
                    hidden 
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const base64 = await handleImageUpload(file);
                        updateReview(review.id, 'image', base64);
                      }
                    }}
                  />
                  <label htmlFor={`review-upload-${review.id}`} className="btn-upload">
                    <ImageIcon size={18} />
                    <span>{review.image ? 'Change Photo' : 'Upload Photo'}</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Or paste Image URL here"
                    value={review.image} 
                    onChange={e => updateReview(review.id, 'image', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-add" onClick={addReview}>
        <Plus size={20} /> Add New Review
      </button>
      <button className="btn-primary btn-save" onClick={() => onSave(reviews)}>
        <Save size={18} /> Save All Reviews
      </button>
      <style jsx="true">{`
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
      `}</style>
    </div>
  );
};

const UpdatesEditor = ({ content, onSave }) => {
  const [data, setData] = useState(content);

  const updateNotice = (id, field, value) => {
    setData({
      ...data,
      notices: data.notices.map(n => n.id === id ? { ...n, [field]: value } : n)
    });
  };

  const updateVideo = (id, field, value) => {
    setData({
      ...data,
      videos: data.videos.map(v => v.id === id ? { ...v, [field]: value } : v)
    });
  };

  return (
    <div>
      <h3>Notices</h3>
      <div className="item-list">
        {data.notices.map((notice) => (
          <div key={notice.id} className="item-card editor-section">
            <div className="form-group">
              <label>Notice Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={notice.title} 
                onChange={e => updateNotice(notice.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                rows="2"
                className="form-control" 
                value={notice.description} 
                onChange={e => updateNotice(notice.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '3rem' }}>Videos</h3>
      <div className="item-list">
        {data.videos.map((video) => (
          <div key={video.id} className="item-card editor-section">
            <div className="form-group">
              <label>Video Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={video.title} 
                onChange={e => updateVideo(video.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Video Thumbnail</label>
              <div className="image-upload-wrapper">
                {video.thumbnail && (
                  <div className="preview-box">
                    <img src={video.thumbnail} alt="Preview" />
                    <button 
                      type="button" 
                      className="btn-delete-img"
                      onClick={() => updateVideo(video.id, 'thumbnail', '')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                <div className="upload-controls">
                  <input 
                    type="file" 
                    accept="image/*" 
                    id={`video-upload-${video.id}`} 
                    hidden 
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const base64 = await handleImageUpload(file);
                        updateVideo(video.id, 'thumbnail', base64);
                      }
                    }}
                  />
                  <label htmlFor={`video-upload-${video.id}`} className="btn-upload">
                    <ImageIcon size={18} />
                    <span>{video.thumbnail ? 'Change Photo' : 'Upload Photo'}</span>
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Or paste Image URL here"
                    value={video.thumbnail} 
                    onChange={e => updateVideo(video.id, 'thumbnail', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary btn-save" onClick={() => onSave(data)}>
        <Save size={18} /> Save All Updates
      </button>
    </div>
  );
};

export default Dashboard;
