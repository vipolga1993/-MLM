import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { User, Briefcase, Zap, Globe, ChevronRight } from 'lucide-react';

export default function CompleteProfile({ user, onComplete }: { user: any, onComplete: (profile: any) => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    team_name: '',
    niche: 'БАДы / здоровье',
    city: ''
  });

  const niches = [
    'БАДы / здоровье',
    'Косметика / уход',
    'Wellness / образ жизни',
    'Товары для дома',
    'Обучение / наставничество',
    'Финансовое направление',
    'Другое'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profileData = {
      id: user.id,
      email: user.email,
      ...formData,
      subscription_tier: 'free',
      scenarios_count: 0,
      plans_count: 0,
      created_at: new Date().toISOString()
    };

    const { error } = await supabase.from('profiles').upsert(profileData);

    if (error) {
      console.error(error);
      alert('Ошибка при сохранении профиля');
    } else {
      onComplete(profileData);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface-dark relative">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full glass-card p-10 rounded-[3rem] border-white/5 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="w-4 h-4 text-brand-purple" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Завершение настройки</span>
          </div>
          <h2 className="text-4xl font-black italic serif uppercase tracking-tight mb-2">О вас</h2>
          <p className="text-sm text-white/40 font-medium italic">Персонализируйте свой AI-архитектор для лучших результатов</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Имя</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Команда / Бренд</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
                <input 
                  type="text"
                  value={formData.team_name}
                  onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                  placeholder="Team Diamond"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Направление MLM</label>
            <select 
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors appearance-none"
            >
              {niches.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Город (опционально)</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
              <input 
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Москва"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-5 bg-brand-purple text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-purple/20 mt-4"
          >
            {loading ? 'Сохранение...' : <>Сохранить и войти <ChevronRight size={16} /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
