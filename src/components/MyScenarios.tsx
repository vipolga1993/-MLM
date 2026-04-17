import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Download, 
  Star, 
  Trash2, 
  ChevronLeft,
  Calendar,
  Instagram,
  Youtube,
  Send,
  Globe
} from 'lucide-react';

interface MyScenariosProps {
  scenarios: any[];
  onNavigateBack: () => void;
  onSelect: (scenario: any) => void;
}

export default function MyScenarios({ scenarios, onNavigateBack, onSelect }: MyScenariosProps) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredScenarios = scenarios.filter(s => {
    const matchesSearch = s.goal.topic.toLowerCase().includes(search.toLowerCase()) || 
                         s.goal.niche.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.goal.platform === filter;
    return matchesSearch && matchesFilter;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram size={14} />;
      case 'youtube': return <Youtube size={14} />;
      case 'telegram': return <Send size={14} />;
      case 'vk': return <Globe size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <button 
            onClick={onNavigateBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft size={16} /> Назад в кабинет
          </button>
          <h2 className="text-4xl font-black italic serif uppercase tracking-tight">Мои Сценарии</h2>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
            <input 
              type="text"
              placeholder="Поиск по теме..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold w-full md:w-64 focus:border-brand-purple/50 outline-none transition-colors"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-white/5 border border-white/5 rounded-2xl w-fit">
        {['all', 'instagram', 'youtube', 'vk', 'telegram'].map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === p ? 'bg-white text-surface-dark shadow-xl' : 'text-white/40 hover:text-white'
            }`}
          >
            {p === 'all' ? 'Все' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredScenarios.length > 0 ? (
            filteredScenarios.map((scenario, i) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 glass-card border-white/5 border hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:translate-x-1"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                    {getPlatformIcon(scenario.goal.platform)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{scenario.goal.platform}</span>
                      <span className="text-[10px] text-white/10">•</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple">{scenario.goal.niche}</span>
                    </div>
                    <h4 className="text-lg font-black italic serif uppercase tracking-tight mb-1 truncate max-w-md">{scenario.goal.topic}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white/30">
                        <Calendar size={12} /> {new Date(scenario.created_at).toLocaleDateString('ru-RU')}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white/30 uppercase italic">
                        <Sparkles size={12} /> {scenario.goal.goalType}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onSelect(scenario)}
                    className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    Посмотреть <ChevronRight size={14} />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 text-white/20 rounded-xl hover:text-brand-purple hover:border-brand-purple/20 transition-all">
                    <Star size={16} fill={scenario.is_favorite ? "currentColor" : "none"} />
                  </button>
                  <button className="p-3 bg-white/5 border border-white/10 text-white/20 rounded-xl hover:text-red-400 hover:border-red-400/20 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-black italic serif uppercase tracking-tight text-white/20 mb-2">Ничего не найдено</h3>
              <p className="text-xs text-white/10 font-bold italic">Попробуйте изменить запрос или фильтры</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
