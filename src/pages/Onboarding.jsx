import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Sparkles, ArrowRight, Check, Camera, Mail, FileText, Code2 } from 'lucide-react';

const GithubIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    email: '',
    github: '',
    bio: '',
    skills: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  });

  const nextStep = () => setStep(s => s + 1);

  const seeds = ['arjun', 'priya', 'rahul', 'sneha', 'vikram', 'ananya', 'karan', 'divya'];

  const steps = [
    // Step 0: Welcome
    {
      title: "Welcome to AURA Intel",
      subtitle: "Let's initialize your ambassador intelligence profile.",
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 24, background: 'var(--primary-glow)', 
            display: 'grid', placeItems: 'center', margin: '0 auto 32px' 
          }}>
            <Sparkles size={40} color="var(--primary)" className="pulse-glow" />
          </div>
          <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.6, maxWidth: 360, margin: '0 auto 32px' }}>
            You've been selected for the AICore Connect Ambassador Program. Let's get your workstation ready.
          </p>
          <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: 16 }}>
            Initialize Neural Core <ArrowRight size={18} style={{ marginLeft: 8 }} />
          </button>
        </div>
      )
    },
    // Step 1: Basic Identity
    {
      title: "Who are you?",
      subtitle: "Identify your academic standing and ambassador name.",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Arjun Mehta"
                className="premium-input" 
                style={{ paddingLeft: 48, height: 50 }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>University</label>
            <div style={{ position: 'relative' }}>
              <BookOpen size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                value={formData.university}
                onChange={e => setFormData({...formData, university: e.target.value})}
                placeholder="e.g. Stanford University"
                className="premium-input" 
                style={{ paddingLeft: 48, height: 50 }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="e.g. arjun@university.edu"
                className="premium-input" 
                style={{ paddingLeft: 48, height: 50 }}
              />
            </div>
          </div>
          <button onClick={nextStep} disabled={!formData.name || !formData.university || !formData.email} className="btn-primary" style={{ width: '100%', padding: '16px', marginTop: 12, opacity: (!formData.name || !formData.university || !formData.email) ? 0.5 : 1 }}>
            Confirm Identity
          </button>
        </div>
      )
    },
    // Step 2: Persona (Bio & Skills)
    {
      title: "Your Persona",
      subtitle: "Tell us about your technical expertise and background.",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Bio</label>
            <div style={{ position: 'relative' }}>
              <FileText size={18} style={{ position: 'absolute', left: 16, top: '16px', color: 'var(--text-dim)' }} />
              <textarea 
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
                placeholder="Write a short bio..."
                className="premium-input" 
                style={{ padding: '14px 14px 14px 48px', height: 100, resize: 'none' }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>Skills (comma separated)</label>
            <div style={{ position: 'relative' }}>
              <Code2 size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                value={formData.skills}
                onChange={e => setFormData({...formData, skills: e.target.value})}
                placeholder="e.g. React, Python, UI Design"
                className="premium-input" 
                style={{ paddingLeft: 48, height: 50 }}
              />
            </div>
          </div>
          <button onClick={nextStep} disabled={!formData.bio || !formData.skills} className="btn-primary" style={{ width: '100%', padding: '16px', marginTop: 12, opacity: (!formData.bio || !formData.skills) ? 0.5 : 1 }}>
            Save Persona
          </button>
        </div>
      )
    },
    // Step 3: GitHub
    {
      title: "Connect Intelligence",
      subtitle: "Link your GitHub to sync real-time project metrics.",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ 
            padding: 20, borderRadius: 16, background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' 
          }}>
            <GithubIcon size={40} style={{ marginBottom: 12, color: 'var(--text-muted)' }} />
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              AURA AI will analyze your repositories to calculate your recruiter-readiness score.
            </p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>GitHub Username</label>
            <div style={{ position: 'relative' }}>
              <GithubIcon size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                value={formData.github}
                onChange={e => setFormData({...formData, github: e.target.value})}
                placeholder="e.g. arjunmehta"
                className="premium-input" 
                style={{ paddingLeft: 48, height: 50 }}
              />
            </div>
          </div>
          <button onClick={nextStep} disabled={!formData.github} className="btn-primary" style={{ width: '100%', padding: '16px', marginTop: 12, opacity: !formData.github ? 0.5 : 1 }}>
            Sync GitHub Data
          </button>
        </div>
      )
    },
    // Step 4: Avatar
    {
      title: "Choose Your Persona",
      subtitle: "Select an ambassador character or upload your photo.",
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {seeds.map(s => {
              const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${s}`;
              const isActive = formData.avatar === url;
              return (
                <motion.button 
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setFormData({...formData, avatar: url})}
                  style={{ 
                    padding: 4, borderRadius: 12, 
                    border: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                    background: 'rgba(255,255,255,0.03)', cursor: 'pointer'
                  }}>
                  <img src={url} alt={s} style={{ width: '100%', borderRadius: 8 }} />
                </motion.button>
              );
            })}
          </div>
          <button onClick={nextStep} className="btn-primary" style={{ width: '100%', padding: '16px' }}>
            Finalize Profile
          </button>
        </div>
      )
    },
    // Step 5: Finalizing
    {
      title: "Neural Sync Complete",
      subtitle: "Welcome to the elite ambassador network.",
      content: (
        <div style={{ textAlign: 'center' }}>
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ 
              width: 80, height: 80, borderRadius: '50%', background: '#10b981', 
              display: 'grid', placeItems: 'center', margin: '0 auto 24px',
              boxShadow: '0 0 30px rgba(16,185,129,0.4)'
            }}>
            <Check size={40} color="#fff" />
          </motion.div>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>
            Your workstation is now fully initialized and synced with AURA AI nodes.
          </p>
          <button onClick={() => onComplete(formData)} className="btn-primary" style={{ width: '100%', padding: '16px' }}>
            Enter Dashboard
          </button>
        </div>
      )
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', width: '100vw', display: 'grid', placeItems: 'center', 
      background: '#030712', position: 'fixed', inset: 0, zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '20%', width: 500, height: 500,
          background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
          filter: 'blur(100px)', animation: 'float-orb 10s infinite linear',
          willChange: 'transform, filter',
          transform: 'translateZ(0)'
        }} />
      </div>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: 500, padding: 40, position: 'relative' }}>
        
        <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ 
              flex: 1, height: 3, borderRadius: 2, 
              background: i <= step ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              boxShadow: i <= step ? '0 0 10px var(--primary-glow)' : 'none',
              transition: 'all 0.5s'
            }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.02em' }}>{steps[step].title}</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: 15, marginBottom: 32 }}>{steps[step].subtitle}</p>
            {steps[step].content}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes float-orb {
          from { transform: translate(-50%, -50%) rotate(0deg) translate(100px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translate(100px); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
