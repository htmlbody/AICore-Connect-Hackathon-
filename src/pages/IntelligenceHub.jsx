import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, FileText, Flame, Sparkles, ExternalLink, Target, Trophy, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchGithubProfile } from '../utils/github';
import { assessGithubProfile } from '../utils/ai';

const GithubIcon = ({ size = 24, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const chartData = [
  { name: 'Jan', score: 45 }, { name: 'Feb', score: 52 },
  { name: 'Mar', score: 48 }, { name: 'Apr', score: 70 },
  { name: 'May', score: 65 }, { name: 'Jun', score: 85, forecast: 85 },
  { name: 'Jul (F)', forecast: 92 },
];

const ActivityHeatmap = () => {
  const squares = Array.from({ length: 91 }, (_, i) => Math.floor(Math.random() * 4));
  const months = ['Apr', 'May', 'Jun'];
  return (
    <div style={{ marginTop: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Flame size={16} color="#f97316" /> Neural Activity Heatmap
      </h3>
      <div className="glass-card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {squares.map((val, i) => (
            <div key={i} style={{ 
              width: 10, height: 10, borderRadius: 2, 
              background: val === 0 ? 'rgba(255,255,255,0.03)' : 
                          val === 1 ? 'rgba(16,185,129,0.2)' : 
                          val === 2 ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.9)',
              boxShadow: val === 3 ? '0 0 5px rgba(16,185,129,0.5)' : 'none'
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 10, color: 'var(--text-dim)', fontWeight: 600 }}>
          <span>90 DAY HISTORY</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <span>Less</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0,1,2,3].map(v => (
                <div key={v} style={{ width: 8, height: 8, borderRadius: 2, background: v === 0 ? 'rgba(255,255,255,0.03)' : v === 1 ? 'rgba(16,185,129,0.2)' : v === 2 ? 'rgba(16,185,129,0.5)' : '#10b981' }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div whileHover={{ y: -4 }} className="glass-card" style={{ padding: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
      <div style={{ padding: 10, borderRadius: 14, backgroundColor: `${color}15`, color }}><Icon size={22} /></div>
    </div>
    <p style={{ color: 'var(--text-dim)', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{title}</p>
    <h3 className="text-gradient" style={{ fontSize: 26, fontWeight: 700 }}>{value}</h3>
  </motion.div>
);

const IntelligenceHub = () => {
  const [githubUrl, setGithubUrl] = useState(() => {
    const saved = localStorage.getItem('profileData');
    if (saved) return JSON.parse(saved).github || '';
    return '';
  });
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);


  // 🤖 Auto-scan if username is provided from onboarding
  React.useEffect(() => {
    if (githubUrl && !showResults && !isScanning) {
      handleScan();
    }
  }, []);

  const handleScan = async () => {
    if (!githubUrl) return;
    setError('');
    setIsScanning(true);
    try {
      const data = await fetchGithubProfile(githubUrl);
      setProfile(data.profile);
      const result = await assessGithubProfile(data);
      setAssessment(result);
      setShowResults(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <header style={{ marginBottom: 48 }}>
        <h1 className="text-gradient" style={{ fontSize: 34, fontWeight: 800, marginBottom: 6 }}>
          Ambassador Intelligence
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 15 }}>
          Analyze GitHub profiles with recruiter-level precision.
        </p>
      </header>

      {!showResults ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>

          <div className="glass-card" style={{ padding: '40px 36px', marginBottom: 32 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 22, margin: '0 auto 28px',
              display: 'grid', placeItems: 'center',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <GithubIcon size={36} />
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Launch GitHub Analysis</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: 32, fontSize: 15 }}>
              Enter an ambassador's GitHub URL to begin the AI&nbsp;audit.
            </p>

            <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
              <GithubIcon size={20} style={{
                position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-dim)',
              }} />
              <input type="text" value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleScan()}
                placeholder="github.com/username"
                className="premium-input"
                style={{ fontSize: 15, paddingLeft: 48, paddingRight: 150, height: 56 }}
              />
              <button onClick={handleScan} disabled={!githubUrl || isScanning}
                className="btn-primary"
                style={{
                  position: 'absolute', right: 5, top: 5, bottom: 5,
                  display: 'flex', alignItems: 'center', gap: 8, paddingInline: 24,
                  opacity: (!githubUrl || isScanning) ? 0.5 : 1,
                }}>
                {isScanning
                  ? <div style={{ width: 18, height: 18, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  : <><span>Analyze</span> <ArrowRight size={16} /></>
                }
              </button>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 12 }}>{error}</p>}
          </div>

          <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: Code2, color: 'var(--primary)', title: 'Code Quality', desc: 'Deep scan of architecture and modularity.' },
              { icon: FileText, color: 'var(--accent)', title: 'Documentation', desc: 'Evaluation of READMEs and comments.' },
              { icon: Flame, color: '#f97316', title: 'Consistency', desc: 'Assessment of commit history health.' },
            ].map(f => (
              <div key={f.title} className="glass-card" style={{ padding: 20, textAlign: 'left' }}>
                <f.icon size={22} style={{ color: f.color, marginBottom: 10 }} />
                <h4 style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{f.title}</h4>
                <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Profile banner */}
          <div className="glass-card responsive-profile-banner" style={{
            padding: 20, display: 'flex', alignItems: 'center', gap: 20,
            borderColor: 'rgba(16,185,129,0.2)', flexWrap: 'wrap',
          }}>
            <img src={profile?.avatar_url} alt="" style={{
              width: 64, height: 64, borderRadius: 16,
              border: '2px solid rgba(16,185,129,0.2)',
            }} />
            <div style={{ flex: 1, minWidth: 200 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>{profile?.name || profile?.login}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: 13 }}>@{profile?.login}</span>
                <span style={{ color: 'var(--text-dim)' }}>•</span>
                <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>{profile?.public_repos} Repos</span>
                <a href={profile?.html_url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-dim)' }}>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-glow-green">{assessment?.global_rank || 'Top Performer'}</span>
              <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6 }}>Verified by AI</p>
            </div>
          </div>

          {/* Stats */}
          <div className="responsive-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <StatCard title="Recruiter Score" value={`${assessment?.recruiter_score ?? 0}/100`} icon={Target} color="#10b981" />
            <StatCard title="Followers" value={profile?.followers} icon={Flame} color="#ef4444" />
            <StatCard title="Public Repos" value={profile?.public_repos} icon={Trophy} color="#f59e0b" />
            <StatCard title="Assessment" value={assessment?.global_rank?.split(' ')[0] || 'Elite'} icon={Sparkles} color="#6366f1" />
          </div>

          {/* Chart + insights */}
          <div className="responsive-grid-2-1" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
            <div className="glass-card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 10 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700 }}>Intelligence Analysis</h3>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {assessment?.top_strengths?.map(s => (
                    <span key={s} className="strength-badge">{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#030712', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }} />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#cg)" 
                      connectNulls
                    />
                    <Area 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      strokeDasharray="6 6"
                      fill="transparent"
                      connectNulls
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <ActivityHeatmap />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="glass-card" style={{ padding: 24, background: 'rgba(16,185,129,0.04)', borderColor: 'rgba(16,185,129,0.15)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={16} style={{ color: 'var(--primary)' }} /> Recruiter Insight
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>"{assessment?.insight}"</p>
              </div>
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>AI Resume Polish</h3>
                <div style={{
                  padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.05)', fontSize: 12,
                  fontFamily: 'monospace', color: 'var(--text-dim)', marginBottom: 14,
                  fontStyle: 'italic', lineHeight: 1.6,
                }}>"{assessment?.resume_bullet}"</div>
                <button className="btn-primary" style={{ 
                  width: '100%', padding: '12px 0', fontSize: 13,
                  background: copied ? '#10b981' : 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                }}
                  onClick={() => { 
                    navigator.clipboard.writeText(assessment?.resume_bullet); 
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}>
                  {copied ? <CheckCircle size={16} /> : <FileText size={16} />}
                  {copied ? 'Copied to Clipboard!' : 'Copy to Resume'}
                </button>
              </div>
              <button onClick={() => setShowResults(false)} style={{
                background: 'none', border: 'none', color: 'var(--text-dim)',
                cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: '8px 0',
              }}>← Analyze another profile</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntelligenceHub;
