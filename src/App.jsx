import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Zap,
  Bell,
  Search,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Mock data for the chart - easy to replace tomorrow
const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 700 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-${color}-500 bg-opacity-10 text-${color}-500`}>
        <Icon size={24} style={{ color: color }} />
      </div>
      <span className="badge badge-success">+{change}%</span>
    </div>
    <div>
      <p className="text-dim text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  </motion.div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-glow">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight">AURA <span className="text-primary">AI</span></h2>
        </div>

        <nav className="flex flex-col gap-2">
          <a href="#" className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </a>
          <a href="#" className={`nav-link ${activeTab === 'ambassadors' ? 'active' : ''}`} onClick={() => setActiveTab('ambassadors')}>
            <Users size={20} /> Ambassadors
          </a>
          <a href="#" className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
            <CheckSquare size={20} /> Task Verification
          </a>
          <a href="#" className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={20} /> Deep Insights
          </a>
        </nav>

        <div className="mt-auto p-4 glass-card bg-primary bg-opacity-5 border-primary border-opacity-20">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">AI System Active</span>
          </div>
          <p className="text-[11px] text-muted leading-relaxed">
            Ready to analyze incoming data and verify ambassador tasks in real-time.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="flex justify-between items-center mb-10 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold mb-1">Hackathon Command Center</h1>
            <p className="text-dim">Waiting for problem statement reveal...</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-card flex items-center px-4 py-2 gap-2">
              <Search size={18} className="text-dim" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm text-main w-64"
              />
            </div>
            <button className="glass-card p-2 text-dim hover:text-main">
              <Bell size={20} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-white border-opacity-10"></div>
          </div>
        </header>

        <section className="grid-layout mb-8">
          <StatCard title="Active Ambassadors" value="1,284" change="12" icon={Users} color="#10b981" />
          <StatCard title="Tasks Completed" value="8,492" change="24" icon={CheckSquare} color="#3b82f6" />
          <StatCard title="Avg. Engagement" value="76%" change="8" icon={Zap} color="#f59e0b" />
          <StatCard title="AI Confidence" value="98.2%" change="2" icon={Sparkles} color="#8b5cf6" />
        </section>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 glass-card p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Performance Overview</h3>
              <select className="bg-transparent border border-white border-opacity-10 rounded-lg px-3 py-1 text-sm outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-100">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-8 flex flex-col gap-6">
            <h3 className="text-xl font-bold">AI Activity Feed</h3>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 p-3 rounded-xl hover:bg-white hover:bg-opacity-5 transition-all">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Task Verified by AI</p>
                    <p className="text-xs text-dim">Ambassador #4321 submission approved automatically.</p>
                    <p className="text-[10px] text-primary font-bold mt-1">2 mins ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-auto w-full py-3 rounded-xl bg-primary bg-opacity-10 text-primary font-bold text-sm border border-primary border-opacity-20 hover:bg-opacity-20 transition-all flex items-center justify-center gap-2">
              View All Logs <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
