import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (email === 'admin' && password === 'admin') {
      triggerLoginSuccess();
    } else {
      setError('Invalid username or password. For demo, use admin / admin or click Demo Login.');
    }
  };

  const handleDemoLogin = () => {
    setEmail('admin');
    setPassword('admin');
    triggerLoginSuccess();
  };

  const triggerLoginSuccess = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('admin-logged-in', 'true');
      navigate('/admin');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background spotlights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-full max-w-md bg-zinc-950/70 border border-zinc-800/80 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

        {/* Branding header */}
        <div className="flex flex-col items-center text-center gap-2 mb-8 select-none">
          <img
            src="/images/Thaara_Umesh_Logo.png"
            alt="Thaara Umesh Casting Agency"
            className="h-16 w-auto object-contain hover:scale-105 transition-transform"
          />
          <h2 className="text-xl font-serif font-black tracking-wider text-zinc-100 mt-2">
            THAARA UMESH
          </h2>
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest leading-none">
            Admin Portal Secure Access
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/20 text-rose-450 text-xs font-semibold flex items-start gap-2 text-left">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="e.g. admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="e.g. admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Standard Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-sm rounded-xl active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Demo Login Divider */}
          <div className="relative flex py-3 items-center select-none">
            <div className="flex-grow border-t border-zinc-800" />
            <span className="flex-shrink mx-4 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
              Demo Review Bypass
            </span>
            <div className="flex-grow border-t border-zinc-800" />
          </div>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Quick Demo Login</span>
          </button>
        </form>

        <p className="text-[10px] text-zinc-500 text-center mt-6">
          Evaluation Credentials: <span className="text-zinc-400 font-bold">admin / admin</span>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
