import React from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  History, 
  Calendar, 
  Settings, 
  ChevronRight, 
  Sparkles,
  Zap,
  BarChart3,
  Star,
  ShieldCheck
} from 'lucide-react';

interface DashboardProps {
  profile: any;
  onNavigate: (view: any) => void;
  onLogout: () => void;
}

export default function Dashboard({ profile, onNavigate, onLogout }: DashboardProps) {
  const stats = [
    { label: 'Создано сценариев', value: profile?.scenarios_count || 0, icon: <Sparkles className="text-brand-purple" /> },
    { label: 'Контент-планов', value: profile?.plans_count || 0, icon: <Calendar className="text-brand-blue" /> },
    { label: 'Последняя активность', value: 'Сегодня', icon: <History className="text-white/40" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Settings/Logout toggle */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-purple" />
          <h2 className="text-sm font-black italic serif uppercase tracking-widest text-white/40">Кабинет Лидера</h2>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('settings')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 transition-all"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-8 rounded-[2.5rem] glass-card border-white/5 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <div>
              <h2 className="text-2xl font-black italic serif uppercase tracking-tight">Привет, {profile?.full_name || 'Лидер'}</h2>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                  profile?.subscription_tier === 'free' ? 'bg-white/10 text-white/40' : 
                  profile?.subscription_tier === 'pro' ? 'bg-brand-purple/20 text-brand-purple' : 
                  'bg-brand-blue/20 text-brand-blue'
                }`}>
                  {profile?.subscription_tier || 'Free'} Plan
                </span>
                <span className="text-[10px] text-white/20 font-bold">•</span>
                <span className="text-[10px] text-white/40 font-bold italic">{profile?.niche || 'MLM Architect'}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-white/50 leading-relaxed font-medium mb-6 max-w-lg italic">
            Рады видеть вас снова. Сегодня отличный день, чтобы создать виральный контент и привлечь новых партнеров в команду.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('generate')}
              className="px-6 py-3 bg-white text-surface-dark rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
            >
              <Plus className="w-4 h-4" /> Создать новый сценарий
            </button>
            <button 
              onClick={() => onNavigate('content-plan')}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all"
            >
              <Calendar className="w-4 h-4" /> Контент-план
            </button>
          </div>
        </div>
        
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[2rem] glass-card border-white/5 border hover:border-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              <BarChart3 className="w-4 h-4 text-white/10" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black serif italic tracking-tighter">{stat.value}</h4>
          </motion.div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button 
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('scenarios')}
          className="group relative overflow-hidden text-left p-8 rounded-[2.5rem] glass-card border-white/5 border hover:bg-white/[0.02] transition-all"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-6 text-brand-purple">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black italic serif uppercase tracking-tight mb-2">Мои Сценарии</h3>
            <p className="text-xs text-white/40 font-medium mb-6 italic">Библиотека всех ваших генераций и идей для видео.</p>
            <div className="flex items-center gap-2 text-brand-purple text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
              Открыть список <ChevronRight size={14} />
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-brand-purple/5 blur-[40px] rounded-full pointer-events-none" />
        </motion.button>

        <motion.button 
          whileHover={{ y: -4 }}
          onClick={() => onNavigate('content-plans-list')}
          className="group relative overflow-hidden text-left p-8 rounded-[2.5rem] glass-card border-white/5 border hover:bg-white/[0.02] transition-all"
        >
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 text-brand-blue">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black italic serif uppercase tracking-tight mb-2">Контент-планы</h3>
            <p className="text-xs text-white/40 font-medium mb-6 italic">Структурированные планы публикаций на неделю и месяц.</p>
            <div className="flex items-center gap-2 text-brand-blue text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
              Открыть список <ChevronRight size={14} />
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-brand-blue/5 blur-[40px] rounded-full pointer-events-none" />
        </motion.button>
      </div>

      {/* Referral/Action Banner */}
      <div className="p-8 rounded-[2.5rem] bg-indigo-600/10 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-1">Переходите на Business</h4>
            <p className="text-xs text-white/40 font-medium italic">Разблокируйте безлимитную генерацию и командный режим.</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('pricing')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg"
        >
          Обновить тариф
        </button>
      </div>
    </div>
  );
}
