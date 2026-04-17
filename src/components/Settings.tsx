import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Globe, 
  Palette, 
  LogOut, 
  ChevronRight, 
  Save,
  CreditCard,
  ChevronLeft
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SettingsProps {
  profile: any;
  onNavigateBack: () => void;
  onLogout: () => void;
  onUpdateProfile: (newProfile: any) => void;
}

export default function Settings({ profile, onNavigateBack, onLogout, onUpdateProfile }: SettingsProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    team_name: profile?.team_name || '',
    niche: profile?.niche || 'БАДы / здоровье',
    city: profile?.city || '',
    default_tone: profile?.default_tone || '😊 Дружелюбный'
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const updatedProfile = {
      ...profile,
      ...formData
    };

    const { error } = await supabase.from('profiles').upsert(updatedProfile);
    
    if (!error) {
      onUpdateProfile(updatedProfile);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={onNavigateBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft size={16} /> Назад
          </button>
          <h2 className="text-4xl font-black italic serif uppercase tracking-tight">Настройки</h2>
        </div>
        
        <button 
          onClick={onLogout}
          className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-500/20 transition-all"
        >
          <LogOut size={14} /> Выйти
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="glass-card p-10 rounded-[3rem] border-white/5 space-y-8">
            <h3 className="text-xl font-black italic serif uppercase tracking-tight flex items-center gap-3">
              <User size={20} className="text-brand-purple" /> Профиль
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Имя</label>
                <input 
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Команда / Бренд</label>
                <input 
                  type="text"
                  value={formData.team_name}
                  onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Направление MLM</label>
                <select 
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors appearance-none"
                >
                  {niches.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Город</label>
                <input 
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold focus:border-brand-purple/50 outline-none transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="px-10 py-5 bg-white text-surface-dark rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-xl"
            >
              <Save size={16} /> {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </form>

          {/* Advanced / API Keys Placeholder */}
          <div className="glass-card p-10 rounded-[3rem] border-white/5 opacity-50 grayscale pointer-events-none">
            <h3 className="text-xl font-black italic serif uppercase tracking-tight flex items-center gap-3 mb-6">
              <LogOut size={20} className="text-brand-blue" /> API Ключи (v2.0)
            </h3>
            <p className="text-xs text-white/40 font-medium italic mb-6">В будущих версиях вы сможете подключить собственные ключи Gemini API для полного контроля лимитов.</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono text-white/20">
              AIzaSy..................................
            </div>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="space-y-6">
          <div className="glass-card p-10 rounded-[3rem] border-white/5">
            <h3 className="text-xl font-black italic serif uppercase tracking-tight flex items-center gap-3 mb-6">
              <CreditCard size={20} className="text-brand-purple" /> Подписка
            </h3>
            
            <div className="p-6 rounded-[2rem] bg-brand-purple/5 border border-brand-purple/20 mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Текущий тариф</p>
              <h4 className="text-2xl font-black serif italic tracking-tighter text-brand-purple">
                {profile?.subscription_tier === 'free' ? 'БЕСПЛАТНО' : profile?.subscription_tier === 'pro' ? 'PRO' : 'BUSINESS'}
              </h4>
            </div>

            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-2 text-xs font-bold text-white/60 italic">
                <ChevronRight size={14} className="text-brand-purple" /> Лимит: {profile?.subscription_tier === 'free' ? '5 сценариев/мес' : 'Безлимит'}
              </li>
              <li className="flex items-center gap-2 text-xs font-bold text-white/60 italic">
                <ChevronRight size={14} className="text-brand-purple" /> Контент-планы: Доступно
              </li>
            </ul>

            <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
              Изменить тариф
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
