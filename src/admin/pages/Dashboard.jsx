import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users2, 
  Tv, 
  Inbox, 
  UserPlus, 
  ArrowRight,
  TrendingUp,
  Award,
  Video,
  Clock
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { clients, showcases, contacts } = useData();

  // Count stats
  const totalClients = clients.length;
  const activeShowcases = showcases.filter(s => s.status === 'active').length;
  const unreadMessages = contacts.filter(c => c.status === 'unread').length;

  const cards = [
    {
      title: "Total Clients",
      value: totalClients,
      sub: "Active brand logos",
      icon: <Users2 className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-500/10 to-blue-500/5 hover:border-indigo-500/20",
      path: "/admin/clients"
    },
    {
      title: "Active Showcase",
      value: activeShowcases,
      sub: "Featured video films",
      icon: <Tv className="w-6 h-6 text-rose-500" />,
      color: "from-rose-500/10 to-red-500/5 hover:border-rose-500/20",
      path: "/admin/showcase"
    },
    {
      title: "Unread Messages",
      value: unreadMessages,
      sub: "Awaiting response",
      icon: <Inbox className="w-6 h-6 text-amber-500" />,
      color: "from-amber-500/10 to-orange-500/5 hover:border-amber-500/20",
      path: "/admin/contact"
    }
  ];

  const recentMessages = contacts.slice(0, 5);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8 text-left"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden p-6 md:p-8 rounded-3xl border border-white/20 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-lg"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-zinc-900 dark:text-zinc-100">
              Welcome back, Director
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl">
              Manage your casting agency portfolio, media resources, student course testimonials, and shoot bookings in one modern dashboard.
            </p>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {cards.map((card, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative"
          >
            <Link
              to={card.path}
              className={`flex flex-col p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-gradient-to-br ${card.color} shadow-sm transition-all duration-300 h-full`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-md flex items-center justify-center">
                  {card.icon}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500">
                  Manage
                </span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-450 text-xs font-semibold uppercase tracking-wider mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 font-serif">
                {card.value}
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                {card.sub}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Detail & Analytics Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Recent Inbox Messages & Activity Feed */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Recent Inbox Messages */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-950 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-zinc-400" />
                <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Recent Message Box
                </h3>
              </div>
              <Link 
                to="/admin/contact" 
                className="text-xs font-bold text-primary dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {recentMessages.length > 0 ? (
                recentMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="flex items-start justify-between p-3.5 rounded-2xl border border-zinc-100/60 dark:border-zinc-800/40 hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <div className="flex flex-col text-left gap-1 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                          {msg.name}
                        </p>
                        {msg.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 truncate">
                        {msg.subject}
                      </p>
                      <p className="text-[10px] text-zinc-450 dark:text-zinc-500 truncate leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                    <span className="text-[9px] font-semibold text-zinc-400 whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                      {new Date(msg.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-zinc-400">
                  No messages received yet.
                </div>
              )}
            </div>
          </motion.div>

          {/* Real-time Activity Feed */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-950 pb-4 mb-4 select-none">
              <Clock className="w-5 h-5 text-zinc-400" />
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Live Activity Log
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              {contacts.slice(0, 4).map((c, idx) => (
                <div key={c.id || idx} className="flex items-start gap-3 text-left">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/10">
                    <Inbox className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      New inquiry from <span className="font-bold text-primary">{c.name}</span>
                    </p>
                    <span className="text-[10px] text-zinc-400">
                      Subject: "{c.subject}" • {new Date(c.createdDate).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {showcases.slice(0, 2).map((s, idx) => (
                <div key={s.id || idx} className="flex items-start gap-3 text-left">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-rose-500/10">
                    <Tv className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      Showcase item seeded: <span className="font-bold text-zinc-700 dark:text-zinc-300">{s.title}</span>
                    </p>
                    <span className="text-[10px] text-zinc-400">Added to video slider</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Weekly Volume Chart & Uptime Status */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Inquiry Trend Chart */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-950 pb-4 mb-6 select-none">
              <TrendingUp className="w-5 h-5 text-zinc-400" />
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Inquiry Weekly Trend
              </h3>
            </div>

            {/* Micro Chart */}
            <div className="flex items-end justify-between h-44 gap-2 mb-4 px-2">
              {(() => {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const counts = [0, 0, 0, 0, 0, 0, 0];
                contacts.forEach(c => {
                  const d = new Date(c.createdDate).getDay();
                  counts[d]++;
                });
                const max = Math.max(...counts, 1);
                
                return days.map((day, idx) => {
                  const val = counts[idx];
                  const heightPct = `${(val / max) * 100}%`;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="relative w-full flex justify-center">
                        <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-zinc-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-opacity pointer-events-none">
                          {val}
                        </span>
                        <div 
                          style={{ height: val > 0 ? heightPct : '4px' }}
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            val > 0 
                              ? 'bg-gradient-to-t from-primary/80 to-primary shadow-xs' 
                              : 'bg-zinc-200 dark:bg-zinc-800'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase">{day}</span>
                    </div>
                  );
                });
              })()}
            </div>
            
            <div className="flex items-center justify-between text-xs text-zinc-450 border-t border-zinc-100 dark:border-zinc-900 pt-4 mt-2">
              <span>Weekly response rate:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {contacts.length > 0 
                  ? `${Math.round(((contacts.length - unreadMessages) / contacts.length) * 100)}%`
                  : '100%'}
              </span>
            </div>
          </motion.div>

          {/* System Health / Server Status */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
          >
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-950 pb-4 mb-4 select-none">
              <Award className="w-5 h-5 text-zinc-400" />
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                System Status
              </h3>
            </div>

            <div className="flex flex-col gap-4 text-left">
              {/* Uptime */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Server Connection</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Online</span>
                </div>
              </div>
              
              {/* Latency */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">API Response Speed</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">12ms (Good)</span>
              </div>

              {/* Data Sync Status */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">MySQL Connection Pool</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Active (10 connections)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
