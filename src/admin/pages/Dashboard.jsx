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
  const { clients, showcases, contacts, artistRegistrations } = useData();

  // Count stats
  const totalClients = clients.length;
  const activeShowcases = showcases.filter(s => s.status === 'active').length;
  const unreadMessages = contacts.filter(c => c.status === 'unread').length;
  const pendingArtists = artistRegistrations.filter(a => a.applicationStatus === 'Pending').length;

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
    },
    {
      title: "Pending Artists",
      value: pendingArtists,
      sub: "Registrations to review",
      icon: <UserPlus className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/10 to-teal-500/5 hover:border-emerald-500/20",
      path: "/admin/artist-registrations"
    }
  ];

  const recentArtists = artistRegistrations.slice(0, 3);
  const recentMessages = contacts.slice(0, 3);

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
              Manage your casting agency portfolio, media resources, student course testimonials, shoot bookings, and applicant files in one modern dashboard.
            </p>
          </div>
          <Link
            to="/admin/artist-registrations"
            className="flex-shrink-0 self-start md:self-center flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-102 active:scale-98 transition-all font-semibold text-sm"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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

      {/* Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Applications */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4 mb-4 select-none">
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-zinc-400" />
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Recent Applications
              </h3>
            </div>
            <Link 
              to="/admin/artist-registrations" 
              className="text-xs font-bold text-primary dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {recentArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-100/60 dark:border-zinc-800/40 hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={artist.profilePhoto} 
                    alt={artist.fullName} 
                    className="w-10 h-10 rounded-xl object-cover" 
                  />
                  <div className="flex flex-col text-left">
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {artist.fullName}
                    </p>
                    <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {artist.category} • {artist.age} yrs • {artist.city}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  artist.applicationStatus === 'Approved' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                    : artist.applicationStatus === 'Rejected' 
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-450' 
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                }`}>
                  {artist.applicationStatus}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Inbox Messages */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-3xl border border-zinc-150/80 dark:border-zinc-900 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md shadow-sm flex flex-col"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-4 mb-4 select-none">
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
            {recentMessages.map((msg) => (
              <div 
                key={msg.id} 
                className="flex items-start justify-between p-3 rounded-2xl border border-zinc-100/60 dark:border-zinc-800/40 hover:bg-zinc-50/40 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <div className="flex flex-col text-left gap-1 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      {msg.name}
                    </p>
                    {msg.status === 'unread' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 truncate">
                    {msg.subject}
                  </p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate leading-relaxed">
                    {msg.message}
                  </p>
                </div>
                <span className="text-[9px] text-zinc-400 whitespace-nowrap">
                  {new Date(msg.createdDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
