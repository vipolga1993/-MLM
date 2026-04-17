import React from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Sparkles, ShieldCheck, ChevronLeft } from 'lucide-react';

export default function Pricing({ onNavigateBack }: { onNavigateBack: () => void }) {
  const tiers = [
    {
      name: 'Бесплатно',
      price: '0 ₽',
      description: 'Для новичков в MLM',
      features: [
        '5 сценариев в месяц',
        'Базовая генерация',
        '7-дневный контент-план',
        'Сообщество в Telegram'
      ],
      buttonText: 'Текущий тариф',
      current: true,
      accent: 'white/10'
    },
    {
      name: 'Pro',
      price: '990 ₽',
      period: '/ мес',
      description: 'Для активных партнеров',
      features: [
        '50 сценариев в месяц',
        'Приоритетный Gemini 2.0',
        '30-дневный контент-план',
        'PDF-экспорт сценариев',
        'История и Избранное',
        'Тон под ваш бренд'
      ],
      buttonText: 'Стать Pro',
      current: false,
      recommended: true,
      accent: 'brand-purple'
    },
    {
      name: 'Business',
      price: '2 990 ₽',
      period: '/ мес',
      description: 'Для лидеров и команд',
      features: [
        'Безлимитные сценарии',
        'Командный режим (до 5 чел)',
        'Несколько MLM компаний',
        'Личный менеджер',
        'Расширенная аналитика',
        'Доступ к новым моделям'
      ],
      buttonText: 'Для лидеров',
      current: false,
      accent: 'brand-blue'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <button 
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-8 mx-auto"
        >
          <ChevronLeft size={16} /> Назад в кабинет
        </button>
        <h2 className="text-5xl font-black italic serif uppercase tracking-tight mb-4">Выберите силу своего AI</h2>
        <p className="text-sm text-white/40 font-medium italic max-w-xl mx-auto">
          Автоматизируйте свой контент и рекрутинг. Выберите тариф, который подходит под ваши текущие цели в бизнесе.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-10 rounded-[3rem] glass-card border flex flex-col h-full transform transition-all hover:scale-[1.02] ${
              tier.recommended ? 'border-brand-purple/50 bg-brand-purple/5' : 'border-white/5'
            }`}
          >
            {tier.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-purple text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brand-purple/20">
                Рекомендуем
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-black italic serif uppercase tracking-tight mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black tracking-tighter">{tier.price}</span>
                {tier.period && <span className="text-sm font-bold text-white/20 tracking-normal">{tier.period}</span>}
              </div>
              <p className="text-xs text-white/40 font-medium italic">{tier.description}</p>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-1 rounded-md bg-${tier.accent}/20 text-${tier.accent === 'white/10' ? 'white/40' : tier.accent}`}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-xs font-bold text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              tier.current 
                ? 'bg-white/5 border border-white/10 text-white/40 cursor-default' 
                : tier.recommended 
                  ? 'bg-brand-purple text-white shadow-xl shadow-brand-purple/20 hover:scale-105 active:scale-95' 
                  : 'bg-white text-surface-dark shadow-xl hover:scale-105 active:scale-95'
            }`}>
              {tier.buttonText}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Безопасность и гарантии</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-white/30 text-xs font-bold italic">
            <ShieldCheck size={16} /> Безопасно через Stripe / ЮKassa
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs font-bold italic">
            <Zap size={16} /> Мгновенный доступ после оплаты
          </div>
          <div className="flex items-center gap-2 text-white/30 text-xs font-bold italic">
            <Sparkles size={16} /> Пожизненные обновления MVP
          </div>
        </div>
      </div>
    </div>
  );
}
