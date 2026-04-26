import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import Logo from '../components/Logo';
import { Award, Flame, Star, Trophy, Target, Lock, CheckCircle, Download, Share2, Sparkles } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const badges = [
  { id: 1, name: 'First Commit', desc: 'Made your first GitHub contribution.', icon: '🚀', unlocked: true, color: '#10b981' },
  { id: 2, name: 'Documentation Wizard', desc: 'Created professional READMEs on 3+ repos.', icon: '📝', unlocked: true, color: '#3b82f6' },
  { id: 3, name: 'Streak Master', desc: 'Maintained a 7-day coding streak.', icon: '🔥', unlocked: true, color: '#f97316' },
  { id: 4, name: 'Social Butterfly', desc: 'Shared 5+ posts about the program.', icon: '🦋', unlocked: true, color: '#8b5cf6' },
  { id: 5, name: 'Referral Champion', desc: 'Referred 10 friends to the platform.', icon: '🏆', unlocked: false, color: '#f59e0b', progress: 70 },
  { id: 6, name: 'Code Architect', desc: 'Scored 90+ on AI Code Quality Assessment.', icon: '🏛️', unlocked: false, color: '#ec4899', progress: 55 },
  { id: 7, name: 'Community Leader', desc: 'Hosted 3 workshops or webinars.', icon: '👥', unlocked: false, color: '#14b8a6', progress: 33 },
  { id: 8, name: 'Legendary Ambassador', desc: 'Completed all tasks in a single month.', icon: '👑', unlocked: false, color: '#fbbf24', progress: 15 },
];

const streakDays = [
  { day: 'Mon', active: true }, { day: 'Tue', active: true },
  { day: 'Wed', active: true }, { day: 'Thu', active: true },
  { day: 'Fri', active: true }, { day: 'Sat', active: false },
  { day: 'Sun', active: false },
];

const rewards = [
  { title: 'Premium Mentorship Session', cost: 500, available: true },
  { title: 'Company Swag Box', cost: 350, available: true },
  { title: 'Certificate of Excellence', cost: 200, available: true },
  { title: 'LinkedIn Recommendation', cost: 750, available: false },
];

const Rewards = () => {
  const [tab, setTab] = useState('badges');
  const [points, setPoints] = useState(475);
  const [rewardList, setRewardList] = useState(rewards);
  const [redeemed, setRedeemed] = useState([]);
  const [showSuccess, setShowSuccess] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const userData = JSON.parse(localStorage.getItem('profileData') || '{"name": "Ambassador", "university": "Mumbai University"}');

  const handleRedeem = (reward) => {
    if (points < reward.cost || redeemed.includes(reward.title)) return;
    setPoints(prev => prev - reward.cost);
    setRedeemed(prev => [...prev, reward.title]);
    setShowSuccess(reward.title);
    setTimeout(() => setShowSuccess(null), 2500);
  };

  const remaining = 1000 - points;

  // 🛡️ Prevent double scrollbars when certificate is open
  React.useEffect(() => {
    if (showCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showCertificate]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', inset: 0, zIndex: 10000, 
              background: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(20px)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              padding: '60px 20px', overflowY: 'auto' 
            }}>
            <motion.div 
              id="certificate-print-area"
              initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 1.1, opacity: 0 }}
              style={{ 
                width: 'min(95vw, 850px)', background: '#fff', borderRadius: 24, 
                padding: 4, boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)', 
                flexShrink: 0, marginBottom: 40, position: 'relative'
              }}>
              
              {/* Certificate Inner Frame */}
              <div style={{ 
                border: '15px solid #f8fafc', height: '100%', borderRadius: 20, 
                padding: 'min(8vw, 60px) min(6vw, 40px)', position: 'relative', 
                color: '#1e293b', textAlign: 'center', display: 'flex', 
                flexDirection: 'column', justifyContent: 'center' 
              }}>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: 20, left: 20, width: '15%', height: '15%', borderLeft: '2px solid #e2e8f0', borderTop: '2px solid #e2e8f0' }} />
                <div style={{ position: 'absolute', bottom: 20, right: 20, width: '15%', height: '15%', borderRight: '2px solid #e2e8f0', borderBottom: '2px solid #e2e8f0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'min(6vw, 40px)' }}>
                  <Logo size={56} light={true} />
                </div>

                <h1 style={{ fontSize: 'clamp(20px, 5.5vw, 42px)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, color: '#0f172a', lineHeight: 1.1 }}>Certificate of Excellence</h1>
                <p style={{ fontSize: 'clamp(10px, 2vw, 12px)', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 'min(8vw, 40px)' }}>This is to certify that</p>
                
                <h2 style={{ fontSize: 'clamp(28px, 8vw, 48px)', fontWeight: 800, color: '#10b981', marginBottom: 12, fontStyle: 'italic', lineHeight: 1 }}>{userData.name}</h2>
                <div style={{ width: '30%', height: 1, background: '#e2e8f0', margin: '0 auto 24px' }} />
                
                <p style={{ fontSize: 'clamp(13px, 3vw, 18px)', color: '#475569', lineHeight: 1.5, maxWidth: 550, margin: '0 auto min(10vw, 40px)' }}>
                  Has demonstrated exceptional technical leadership and commitment as a 
                  <strong style={{ color: '#0f172a' }}> Campus Ambassador</strong> at 
                  <strong style={{ color: '#10b981' }}> {userData.university}</strong>.
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', gap: 10 }}>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ height: 1, width: '80%', maxWidth: 120, background: '#cbd5e1', marginBottom: 8 }} />
                    <p style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>Program Director</p>
                  </div>
                  
                  {/* Neural Seal */}
                  <div style={{ position: 'relative', width: 'min(15vw, 80px)', height: 'min(15vw, 80px)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <Sparkles size={50} color="#facc15" style={{ opacity: 0.2, position: 'absolute' }} />
                    <div style={{ width: '80%', height: '80%', borderRadius: '50%', border: '1px dashed #facc15', display: 'grid', placeItems: 'center' }}>
                      <span style={{ fontSize: 'clamp(6px, 1.2vw, 8px)', fontWeight: 900, color: '#854d0e' }}>AURA AI</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flex: 1 }}>
                    <p style={{ fontSize: 'clamp(7px, 1.2vw, 9px)', fontWeight: 800, color: '#64748b', marginBottom: 2 }}>VERIFICATION HASH</p>
                    <p style={{ fontSize: 'clamp(6px, 1vw, 8px)', fontFamily: 'monospace', color: '#94a3b8', wordBreak: 'break-all' }}>AURA-0x7F2B{Math.random().toString(36).substring(7).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Premium Action Buttons */}
            <div className="certificate-actions" style={{ display: 'flex', gap: 12, marginTop: 24, paddingBottom: 60, flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '95vw' }}>
              <button 
                onClick={() => setShowCertificate(false)}
                className="btn-primary" 
                style={{ 
                  background: 'rgba(239, 68, 68, 0.1)', 
                  color: '#ef4444', 
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  padding: '12px 20px',
                  fontSize: 12,
                  fontWeight: 700,
                  borderRadius: 12
                }}>
                Close Viewer
              </button>
              
              <button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="btn-primary" style={{ 
                  background: 'var(--primary)', 
                  padding: '12px 24px',
                  fontSize: 12,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  borderRadius: 12,
                  boxShadow: '0 10px 20px -5px var(--primary-glow)',
                }}>
                <Download size={18} /> Download Neural PDF
              </button>
              
              <button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (window.location.hostname === 'localhost') {
                    alert("LinkedIn Sharing: This feature requires a live URL. Once you deploy to Vercel, this will automatically generate a preview of your certificate!");
                  } else {
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                  }
                }}
                className="btn-primary" style={{ 
                background: '#0077b5', 
                padding: '12px 24px',
                fontSize: 12,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                borderRadius: 12,
                boxShadow: '0 10px 20px -5px rgba(0, 119, 181, 0.3)',
              }}>
                <Share2 size={18} /> Share
              </button>
            </div>

            <style>{`
              @media print {
                html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                body * { visibility: hidden; }
                #certificate-print-area, #certificate-print-area * { visibility: visible; }
                #certificate-print-area {
                  position: absolute; left: 0; top: 0; width: 100vw !important; height: 100vh !important;
                  max-width: none !important; box-shadow: none !important; margin: 0 !important;
                  padding: 0 !important; border: none !important; border-radius: 0 !important;
                }
                .certificate-actions { display: none !important; }
                @page { size: landscape; margin: 0; }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Success popup */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', top: 24, right: 24, zIndex: 999,
            padding: '16px 28px', borderRadius: 16,
            background: 'linear-gradient(135deg, var(--primary), #059669)',
            color: '#fff', fontWeight: 700, fontSize: 14,
            boxShadow: '0 8px 32px rgba(16,185,129,0.3)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
          🎉 "{showSuccess}" redeemed successfully!
        </motion.div>
      )}

      <header style={{ marginBottom: 40 }}>
        <h1 className="text-gradient" style={{ fontSize: 34, fontWeight: 800, marginBottom: 6 }}>
          Rewards & Recognition
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 15 }}>
          Earn badges, maintain streaks, and redeem exclusive rewards.
        </p>
      </header>

      {/* Points + Streak summary */}
      <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
        <div className="glass-card" style={{ padding: 28 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, marginBottom: 8 }}>Your Total Points</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <motion.h2 key={points}
              initial={{ scale: 1.3, color: '#10b981' }}
              animate={{ scale: 1, color: '#10b981' }}
              style={{ fontSize: 40, fontWeight: 800 }}>{points}</motion.h2>
            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>points earned</span>
          </div>
          <div style={{ marginTop: 16, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 6, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(points / 1000) * 100}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), #059669)', borderRadius: 6 }} />
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 8 }}>{remaining > 0 ? `${remaining} more points to reach Gold tier` : '🏆 Gold tier reached!'}</p>
        </div>

        <div className="glass-card" style={{ padding: 28 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, marginBottom: 12 }}>
            <Flame size={14} style={{ verticalAlign: 'middle', color: '#f97316', marginRight: 4 }} />
            Weekly Coding Streak
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            {streakDays.map(d => (
              <div key={d.day} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center',
                  background: d.active ? 'var(--primary-glow)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${d.active ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  margin: '0 auto 6px',
                }}>
                  {d.active ? <Flame size={18} style={{ color: '#f97316' }} /> : <span style={{ color: 'var(--text-dim)', fontSize: 12 }}>-</span>}
                </div>
                <span style={{ fontSize: 10, color: d.active ? 'var(--text-main)' : 'var(--text-dim)', fontWeight: 600 }}>{d.day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#f97316' }}>5 Day Streak! 🔥</p>
            <button 
              onClick={() => setShowCertificate(true)}
              className="btn-primary" 
              style={{ padding: '8px 16px', fontSize: 12, background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
              <Award size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              Generate Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {['badges', 'store'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '10px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
            background: tab === t ? 'var(--primary-glow)' : 'transparent',
            color: tab === t ? 'var(--primary)' : 'var(--text-dim)',
            cursor: 'pointer', fontWeight: 700, fontSize: 13, textTransform: 'capitalize',
          }}>{t === 'badges' ? '🏅 Badges' : '🎁 Reward Store'}</button>
        ))}
      </div>

      {tab === 'badges' ? (
        <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {badges.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card"
              style={{
                padding: 24, textAlign: 'center', position: 'relative',
                opacity: b.unlocked ? 1 : 0.5,
              }}>
              {!b.unlocked && (
                <Lock size={16} style={{
                  position: 'absolute', top: 16, right: 16, color: 'var(--text-dim)',
                }} />
              )}
              <div style={{ fontSize: 40, marginBottom: 12 }}>{b.icon}</div>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{b.name}</h4>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 12 }}>{b.desc}</p>
              {b.unlocked ? (
                <span style={{
                  fontSize: 10, padding: '4px 12px', borderRadius: 8,
                  background: `${b.color}15`, color: b.color,
                  border: `1px solid ${b.color}30`, fontWeight: 700,
                }}>UNLOCKED</span>
              ) : (
                <div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
                    <div style={{ width: `${b.progress}%`, height: '100%', background: b.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{b.progress}% Complete</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {rewardList.map((r, i) => {
            const isRedeemed = redeemed.includes(r.title);
            const canRedeem = r.available && points >= r.cost && !isRedeemed;
            return (
              <motion.div key={r.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card"
                style={{
                  padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderColor: isRedeemed ? 'rgba(16,185,129,0.2)' : undefined,
                }}>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{r.title}</h4>
                  <p style={{ fontSize: 13, color: isRedeemed ? 'var(--primary)' : '#f59e0b', fontWeight: 700 }}>
                    {isRedeemed ? '✓ Redeemed' : `${r.cost} Points`}
                  </p>
                </div>
                <button
                  onClick={() => handleRedeem(r)}
                  disabled={!canRedeem}
                  className="btn-primary"
                  style={{
                    fontSize: 12, padding: '10px 24px',
                    opacity: canRedeem ? 1 : 0.4,
                    background: isRedeemed ? 'rgba(16,185,129,0.15)' : undefined,
                    boxShadow: isRedeemed ? 'none' : undefined,
                  }}>
                  {isRedeemed ? '✓ Claimed' : canRedeem ? 'Redeem' : 'Locked'}
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rewards;
