import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Upload, Link, Image, FileText, AlertCircle, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

const initialTasks = [
  { id: 1, title: 'Share Campus Event on LinkedIn', desc: 'Post about the latest campus event with the official hashtag.', type: 'Social Media', points: 50, status: 'pending', deadline: '28 Apr 2026', proof: 'link' },
  { id: 2, title: 'Write a Blog about Your Tech Stack', desc: 'Create a 500+ word blog on Medium/Hashnode about a technology you love.', type: 'Content', points: 100, status: 'pending', deadline: '30 Apr 2026', proof: 'link' },
  { id: 3, title: 'Refer 3 Friends to the Program', desc: 'Get 3 friends to sign up using your referral code.', type: 'Referral', points: 150, status: 'completed', deadline: '25 Apr 2026', proof: 'auto' },
  { id: 4, title: 'Host a Workshop or Webinar', desc: 'Organize a 30-min session on any tech topic for at least 10 attendees.', type: 'Event', points: 200, status: 'pending', deadline: '05 May 2026', proof: 'image' },
  { id: 5, title: 'Create a GitHub README Portfolio', desc: 'Build a professional profile README on your GitHub account.', type: 'GitHub', points: 75, status: 'verified', deadline: '24 Apr 2026', proof: 'link' },
  { id: 6, title: 'Record a 60-second Pitch Video', desc: 'Create a short video pitching why you are the best ambassador.', type: 'Content', points: 125, status: 'pending', deadline: '02 May 2026', proof: 'link' },
];

const statusConfig = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  completed: { label: 'Submitted', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  verified: { label: 'AI Verified ✓', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilter, setActiveFilter] = useState('all');
  const [submitting, setSubmitting] = useState(null);
  const [proofUrl, setProofUrl] = useState('');

  const filtered = activeFilter === 'all' ? tasks : tasks.filter(t => t.status === activeFilter);

  const handleSubmit = (taskId) => {
    if (!proofUrl.trim()) return;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' } : t));
    setSubmitting(null);
    setProofUrl('');
    // Simulate AI verification after 2 seconds
    setTimeout(() => {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'verified' } : t));
    }, 2500);
  };

  const totalPoints = tasks.filter(t => t.status === 'verified').reduce((s, t) => s + t.points, 0);
  const completedCount = tasks.filter(t => t.status === 'verified').length;

  return (
    <div>
      <header style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo size={50} />
        <div>
          <h1 className="text-gradient" style={{ fontSize: 34, fontWeight: 800, marginBottom: 6 }}>
            Task Board
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 15 }}>
            Complete challenges, submit proof, and earn points through AI-verified tasks.
          </p>
        </div>
      </header>

      {/* Summary cards */}
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <div className="glass-card" style={{ padding: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, marginBottom: 4 }}>Total Points Earned</p>
          <h3 className="text-gradient" style={{ fontSize: 32, fontWeight: 800 }}>{totalPoints}</h3>
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, marginBottom: 4 }}>Tasks Verified</p>
          <h3 className="text-gradient" style={{ fontSize: 32, fontWeight: 800 }}>{completedCount}/{tasks.length}</h3>
        </div>
        <div className="glass-card" style={{ padding: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600, marginBottom: 4 }}>Current Streak</p>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: '#f97316' }}>🔥 5 Days</h3>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', 'pending', 'completed', 'verified'].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)} style={{
            padding: '8px 18px', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            background: activeFilter === f ? 'var(--primary-glow)' : 'transparent',
            color: activeFilter === f ? 'var(--primary)' : 'var(--text-dim)',
            cursor: 'pointer', fontWeight: 600, fontSize: 12,
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>{f}</button>
        ))}
      </div>

      {/* Task cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((task, i) => {
          const sc = statusConfig[task.status];
          return (
            <motion.div key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card"
              style={{ padding: 24 }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{task.title}</h3>
                    <span style={{
                      fontSize: 10, padding: '3px 10px', borderRadius: 8,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                      color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase',
                    }}>{task.type}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 10 }}>{task.desc}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-dim)' }}>
                    <span><Clock size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />{task.deadline}</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>+{task.points} pts</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <span style={{
                    padding: '5px 14px', borderRadius: 10, fontSize: 11, fontWeight: 700,
                    background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`,
                  }}>{sc.label}</span>

                  {task.status === 'pending' && submitting !== task.id && (
                    <button onClick={() => setSubmitting(task.id)} className="btn-primary"
                      style={{ fontSize: 12, padding: '8px 20px' }}>
                      <Upload size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />Submit Proof
                    </button>
                  )}

                  {task.status === 'verified' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--primary)' }}>
                      <Sparkles size={14} /> AI Approved
                    </div>
                  )}
                </div>
              </div>

              {/* Submission form */}
              {submitting === task.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input type="text" value={proofUrl} onChange={e => setProofUrl(e.target.value)}
                      placeholder={task.proof === 'link' ? 'Paste your proof URL...' : 'Paste image link...'}
                      className="premium-input" style={{ fontSize: 13, flex: 1 }}
                    />
                    <button onClick={() => handleSubmit(task.id)} className="btn-primary"
                      style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
                      Submit
                    </button>
                    <button onClick={() => { setSubmitting(null); setProofUrl(''); }}
                      style={{
                        background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 12, padding: '8px 16px', color: 'var(--text-dim)',
                        cursor: 'pointer', fontSize: 12,
                      }}>Cancel</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
