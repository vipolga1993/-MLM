import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Mail, Send, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';

export default function Auth({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [view, setView] = useState<'login' | 'register'>('login');

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // MOCK LOGIN FOR MVP
    setTimeout(() => {
      const mockSession = {
        user: { id: 'mock-user-id', email: email },
      };
      localStorage.setItem('mlm_session', JSON.stringify(mockSession));
      
      setMessage({ type: 'success', text: 'Успешный вход! Перенаправляем...' });
      setLoading(false);
      
      // Force a reload or a state update in a real app, here we rely on App.tsx effect
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-surface-dark">
      {/* Background patterns */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 rounded-[3rem] border-white/5 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Премиальный доступ</span>
          </div>
          <h2 className="text-4xl font-black italic serif uppercase tracking-tight mb-2">
            {view === 'login' ? 'С возвращением' : 'Новое начало'}
          </h2>
          <p className="text-sm text-white/40 font-medium italic">
            {view === 'login' 
              ? 'Ваш AI-архитектор ждет вас' 
              : 'Присоединяйтесь к лидерам нового поколения'}
          </p>
        </div>

        <form onSubmit={handleMagicLink} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-4">Email адрес</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reels@expert.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-white/10 focus:border-brand-purple/50 outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-5 bg-white text-surface-dark rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-surface-dark/20 border-t-surface-dark rounded-full animate-spin" />
            ) : (
              <>Вход через Magic Link <ChevronRight size={16} /></>
            )}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">или</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <button 
            type="button"
            className="w-full py-5 bg-[#24A1DE]/10 border border-[#24A1DE]/20 text-[#24A1DE] rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#24A1DE]/20 transition-all"
          >
            <Send size={18} /> Войти через Telegram
          </button>
        </form>

        {message && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-4 rounded-2xl border flex items-start gap-3 ${
              message.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {message.type === 'success' ? <Sparkles size={18} /> : <AlertCircle size={18} />}
            <p className="text-xs font-bold leading-relaxed">{message.text}</p>
          </motion.div>
        )}

        <div className="mt-10 pt-10 border-t border-white/5 text-center">
          <p className="text-xs font-medium text-white/20 tracking-wide">
            {view === 'login' ? 'Впервые у нас?' : 'Уже есть аккаунт?'}
            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="ml-2 text-brand-purple font-black uppercase tracking-widest text-[10px] hover:text-brand-purple/80 transition-colors"
            >
              {view === 'login' ? 'Регистрация' : 'Вход'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
