import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, BookOpen, Save, Camera, Check } from 'lucide-react';

const GithubIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GlobeIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  // 📸 Persistent profile image
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('userAvatar') || null;
  });

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('userAvatar', profileImage);
    }
  }, [profileImage]);
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        email: parsed.email || '',
        bio: parsed.bio || '',
        skills: parsed.skills || '',
        website: parsed.website || ''
      };
    }
    return {
      name: 'Arjun Mehta',
      email: 'arjun.mehta@university.edu',
      github: 'arjunmehta',
      university: 'Stanford University',
      bio: 'Full-stack developer passionate about AI and open source. AI Campus Ambassador for 2024.',
      skills: 'React, Node.js, Python, TensorFlow',
      website: 'https://arjunmehta.dev'
    };
  });

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('profileData', JSON.stringify(formData));
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>Profile Settings</h1>
        <p style={{ color: 'var(--text-dim)' }}>Manage your ambassador identity and public presence.</p>
      </header>

      {/* Premium Success Animation */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(12px)',
              display: 'grid', placeItems: 'center'
            }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="glass-card"
              style={{ padding: 48, textAlign: 'center', maxWidth: 400, width: '90%' }}>
              <div style={{ 
                width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)',
                display: 'grid', placeItems: 'center', margin: '0 auto 24px',
                boxShadow: '0 0 30px var(--primary-glow)'
              }}>
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Check size={40} color="#fff" strokeWidth={3} />
                </motion.div>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Profile Updated</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: 16 }}>
                Your neural intelligence data has been successfully synced with the AICore grid.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 32, alignItems: 'start' }}>
        {/* Left Column: Avatar & Quick Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card" 
            style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 24px' }}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
                border: '4px solid rgba(16,185,129,0.2)', padding: 4, background: '#0a0a0a'
              }}>
                <img 
                  src={profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`} 
                  alt="Profile"
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              </div>
              <button 
                onClick={() => fileInputRef.current.click()}
                style={{
                  position: 'absolute', bottom: 4, right: 4,
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--primary)', color: '#fff', border: 'none',
                  display: 'grid', placeItems: 'center', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16,185,129,0.4)',
                  transition: 'transform 0.2s', zIndex: 10
                }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
                   onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                <Camera size={18} />
              </button>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{formData.name}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 20 }}>Campus Ambassador</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
              <div className="badge badge-elite">Elite</div>
              <div className="badge badge-pro">Top 1%</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card" 
            style={{ padding: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Character Gallery</h4>
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, 
              maxHeight: 280, overflowY: 'auto', paddingRight: 8,
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent'
            }}>
              {['arjun', 'priya', 'rahul', 'sneha', 'vikram', 'ananya', 'karan', 'divya', 'felix', 'aneka', 'elias', 'nova'].map(seed => {
                const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
                const isActive = profileImage === url;
                return (
                  <motion.button 
                    key={seed}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setProfileImage(url)}
                    style={{
                      padding: 6, borderRadius: 12, border: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                      background: isActive ? 'rgba(16,185,129,0.05)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                    }}>
                    <img src={url} alt={seed} style={{ width: '100%', borderRadius: 8 }} />
                    {isActive && (
                      <div style={{ 
                        position: 'absolute', top: 4, right: 4, width: 14, height: 14, 
                        background: 'var(--primary)', borderRadius: '50%', display: 'grid', 
                        placeItems: 'center', boxShadow: '0 0 8px var(--primary-glow)' 
                      }}>
                        <Check size={10} color="#fff" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 12, textAlign: 'center' }}>
              Select a professional ambassador identity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card" 
            style={{ padding: 24 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>Social Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-dim)', fontSize: 14 }}>
                <LinkedinIcon size={18} /> <span>linkedin.com/in/{formData.name ? formData.name.split(' ')[0].toLowerCase() : 'ambassador'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-dim)', fontSize: 14 }}>
                <TwitterIcon size={18} /> <span>twitter.com/{formData.github || 'ambassador'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-dim)', fontSize: 14 }}>
                <GlobeIcon size={18} /> <span>{formData.website ? formData.website.replace(/^https?:\/\//, '') : `${formData.github || 'ambassador'}.dev`}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card" 
          style={{ padding: 40 }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="premium-input" 
                    style={{ paddingLeft: 44 }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="premium-input" 
                    style={{ paddingLeft: 44 }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>GitHub Username</label>
                <div style={{ position: 'relative' }}>
                  <GithubIcon size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="text" 
                    value={formData.github}
                    onChange={e => setFormData({...formData, github: e.target.value})}
                    className="premium-input" 
                    style={{ paddingLeft: 44 }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>University</label>
                <div style={{ position: 'relative' }}>
                  <BookOpen size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                  <input 
                    type="text" 
                    value={formData.university}
                    onChange={e => setFormData({...formData, university: e.target.value})}
                    className="premium-input" 
                    style={{ paddingLeft: 44 }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>Bio</label>
              <textarea 
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                className="premium-input" 
                style={{ height: 120, padding: '16px', resize: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>Skills (comma separated)</label>
              <input 
                type="text" 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                className="premium-input" 
              />
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ 
                  padding: '14px 32px', 
                  fontSize: 15, 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  minWidth: 180,
                  justifyContent: 'center',
                  background: success ? 'linear-gradient(135deg, #10b981, #059669)' : undefined
                }}>
                {loading ? (
                  <div className="spinner" style={{ width: 20, height: 20, borderTopColor: '#fff' }} />
                ) : success ? (
                  <><Check size={18} /> Saved!</>
                ) : (
                  <><Save size={18} /> Save Changes</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      
      <style>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top: 2.5px solid var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Profile;
