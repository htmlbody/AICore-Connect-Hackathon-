import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, LayoutDashboard, Code2, Sparkles, ArrowRight,
  Target, FileText, Flame, Award, ExternalLink, Menu, X, LogOut, User, Search, Command, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import IntelligenceHub from './pages/IntelligenceHub';
import Leaderboard from './pages/Leaderboard';
import TaskBoard from './pages/TaskBoard';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Logo from './components/Logo';

const App = () => {
  // Initialize from localStorage to persist across refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'hub';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(() => {
    return localStorage.getItem('needsOnboarding') !== 'false';
  });
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const mainRef = useRef(null);

  const handleOnboardingComplete = (data) => {
    localStorage.setItem('profileData', JSON.stringify(data));
    localStorage.setItem('userAvatar', data.avatar);
    localStorage.setItem('needsOnboarding', 'false');
    setNeedsOnboarding(false);
  };

  // ⚡ Persist login state
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // ⚡ Persist active tab
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // ⚡ Scroll to top on tab change or login
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [activeTab, isLoggedIn]);

  // ⚡ Force scroll top on browser refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🌞 Theme Engine
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  // ⚡ Command Bar Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandBarOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandBarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { id: 'hub', name: 'Intelligence Hub', icon: LayoutDashboard, action: () => { setActiveTab('hub'); setCommandBarOpen(false); } },
    { id: 'leaderboard', name: 'Leaderboard', icon: Trophy, action: () => { setActiveTab('leaderboard'); setCommandBarOpen(false); } },
    { id: 'tasks', name: 'Task Board', icon: Target, action: () => { setActiveTab('tasks'); setCommandBarOpen(false); } },
    { id: 'rewards', name: 'Rewards', icon: Award, action: () => { setActiveTab('rewards'); setCommandBarOpen(false); } },
    { id: 'profile', name: 'Profile Settings', icon: User, action: () => { setActiveTab('profile'); setCommandBarOpen(false); } },
    { id: 'logout', name: 'Sign Out / Logout', icon: LogOut, action: () => { handleLogout(); setCommandBarOpen(false); } },
    { id: 'onboarding', name: 'Restart Onboarding (Demo)', icon: Sparkles, action: () => { localStorage.setItem('needsOnboarding', 'true'); setNeedsOnboarding(true); setCommandBarOpen(false); } },
  ];

  const filteredCommands = commands.filter(c => 
    c.name.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsLoggingOut(false);
      setActiveTab('hub'); // Reset to home tab on logout
      localStorage.setItem('needsOnboarding', 'true'); // Optional: re-trigger onboarding for demo next time
      setNeedsOnboarding(true);
    }, 2800);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (needsOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (isLoggingOut) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, position: 'relative', overflow: 'hidden', background: 'var(--bg-main)'
      }}>
        {/* Same background orbs for consistency */}
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'float-orb 8s ease-in-out infinite',
          willChange: 'transform, filter',
          transform: 'translateZ(0)'
        }} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', zIndex: 10 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24, display: 'grid', placeItems: 'center',
            background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)',
            margin: '0 auto 32px', color: '#ef4444',
          }}>
            <LogOut size={40} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, color: 'var(--text-main)' }}>
            Closing your session...
          </h2>
          <p style={{ color: 'var(--text-dim)', fontSize: 15, maxWidth: 350, margin: '0 auto 32px' }}>
            Safely encrypting your workspace and securing your intelligence data.
          </p>
          <div style={{ width: 200, height: 3, background: 'var(--border-glass)', borderRadius: 3, margin: '0 auto', overflow: 'hidden' }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '50%', height: '100%', background: '#ef4444', boxShadow: '0 0 10px rgba(239,68,68,0.3)' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const navItems = [
    { id: 'hub', name: 'Intelligence Hub', icon: LayoutDashboard },
    { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
    { id: 'tasks', name: 'Task Board', icon: Target },
    { id: 'rewards', name: 'Rewards', icon: Award },
    { id: 'profile', name: 'Profile', icon: User },
  ];

  const renderPage = () => {
    switch (activeTab) {
      case 'hub': return <IntelligenceHub />;
      case 'leaderboard': return <Leaderboard />;
      case 'tasks': return <TaskBoard />;
      case 'rewards': return <Rewards />;
      case 'profile': return <Profile />;
      default: return <IntelligenceHub />;
    }
  };

  return (
    <div className={`app-container ${sidebarOpen ? 'sidebar-expanded' : ''}`} style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Mobile Header */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={32} />
          <span style={{ fontSize: 18, fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>AURA AI</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: 8 }}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Premium Command Bar Overlay */}
      <AnimatePresence>
        {commandBarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCommandBarOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(3,7,18,0.7)', backdropFilter: 'blur(10px)' }} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              style={{ 
                position: 'fixed', top: '20%', left: '50%', x: '-50%', zIndex: 10001,
                width: '100%', maxWidth: 600, padding: 8
              }}>
              <div className="glass-card" style={{ padding: 0, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Search size={20} style={{ color: 'var(--text-dim)', marginRight: 12 }} />
                  <input 
                    autoFocus
                    placeholder="Search neural commands... (hub, tasks, profile)"
                    value={commandQuery}
                    onChange={e => setCommandQuery(e.target.value)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-main)', fontSize: 16, outline: 'none', width: '100%' }}
                  />
                  <div style={{ display: 'flex', gap: 4 }}>
                    <div style={{ padding: '4px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', fontSize: 10, fontWeight: 700, color: 'var(--text-dim)' }}>ESC</div>
                  </div>
                </div>
                <div style={{ maxHeight: 350, overflowY: 'auto', padding: 8 }}>
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map(cmd => (
                      <motion.button
                        key={cmd.id}
                        whileHover={{ x: 4, background: 'rgba(255,255,255,0.03)' }}
                        onClick={cmd.action}
                        style={{ 
                          width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                          borderRadius: 12, border: 'none', background: 'transparent', color: 'var(--text-main)',
                          cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s'
                        }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', display: 'grid', placeItems: 'center' }}>
                          <cmd.icon size={18} style={{ color: 'var(--primary)' }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{cmd.name}</span>
                        <ArrowRight size={14} style={{ marginLeft: 'auto', opacity: 0.3 }} />
                      </motion.button>
                    ))
                  ) : (
                    <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-dim)', fontSize: 14 }}>
                      No commands found for "{commandQuery}"
                    </div>
                  )}
                </div>
                <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 11 }}>
                    <Command size={12} /> <span>AURA Command Center 2.0</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{filteredCommands.length} actions available</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn" style={{
        position: 'fixed', top: 16, left: 16, zIndex: 100,
        background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12, padding: 10, color: 'var(--text-main)', cursor: 'pointer',
        display: 'none',
      }}>
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="sidebar-overlay" style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 49, display: 'none',
        }} />
      )}

      {/* ═══ SIDEBAR ═══ */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`} style={{
        width: 280, borderRight: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 20px', display: 'flex', flexDirection: 'column',
        gap: 40, background: 'var(--bg-main)', position: 'sticky', top: 0, height: '100vh',
        zIndex: 50, flexShrink: 0, overflowY: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={40} />
          <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em' }}>
            AURA <span style={{ color: 'var(--primary)' }}>AI</span>
          </h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
              borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              transition: 'all 0.3s', width: '100%', textAlign: 'left',
              color: activeTab === item.id ? 'var(--primary)' : 'var(--text-dim)',
              background: activeTab === item.id ? 'var(--primary-glow)' : 'transparent',
            }}>
              <item.icon size={20} /> {item.name}
            </button>
          ))}
        </nav>

        <div style={{ 
          marginTop: 'auto', background: 'rgba(0,0,0,0.15)', padding: 4, borderRadius: 16, 
          display: 'flex', position: 'relative', border: '1px solid var(--border-glass)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {['dark', 'light'].map(t => (
            <button key={t} onClick={() => setTheme(t)} style={{
              flex: 1, padding: '10px 0', display: 'flex', justifyContent: 'center', gap: 8,
              alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
              color: theme === t ? (t === 'dark' ? '#fff' : '#0f172a') : 'var(--text-dim)',
              fontSize: 12, fontWeight: 700, textTransform: 'capitalize', zIndex: 2,
              transition: 'color 0.3s'
            }}>
              {t === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              {t}
            </button>
          ))}
          <motion.div 
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute', top: 4, bottom: 4, 
              left: theme === 'dark' ? 4 : '50%',
              right: theme === 'dark' ? '50%' : 4,
              background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : '#fff',
              borderRadius: 12, zIndex: 1,
              boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.15)' : 'none',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}
          />
        </div>

        <div style={{ padding: '24px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ position: 'relative', width: 8, height: 8 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981' }} />
              <motion.div 
                animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10b981' }} 
              />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-main)', letterSpacing: '0.05em', opacity: 0.9 }}>SYSTEM ACTIVE</span>
          </div>
          <div className="glass-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--primary)', marginBottom: 6, opacity: 0.8 }}>NEURAL CORE 2.0</div>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Analyzing platform-wide intelligence metrics in real-time.
            </p>
          </div>
        </div>

        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
          borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', fontWeight: 600, fontSize: 14,
          transition: 'all 0.3s', width: '100%', textAlign: 'left',
          color: '#ef4444', background: 'rgba(239, 68, 68, 0.05)',
          marginTop: 10
        }}
        onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)'; }}
        onMouseOut={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main ref={mainRef} className="main-content" style={{ flex: 1, padding: '40px 48px', overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width: 1024px) {
          .sidebar {
            position: fixed !important;
            left: -300px;
            transition: left 0.3s ease;
          }
          .sidebar.sidebar-open { left: 0 !important; }
          .sidebar-overlay { display: block !important; }
          .mobile-menu-btn { display: block !important; }
          .main-content { padding: 24px 20px !important; padding-top: 64px !important; }
        }
        @media (max-width: 768px) {
          .main-content { padding: 16px !important; padding-top: 64px !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
