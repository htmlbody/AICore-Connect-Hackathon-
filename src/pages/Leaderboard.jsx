import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUp, ArrowDown, Minus, Flame, Star, Award } from 'lucide-react';

const ambassadors = [
  { rank: 1, name: 'Arjun Mehta', username: 'arjunmehta', score: 96, repos: 42, followers: 312, change: 'up', badge: '🔥 Elite', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun' },
  { rank: 2, name: 'Priya Sharma', username: 'priyasharma', score: 93, repos: 38, followers: 287, change: 'up', badge: '⚡ Pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
  { rank: 3, name: 'Rahul Kumar', username: 'rahulkumar', score: 91, repos: 35, followers: 256, change: 'same', badge: '⚡ Pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
  { rank: 4, name: 'Sneha Patel', username: 'snehapatel', score: 88, repos: 31, followers: 198, change: 'down', badge: '🌟 Rising', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha' },
  { rank: 5, name: 'Vikram Singh', username: 'vikramsingh', score: 85, repos: 28, followers: 176, change: 'up', badge: '🌟 Rising', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vikram' },
  { rank: 6, name: 'Ananya Reddy', username: 'ananyareddy', score: 82, repos: 25, followers: 145, change: 'same', badge: '🌟 Rising', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ananya' },
  { rank: 7, name: 'Karan Joshi', username: 'karanjoshi', score: 79, repos: 22, followers: 132, change: 'up', badge: '✨ Starter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=karan' },
  { rank: 8, name: 'Divya Nair', username: 'divyanair', score: 76, repos: 19, followers: 118, change: 'down', badge: '✨ Starter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=divya' },
];

const ChangeIcon = ({ change }) => {
  if (change === 'up') return <ArrowUp size={14} style={{ color: '#10b981' }} />;
  if (change === 'down') return <ArrowDown size={14} style={{ color: '#ef4444' }} />;
  return <Minus size={14} style={{ color: 'var(--text-dim)' }} />;
};

const Leaderboard = () => {
  const [filter, setFilter] = useState('all');

  const topThree = ambassadors.slice(0, 3);
  const rest = ambassadors.slice(3);

  return (
    <div>
      <header style={{ marginBottom: 40 }}>
        <h1 className="text-gradient" style={{ fontSize: 34, fontWeight: 800, marginBottom: 6 }}>
          Ambassador Leaderboard
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 15 }}>
          Top performers ranked by AI-powered recruiter-readiness score.
        </p>
      </header>

      {/* Top 3 Podium */}
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
        {topThree.map((a, i) => {
          const colors = ['#f59e0b', '#9ca3af', '#cd7f32'];
          const sizes = [1.1, 1, 1];
          return (
            <motion.div key={a.rank} whileHover={{ y: -6 }} className="glass-card"
              style={{
                padding: 28, textAlign: 'center', position: 'relative', overflow: 'hidden',
                borderColor: i === 0 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)',
                transform: `scale(${sizes[i]})`,
              }}>
              {i === 0 && <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
              }} />}
              <div style={{ fontSize: 32, marginBottom: 8 }}>{i === 0 ? '👑' : i === 1 ? '🥈' : '🥉'}</div>
              <img src={a.avatar} alt="" style={{
                width: 64, height: 64, borderRadius: '50%', margin: '0 auto 12px',
                border: `3px solid ${colors[i]}`, display: 'block',
              }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{a.name}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>@{a.username}</p>
              <div style={{
                fontSize: 32, fontWeight: 800, color: colors[i], marginBottom: 8,
                textShadow: `0 0 20px ${colors[i]}40`,
              }}>{a.score}</div>
              <span className="badge badge-glow-green">{a.badge}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'elite', 'rising'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 18px', borderRadius: 10, border: '1px solid var(--border-glass)',
            background: filter === f ? 'var(--primary-glow)' : 'transparent',
            color: filter === f ? 'var(--primary)' : 'var(--text-dim)',
            cursor: 'pointer', fontWeight: 600, fontSize: 12, textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                {['Rank', 'Ambassador', 'Score', 'Repos', 'Followers', 'Trend', 'Badge'].map(h => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rest.map((a, i) => (
                <motion.tr key={a.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    borderBottom: '1px solid var(--border-glass)',
                    transition: 'background 0.2s',
                  }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, fontSize: 15 }}>#{a.rank}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={a.avatar} alt="" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>@{a.username}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--primary)' }}>{a.score}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>{a.repos}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-muted)' }}>{a.followers}</td>
                  <td style={{ padding: '14px 20px' }}><ChangeIcon change={a.change} /></td>
                  <td style={{ padding: '14px 20px' }}>
                    <span className="strength-badge">{a.badge}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
