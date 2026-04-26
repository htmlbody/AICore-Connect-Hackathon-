// Branding restoration trigger
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Sparkles, Sun, Moon } from 'lucide-react';

import Logo from '../components/Logo';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [stage, setStage] = useState('idle'); // idle | loading | success
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setStage('loading');
    
    // Simulate professional handshake/auth
    setTimeout(() => {
      setStage('success');
      // Longer delay for the premium greeting
      setTimeout(() => onLogin(), 3500);
    }, 1500);
  };

  const btnContent = {
    idle: <><span>Sign In</span> <ArrowRight size={18} /></>,
    loading: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.3)',
          borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite',
        }} />
        <span>Authenticating...</span>
      </div>
    ),
    success: (
      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 20 }}>✓</span>
        <span>Verified</span>
      </motion.div>
    ),
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        filter: 'blur(60px)', animation: 'float-orb 8s ease-in-out infinite',
        willChange: 'transform, filter',
        transform: 'translateZ(0)'
      }} />
      <div style={{
        position: 'absolute', bottom: '-20%', right: '-10%', width: 600, height: 600,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        filter: 'blur(80px)', animation: 'float-orb 10s ease-in-out infinite reverse',
        willChange: 'transform, filter',
        transform: 'translateZ(0)'
      }} />

      {/* Top Right Theme Toggle */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 100 }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 16px', borderRadius: 100, border: '1px solid var(--border-glass)',
          background: 'var(--bg-card)', color: 'var(--text-main)',
          cursor: 'pointer', transition: 'var(--transition-ultra)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backdropFilter: 'blur(10px)'
        }}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span style={{ fontSize: 13, fontWeight: 700 }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {stage !== 'success' ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 2 }}>

            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                style={{
                  width: 56, height: 56, display: 'grid', placeItems: 'center',
                  margin: '0 auto 20px',
                }}>
                <Logo size={56} />
              </motion.div>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 6 }}>
                AURA <span style={{ color: 'var(--primary)' }}>AI</span>
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
                AI-Powered Ambassador Management Platform
              </p>
            </div>

            {/* Login card */}
            <div className="glass-card" style={{ padding: '36px 32px' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Welcome back</h2>
              <p style={{ color: 'var(--text-dim)', fontSize: 13, marginBottom: 28 }}>
                Sign in to access your ambassador dashboard.
              </p>

              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
                    Email Address
                  </label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="ambassador@campus.edu" className="premium-input"
                    style={{ fontSize: 14, height: 48 }} required disabled={stage !== 'idle'}
                  />
                </div>

                <div style={{ marginBottom: 24, position: 'relative' }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPass ? 'text' : 'password'} value={password}
                      onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                      className="premium-input"
                      style={{ fontSize: 14, height: 48, paddingRight: 48 }} required disabled={stage !== 'idle'}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{
                      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 4,
                    }}>
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                    Remember me
                  </label>
                  <span style={{ fontSize: 13, color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                    Forgot password?
                  </span>
                </div>

                <button type="submit" className="btn-primary" disabled={stage !== 'idle'}
                  style={{
                    width: '100%', padding: '14px 0', fontSize: 15, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: stage === 'loading' ? 'linear-gradient(135deg, #10b981, #059669)' : undefined,
                  }}>
                  {btnContent[stage]}
                </button>
              </form>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
                <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
                <span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
              </div>

              <button 
                onClick={() => { setEmail('demo@campus.edu'); setPassword('demo1234'); }}
                disabled={stage !== 'idle'}
                className="btn-outline"
                style={{ opacity: stage !== 'idle' ? 0.4 : 1 }}
              >
                🚀 Use Demo Credentials
              </button>
            </div>

            {/* Footer */}
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-dim)', marginTop: 24 }}>
              Built for AICore Connect Hackathon 2026 • Powered by GenAI
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', zIndex: 10 }}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                width: 80, height: 80, borderRadius: 24, display: 'grid', placeItems: 'center',
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                margin: '0 auto 32px', color: 'var(--primary)',
              }}>
              <Sparkles size={40} className="pulse-glow" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Welcome back, <span className="text-gradient">Ambassador</span>
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ color: 'var(--text-dim)', fontSize: 16, maxWidth: 400, margin: '0 auto 40px' }}>
              Initializing your AI intelligence workspace and syncing real-time GitHub metrics.
            </motion.p>
            
            <div style={{ width: 240, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 4, margin: '0 auto', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary-glow)' }}
              />
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ display: 'block', marginTop: 12, fontSize: 11, color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Syncing Neural Core...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes float-orb {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
