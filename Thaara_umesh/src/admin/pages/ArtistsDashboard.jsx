import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  Users, UserPlus, ShieldCheck, ShieldAlert, Key, 
  ArrowRight, Calendar, CheckCircle2, XCircle, Clock
} from 'lucide-react';

const ArtistsDashboard = () => {
  const { artists, profileRequests } = useData();

  // Statistics calculations
  const total = artists.length;
  const pending = artists.filter(a => a.status === 'pending').length;
  const approved = artists.filter(a => a.status === 'approved').length;
  const rejected = artists.filter(a => a.status === 'rejected').length;
  
  const pendingRequestsCount = profileRequests.filter(r => r.status === 'pending').length;
  const approvedRequestsCount = profileRequests.filter(r => r.status === 'approved').length;

  const stats = [
    { name: 'Total Registrations', count: total, icon: <Users className="w-5 h-5" />, color: 'bg-zinc-100 text-zinc-800' },
    { name: 'Pending Approvals', count: pending, icon: <Clock className="w-5 h-5" />, color: 'bg-amber-50 text-amber-700 border-amber-100', link: '/admin/artists/pending' },
    { name: 'Approved Roster', count: approved, icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-green-50 text-green-700 border-green-100', link: '/admin/artists/approved' },
    { name: 'Profile Access Requests', count: pendingRequestsCount, icon: <Key className="w-5 h-5" />, color: 'bg-rose-50 text-rose-700 border-rose-100', link: '/admin/profile-requests' }
  ];

  // Get recent 4 registrations
  const recentArtists = [...artists].slice(0, 4);
  // Get recent 4 requests
  const recentRequests = [...profileRequests].slice(0, 4);

  return (
    <div className="flex flex-col gap-6 text-left">
      
      {/* Header */}
      <div className="flex flex-col text-left">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900">
          Artists Dashboard
        </h1>
        <p className="text-xs md:text-sm text-zinc-500">
          Monitor casting applications, active model roster size, and permission access requests.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white border border-zinc-150 rounded-3xl p-5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{s.name}</span>
              <span className="text-2xl font-black text-zinc-900">{s.count}</span>
            </div>
            {s.link ? (
              <Link 
                to={s.link} 
                className={`w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition-all hover:scale-105 ${s.color}`}
              >
                {s.icon}
              </Link>
            ) : (
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${s.color}`}>
                {s.icon}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Registrations & Access Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        
        {/* Left: Recent Submissions */}
        <div className="lg:col-span-7 bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <UserPlus className="w-4.5 h-4.5 text-primary" /> Recent Applications
            </h3>
            <Link 
              to="/admin/artists/pending" 
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              <span>Manage Queues</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentArtists.length === 0 ? (
            <p className="text-xs text-zinc-400 py-8 text-center">No registrations available.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentArtists.map(art => (
                <div key={art.id} className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-150 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
                      <img src={art.profilePhoto} alt={art.fullName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-800 leading-tight">{art.fullName}</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 font-semibold uppercase tracking-wider">{art.categories}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {art.status === 'pending' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                        Pending
                      </span>
                    )}
                    {art.status === 'approved' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-50 text-green-700 border border-green-100">
                        Approved
                      </span>
                    )}
                    {art.status === 'rejected' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-100">
                        Rejected
                      </span>
                    )}
                    <Link 
                      to={`/admin/artists/${art.id}`}
                      className="p-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-primary transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Recent Profile Access Requests */}
        <div className="lg:col-span-5 bg-white border border-zinc-150 rounded-[2rem] p-6 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <h3 className="text-base font-bold font-serif text-zinc-900 flex items-center gap-2">
              <Key className="w-4.5 h-4.5 text-primary" /> Profile Access Queries
            </h3>
            <Link 
              to="/admin/profile-requests" 
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentRequests.length === 0 ? (
            <p className="text-xs text-zinc-400 py-8 text-center">No profile access requests available.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {recentRequests.map(req => (
                <div key={req.id} className="flex flex-col gap-2 p-3.5 bg-zinc-50 border border-zinc-150 rounded-2xl text-left">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-zinc-800 leading-tight">{req.requesterName}</h4>
                    {req.status === 'pending' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                    {req.status === 'approved' && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                    {req.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed truncate font-medium">
                    Requested: <b>{req.artistName}</b>
                  </p>
                  <p className="text-[9px] text-zinc-400 font-semibold self-end uppercase">
                    {new Date(req.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default ArtistsDashboard;
