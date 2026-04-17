import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';
import Auth from './components/Auth';
import CompleteProfile from './components/CompleteProfile';
import Dashboard from './components/Dashboard';
import MyScenarios from './components/MyScenarios';
import Pricing from './components/Pricing';
import Settings from './components/Settings';
import { 
  Sparkles, 
  Layout, 
  Camera, 
  Zap,
  Briefcase,
  Megaphone,
  UserPlus,
  Copy,
  Check,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Smile,
  Flame,
  Star,
  Users,
  Instagram,
  Youtube,
  Send,
  Globe,
  Plus,
  Play,
  RefreshCcw,
  FileText,
  Hash,
  Download,
  Calendar,
  Save,
  CheckCircle,
  Database
} from 'lucide-react';

function AccordionItem({ title, icon, children, defaultOpen = false }: { title: string, icon: React.ReactNode, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden transition-all duration-500">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-brand-purple">
            {icon}
          </div>
          <h3 className="text-xl font-black italic serif uppercase tracking-tight">{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-white/20" /> : <ChevronDown size={20} className="text-white/20" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AdviceCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1 block">{label}</span>
      <p className="text-xs font-bold text-white/80">{value}</p>
    </div>
  );
}
import { generateVideoContent, VideoGoal, VideoPackage } from './services/videoAgent';

const MOCK_PLAN: ContentPlanItem[] = [
  { 
    day: 'Пн', 
    topic: 'Почему у большинства сетевиков нет заявок', 
    type: 'Возражение / Обучение', 
    hook: 'Вот ошибка, из-за которой люди уходят из MLM...', 
    duration: '30 сек',
    thought: 'Разбор мифа о том, что нужно "просто больше звонить". Фокус на автоматизации.',
    cta: 'Напиши "СИСТЕМА", пришлю гайд'
  },
  { 
    day: 'Вт', 
    topic: 'Как я начала без опыта и страха', 
    type: 'История / Бренд', 
    hook: 'Если бы я начинала с нуля, я бы сделала только это...', 
    duration: '15 сек',
    thought: 'Личная история первых шагов. Показ, что страх — это нормально.',
    cta: 'Жми по ссылке в профиле'
  },
  { 
    day: 'Ср', 
    topic: 'Результат партнера через 2 недели', 
    type: 'Кейс / Соц. док', 
    hook: 'Она пришла ко мне с нулевым списком знакомых...', 
    duration: '30 сек',
    thought: 'Скриншот чека партнера и ее отзыв о нашей системе обучения.',
    cta: 'Напиши "РЕЗУЛЬТАТ", чтобы узнать систему'
  },
  { 
    day: 'Чт', 
    topic: 'Один день из жизни MLM-лидера', 
    type: 'Lifestyle', 
    hook: 'Работа в пижаме — это миф или реальность?', 
    duration: '45 сек',
    thought: 'Показ распорядка дня. Работа, спорт, семья. Без пафоса.',
    cta: 'Подпишись, чтобы видеть закулисье'
  },
  { 
    day: 'Пт', 
    topic: 'Почему писать всем подряд — это путь в никуда', 
    type: 'Рекрутинг / Прогрев', 
    hook: 'Вам врали о том, как делать бизнес в 2026 году...', 
    duration: '30 сек',
    thought: 'Сравнение спама и входящих заявок. Почему архитектура воронки важнее списка.',
    cta: 'Напиши "ХОЧУ", если устала от спама'
  },
  { 
    day: 'Сб', 
    topic: 'Главный вопрос про [Ваш Продукт]', 
    type: 'Продукт / FAQ', 
    hook: 'Мне часто пишут: "А это точно работает?"', 
    duration: '30 сек',
    thought: 'Короткий тест-драйв продукта или ответ на частое сомнение клиента.',
    cta: 'Заказать в ЛС со скидкой'
  },
  { 
    day: 'Вс', 
    topic: 'Ищу 3 человек в команду на октябрь', 
    type: 'Рекрутинг / Призыв', 
    hook: 'Я освободила 3 места для личного наставничества.', 
    duration: '15 сек',
    thought: 'Прямой оффер на партнерство. Ограничение по местам и времени.',
    cta: 'Пиши "КОМАНДА", пока есть места'
  }
];

interface ContentPlanItem {
  day: string;
  topic: string;
  type: string;
  hook: string;
  duration: string;
  thought: string;
  cta: string;
}

function PlanRow({ item, index, onGenerate }: { item: ContentPlanItem, index: number, onGenerate: () => void, key?: React.Key }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className={`border-b border-white/5 transition-all ${isExpanded ? 'bg-white/[0.03]' : 'hover:bg-white/[0.01]'}`}>
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-4 px-6 py-5 cursor-pointer select-none"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
          <span className="text-xs font-black">{item.day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white/90 truncate">{item.topic}</h4>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue opacity-60 mt-0.5">{item.type}</p>
        </div>
        <div className="hidden md:block text-[11px] font-medium text-white/40 italic px-4 max-w-[200px] truncate">
          «{item.hook}»
        </div>
        <div className="hidden md:block w-16 text-[10px] font-black text-white/20 uppercase tracking-tighter">
          {item.duration}
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               onGenerate();
             }}
             className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple hover:bg-brand-purple hover:text-white transition-all shadow-lg shadow-brand-purple/10"
           >
             <Play size={12} fill="currentColor" />
           </button>
           {isExpanded ? <ChevronUp size={16} className="text-white/20" /> : <ChevronDown size={16} className="text-white/20" />}
        </div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-20 pb-8 pt-2 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                   <Zap size={14} className="text-brand-purple" /> Хук (Зацепка)
                 </div>
                 <p className="text-sm font-bold text-white/90 italic border-l-2 border-brand-purple/40 pl-4 py-1">«{item.hook}»</p>
               </div>
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                   <Star size={14} className="text-cyan-400" /> Основная мысль
                 </div>
                 <p className="text-[13px] font-medium leading-relaxed text-white/60">{item.thought}</p>
               </div>
               <div className="space-y-4">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                   <MessageSquare size={14} className="text-brand-blue" /> Призыв (CTA)
                 </div>
                 <p className="text-sm font-black text-brand-blue">{item.cta}</p>
                 <button className="flex items-center gap-2 text-[10px] font-black bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all border border-white/5">
                   <Copy size={12} /> Скопировать всё
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const MOCK_RESULT = {
  scenarios: [
    {
      type: "Экспертный",
      name: "Взлом системы рекрутинга",
      description: "Демонстрация вашей глубины понимания рынка и проблем новичков.",
      hook: "Почему 90% сетевиков никогда не увидят чека больше 100$?",
      blocks: [
        { time: "0:00–0:03", role: "ХУК", text: "Почему 90% сетевиков никогда не увидят чека больше 100$?", visual: "Крупный план, серьезное лицо, заголовок на экране" },
        { time: "0:03–0:10", role: "УДЕРЖАНИЕ", text: "Проблема не в компании или продукте. Проблема в методах 2010 года, которые вам до сих пор навязывают на школах.", visual: "Жестикуляция, смена плана на средний" },
        { time: "0:10–0:25", role: "СУТЬ", text: "Если вы до сих пор составляете списки знакомых и бегаете за каждым встречным — вы не строите бизнес, вы занимаетесь спамом. Современный MLM — это про личный бренд и архитектуру входящего трафика.", visual: "Текст тезисами появляется слева от спикера" },
        { time: "0:25–0:30", role: "CTA", text: "Напишите слово 'СИСТЕМА' в комментариях, и я пришлю вам алгоритм, как получать от 5 заявок в день.", visual: "Улыбка, призыв действием к камере" }
      ]
    },
    {
      type: "Эмоциональный",
      name: "Жизнь за кадром",
      description: "Сближение с аудиторией через честное признание и личный инсайд.",
      hook: "Я почти сдалась через месяц после старта...",
      blocks: [
        { time: "0:00–0:03", role: "ХУК", text: "Я почти сдалась через месяц после старта...", visual: "Теплый домашний свет, чашка кофе, взгляд в сторону" },
        { time: "0:03–0:10", role: "УДЕРЖАНИЕ", text: "Было страшно, что не получится. Казалось, что все вокруг успешные, а я стою на месте.", visual: "Перевод взгляда в камеру, легкая улыбка" },
        { time: "0:10–0:25", role: "СУТЬ", text: "Но потом я поняла: успех — это не удача, а работающая технология. Как только я убрала хаос, пошли первые результаты и доверие команды.", visual: "Кадры работы за ноутбуком или прогулки (B-roll)" },
        { time: "0:25–0:30", role: "CTA", text: "Если вам сейчас тоже страшно — напишите мне в ЛС 'ПОДДЕРЖКА', пообщаемся.", visual: "Машем рукой в камеру, титр снизу" }
      ]
    },
    {
      type: "Рекрутинговый",
      name: "Твоя точка входа",
      description: "Прямое предложение партнерства через решение болей аудитории.",
      hook: "Ищу 3 человек, которые устали работать на чужую мечту.",
      blocks: [
        { time: "0:00–0:03", role: "ХУК", text: "Ищу 3 человек, которые устали работать на чужую мечту.", visual: "Динамичный монтаж, уверенный шаг в кадре" },
        { time: "0:03–0:10", role: "УДЕРЖАНИЕ", text: "Мне не нужны все. Мне нужны те, кто готов выделить 2-3 часа в день на создание своего актива.", visual: "Акцент пальцем на камеру, динамичный титр" },
        { time: "0:10–0:25", role: "СУТЬ", text: "Без звонков подругам и навязывания. Мы работаем по системе, где люди сами пишут и спрашивают про условия.", visual: "Показ скриншота уведомлений в телефоне (блюр)" },
        { time: "0:25–0:30", role: "CTA", text: "Жми на кнопку в профиле или пиши 'ХОЧУ' под этим видео.", visual: "Финальный кадр с призывом" }
      ]
    }
  ],
  leadGen: [
    "Напишите слово 'СТАРТ' — отправлю схему",
    "Если хотите такой же результат, напишите 'ПЛАН'",
    "Напишите 'ХОЧУ', и я покажу, с чего начать"
  ],
  subtitles: [
    { time: "00:01–00:03", text: "Мечтал о бизнесе без рисков?" },
    { time: "00:03–00:06", text: "Но натыкался на отказы и списки знакомых?" },
    { time: "00:06–00:09", text: "Мир изменился. MLM теперь — это AI и охваты." }
  ],
  marketing: {
    description: "Знаешь, в чем главная ошибка новичка? ❌ Попытка продать тем, кому это не нужно. \n\nВ этом видео я делюсь алгоритмом, который перевернул мое представление о сетевом. Без давления и спама. Работаем только с «горячим» интересом. \n\nА как работаешь ты? Старым методом или через входящие?",
    hashtags: "#бизнесдома #сетевойонлайн #рекрутинг #развитиеличногобренда #mlmбизнес #работавтелефоне #дополнительныйдоход",
    covers: [
      "ХВАТИТ СПАМИТЬ",
      "MLM ЗА 2 ЧАСА",
      "МОЙ ЧЕК ЗА МЕСЯЦ"
    ]
  },
  shooting: {
    angle: "На уровне глаз, чуть сверху для большего доверия",
    light: "Мягкий дневной или кольцевая лампа (теплый свет)",
    background: "Минималистичный интерьер или аккуратное рабочее место",
    movement: "Небольшие наезды (zoom) на ключевых фразах",
    emotion: "Уверенность, легкая полуулыбка, контакт глазами",
    bRoll: "Работа за ноутбуком, прогулка с телефоном, запись голосового сообщения",
    music: "Lo-fi или Ambient для экспертного, Cinematic для рекрутинга (90-110 BPM)"
  },
  strategy: {
    trigger: "Социальное доказательство + Дефицит внимания",
    objection: "Снятие страха 'мне некому предлагать'",
    logic: "Мы переводим фокус с 'активных продаж' на 'архитектуру интереса'. Ролик показывает, что у вас есть технология, которой можно научиться, что делает вас привлекательным наставником."
  }
};

type WizardStep = 1 | 2 | 3;

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [step, setStep] = useState<'auth' | 'complete-profile' | 'hero' | 'dashboard' | 'form' | 'processing' | 'result' | 'content-plan' | 'scenarios' | 'pricing' | 'settings'>('hero');
  const [currentDashboardView, setCurrentDashboardView] = useState('main');
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchProfile(session.user.id);
        if (step === 'auth') setStep('dashboard');
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    // Mock profile fetch for now or actual Supabase call
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) {
      setProfile(data);
    } else {
      setStep('complete-profile');
    }
  };
  const [planSettings, setPlanSettings] = useState({
    period: '7 дней',
    frequency: 'каждый день'
  });
  const [formData, setFormData] = useState<VideoGoal>({
    niche: 'БАДы / здоровье',
    userLevel: 'Новичок',
    audience: '',
    objective: '📢 Привлечь новых партнеров',
    tone: '😊 Дружелюбный',
    topic: '',
    platform: 'Instagram Reels',
    duration: '30 секунд'
  });
  const [result, setResult] = useState<VideoPackage | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>(() => {
    const saved = localStorage.getItem('mlm_generations');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToHistory = (newResult: VideoPackage, goal: VideoGoal) => {
    const entry = {
      id: Date.now().toString(),
      goal,
      result: newResult,
      date: new Date().toISOString()
    };
    const newHistory = [entry, ...history].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('mlm_generations', JSON.stringify(newHistory));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setStep('hero');
  };

  const niches = [
    'БАДы / здоровье',
    'Косметика / уход',
    'Wellness / образ жизни',
    'Товары для дома',
    'Обучение / наставничество',
    'Финансовое направление',
    'Другое'
  ];

  const objectives = [
    { id: '📢 Привлечь новых партнеров', label: 'Привлечь партнеров' },
    { id: '🛍 Привлечь клиентов на продукт', label: 'Привлечь клиентов' },
    { id: '🔥 Прогреть аудиторию', label: 'Прогреть аудиторию' },
    { id: '⭐ Усилить личный бренд', label: 'Усилить бренд' },
    { id: '💬 Снять возражение', label: 'Снять возражение' },
    { id: '🤝 Вовлечь команду', label: 'Вовлечь команду' }
  ];

  const tones = [
    { id: '😊 Дружелюбный', desc: 'Как человеку, которому доверяют' },
    { id: '💼 Экспертный', desc: 'Уверенно и по делу' },
    { id: '🔥 Провокационный', desc: 'Ломает стереотипы' },
    { id: '✨ Вдохновляющий', desc: 'Заряжает и вовлекает' },
    { id: '🫶 Живой и человечный', desc: 'Без пафоса и давления' }
  ];

  const platforms = [
    { id: 'Instagram Reels', icon: Instagram },
    { id: 'VK Клипы', icon: Play },
    { id: 'YouTube Shorts', icon: Youtube },
    { id: 'Telegram', icon: Send },
    { id: 'Универсальный формат', icon: Globe }
  ];

  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingMessages = [
    'Анализируем боли и триггеры вашей аудитории...',
    'Подбираем сильный хук для ролика...',
    'Генерируем сценарии под MLM-задачу...',
    'Создаём описание, субтитры и CTA...'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setStep('processing');
    setLoadingMessageIndex(0);

    // Timing simulation for loading messages
    const messageInterval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const data = await generateVideoContent(formData);
      
      clearInterval(messageInterval);
      setResult(data);
      saveToHistory(data, formData);
      setStep('result');
      setLoading(false);
    } catch (error) {
      console.error(error);
      clearInterval(messageInterval);
      alert(error instanceof Error ? error.message : "Ошибка генерации");
      setStep('form');
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-surface-dark font-sans selection:bg-brand-purple/30">
      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-6 overflow-hidden"
          >
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-4xl w-full text-center relative z-10">
              <div className="flex justify-center gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4 text-brand-purple" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">MLM AI Architect v2.0</span>
                </motion.div>
                
                {session ? (
                  <button 
                    onClick={() => setStep('dashboard')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/20 border border-brand-purple/30 backdrop-blur-md hover:bg-brand-purple/30 transition-all text-xs font-bold uppercase tracking-widest text-brand-purple"
                  >
                    Личный кабинет
                  </button>
                ) : (
                  <button 
                    onClick={() => setStep('auth')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white/60"
                  >
                    Вход / Регистрация
                  </button>
                )}
                
                {history.length > 0 && (
                  <button 
                    onClick={() => setStep('history' as any)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-brand-purple"
                  >
                    История ({history.length})
                  </button>
                )}
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                СЦЕНАРИИ REELS <br />
                ДЛЯ <span className="gradient-text serif italic">MLM</span> ЗА 2 МИНУТЫ
              </h1>

              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium leading-relaxed mb-12">
                AI-агент создает готовые сценарии, хуки, описание, хештеги и текст обложки для роликов, которые помогают привлекать партнеров, клиентов и заявки.
              </p>

              <button 
                onClick={() => setStep('form')}
                className="btn-primary text-lg group"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Создать ролик бесплатно <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-brand-blue opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="mt-6 text-xs font-bold text-white/20 uppercase tracking-[0.2em]">
                Уже создано 10 000+ сценариев для Reels и Shorts
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 max-w-3xl mx-auto">
                {[
                  { label: 'Для рекрутинга', icon: UserPlus },
                  { label: 'Для продукта', icon: Briefcase },
                  { label: 'Для прогрева', icon: Flame },
                  { label: 'Личный бренд', icon: Star }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="glass-card p-6 rounded-3xl flex flex-col items-center gap-4 border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-brand-purple" />
                    </div>
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest leading-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Auth onAuthSuccess={() => setStep('dashboard')} />
          </motion.div>
        )}

        {step === 'complete-profile' && session && (
          <motion.div
            key="complete-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CompleteProfile 
              user={session.user} 
              onComplete={(p) => {
                setProfile(p);
                setStep('dashboard');
              }} 
            />
          </motion.div>
        )}

        {step === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <Dashboard 
              profile={profile} 
              onLogout={handleLogout}
              onNavigate={(v) => {
                if (v === 'generate') setStep('form');
                else if (v === 'content-plan') setStep('content-plan');
                else if (v === 'scenarios') setStep('scenarios');
                else if (v === 'pricing') setStep('pricing');
                else if (v === 'settings') setStep('settings');
                else setStep(v as any);
              }} 
            />
          </motion.div>
        )}

        {step === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <Settings 
              profile={profile} 
              onNavigateBack={() => setStep('dashboard')}
              onLogout={handleLogout}
              onUpdateProfile={(p) => setProfile(p)}
            />
          </motion.div>
        )}

        {step === 'scenarios' && (
          <motion.div
            key="scenarios"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <MyScenarios 
              scenarios={history} 
              onNavigateBack={() => setStep('dashboard')}
              onSelect={(s) => {
                setResult(s.result);
                setFormData(s.goal);
                setStep('result');
              }}
            />
          </motion.div>
        )}

        {step === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-6xl mx-auto px-6 py-12"
          >
            <Pricing onNavigateBack={() => setStep('dashboard')} />
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen pt-24 pb-20 px-6 flex flex-col items-center"
          >
            <button 
              onClick={() => setStep(session ? 'dashboard' : 'hero')}
              className="absolute top-10 left-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} /> {session ? 'В кабинет' : 'На главную'}
            </button>

            {/* Step Progress */}
            <div className="max-w-xl w-full flex items-center justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-brand-purple -translate-y-1/2 z-0 transition-all duration-500" 
                style={{ width: `${((wizardStep - 1) / 2) * 100}%` }}
              />
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                    wizardStep >= s ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/40' : 'bg-surface-card border border-white/10 text-white/20'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="max-w-xl w-full glass-card p-10 md:p-12 rounded-[2.5rem] neon-glow">
              <AnimatePresence mode="wait">
                {wizardStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div>
                      <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">1</span>
                        О вашем контенте
                      </h2>
                      <p className="text-white/40 font-medium">Базовые настройки вашего MLM-агента</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Направление MLM / продукт</label>
                        <div className="relative">
                          <select 
                            value={formData.niche}
                            onChange={(e) => setFormData({...formData, niche: e.target.value})}
                            className="input-field appearance-none"
                          >
                            {niches.map(n => <option key={n} value={n}>{n}</option>)}
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Ваш статус</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['Новичок', 'Эксперт', 'Лидер'].map((lvl) => (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => setFormData({ ...formData, userLevel: lvl })}
                              className={`py-4 rounded-2xl border transition-all text-xs font-bold leading-tight ${
                                formData.userLevel === lvl 
                                ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' 
                                : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Кто смотрит?</label>
                        <input 
                          type="text"
                          value={formData.audience}
                          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                          placeholder="Например: мамы в декрете / новички"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => setWizardStep(2)}
                      disabled={!formData.audience}
                      className="btn-primary w-full disabled:opacity-30 flex items-center justify-center gap-2"
                    >
                      Далее <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {wizardStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div>
                      <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">2</span>
                        Задача ролика
                      </h2>
                      <p className="text-white/40 font-medium">Выберите стратегию и тональность</p>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Цель видео</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {objectives.map((obj) => (
                            <button
                              key={obj.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, objective: obj.id })}
                              className={`p-4 rounded-2xl border transition-all text-left group ${
                                formData.objective === obj.id 
                                ? 'border-brand-purple bg-brand-purple/10' 
                                : 'border-white/5 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <div className={`text-[13px] font-bold ${formData.objective === obj.id ? 'text-brand-purple' : 'text-white/60'}`}>
                                {obj.id.split(' ')[0]}
                                <span className="ml-2">{obj.label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Тон ролика</label>
                        <div className="grid grid-cols-1 gap-2">
                          {tones.map((tone) => (
                            <button
                              key={tone.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, tone: tone.id })}
                              className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-4 ${
                                formData.tone === tone.id 
                                ? 'border-brand-purple bg-brand-purple/10' 
                                : 'border-white/5 bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <div className="text-xl shrink-0">{tone.id.split(' ')[0]}</div>
                              <div>
                                <div className={`text-xs font-bold leading-none mb-1 ${formData.tone === tone.id ? 'text-brand-purple' : 'text-white/60'}`}>
                                  {tone.id.split(' ')[1]}
                                </div>
                                <div className="text-[10px] font-medium text-white/30">{tone.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setWizardStep(1)} className="btn-secondary flex-1">Назад</button>
                      <button onClick={() => setWizardStep(3)} className="btn-primary flex-[2] flex items-center justify-center gap-2">
                        Далее <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {wizardStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-10"
                  >
                    <div>
                      <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-purple text-sm">3</span>
                        Тема и площадка
                      </h2>
                      <p className="text-white/40 font-medium">Финальные штрихи вашей воронки</p>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">О чем видео?</label>
                        <textarea 
                          rows={3}
                          value={formData.topic}
                          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                          placeholder="Например: почему у большинства сетевиков нет заявок..."
                          className="input-field resize-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Площадка</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {platforms.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, platform: p.id })}
                              className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 text-center group ${
                                formData.platform === p.id 
                                ? 'border-brand-purple bg-brand-purple/10 text-brand-purple' 
                                : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                              }`}
                            >
                              <p.icon className="w-4 h-4" />
                              <span className="text-[10px] font-bold leading-tight">{p.id}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1 flex justify-between">
                          Длительность <span>{formData.duration}</span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {['15 секунд', '30 секунд', '45 секунд', '60 секунд'].map(d => (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setFormData({...formData, duration: d})}
                              className={`py-3 rounded-xl border transition-all text-[10px] font-black ${
                                formData.duration === d
                                ? 'border-brand-purple bg-brand-purple/10 text-brand-purple'
                                : 'border-white/5 bg-white/5 text-white/30'
                              }`}
                            >
                              {d.split(' ')[0]}s
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={() => setWizardStep(2)} className="btn-secondary flex-1">Назад</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={!formData.topic}
                        className="btn-primary flex-[2] flex items-center justify-center gap-2 disabled:opacity-30"
                      >
                        Создать сценарий 🎬
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface-dark/95 backdrop-blur-3xl px-6"
          >
            <div className="relative mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-[2px] border-white/5 border-t-brand-purple rounded-full"
              />
              <Zap className="absolute inset-0 m-auto text-brand-purple w-10 h-10 animate-pulse" />
            </div>
            <motion.h2 
              key={loadingMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black mb-8 tracking-tighter uppercase italic serif gradient-text text-center max-w-lg"
            >
              {loadingMessages[loadingMessageIndex]}
            </motion.h2>
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((loadingMessageIndex + 1) / loadingMessages.length) * 100}%` }}
                 className="h-full bg-brand-purple"
               />
            </div>
          </motion.div>
        )}

        {step === 'result' && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen pt-24 pb-24 px-6 max-w-4xl mx-auto space-y-12"
          >
            <button 
              onClick={() => setStep(session ? 'dashboard' : 'hero')}
              className="absolute top-10 left-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} /> {session ? 'В кабинет' : 'На главную'}
            </button>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-2">
                <Sparkles className="w-4 h-4 text-brand-purple" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Архитектура готова</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic serif tracking-tight uppercase">Ваш ролик готов! 🎬</h1>
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
                {formData.objective.replace(/^[^\s]+\s+/, '')} · {formData.audience} · {formData.platform} · {formData.duration}
              </p>
            </div>

            <div className="space-y-6">
              {/* Scenarios Accordion */}
              <AccordionItem 
                title="📝 Готовые сценарии" 
                defaultOpen={true}
                icon={<Layout className="w-5 h-5" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {(result.scenario_variants || []).map((s, i) => (
                    <div key={i} className="glass-card rounded-[2rem] overflow-hidden flex flex-col border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors">
                      <div className="p-6 border-b border-white/5">
                        <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest">{s.type}</span>
                        <h4 className="text-xl font-black italic serif uppercase mt-1 leading-tight">{s.type} вариант</h4>
                      </div>
                      <div className="p-6 space-y-6 flex-1">
                        {[
                          { ...s.hook, role: 'ХУК' },
                          { ...s.main, role: 'СУТЬ' },
                          { ...s.cta, role: 'CTA' }
                        ].map((block, bi) => (
                          <div key={bi} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-black bg-white/5 px-2 py-0.5 rounded text-white/40 tracking-tighter uppercase">{block.time} {block.role}</span>
                              <Camera className="w-3 h-3 text-white/10" />
                            </div>
                            <p className="text-sm font-bold text-white/90 leading-tight">«{block.speaker_text}»</p>
                            <p className="text-[10px] text-brand-blue font-bold italic opacity-60">📸 {block.visual}</p>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-white/5 flex gap-2">
                        <button 
                          onClick={() => copyToClipboard(`${s.hook.speaker_text}\n${s.main.speaker_text}\n${s.cta.speaker_text}`, `scen-${i}`)}
                          className={`flex-1 py-4 rounded-xl text-white font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copiedField === `scen-${i}` ? 'bg-green-500' : 'bg-brand-purple'}`}
                        >
                          {copiedField === `scen-${i}` ? <Check size={12} /> : <Copy size={12} />}
                          Копировать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionItem>

              {/* CRM / LeadGen */}
              <AccordionItem title="💬 Как перевести зрителя в диалог" icon={<MessageSquare className="w-5 h-5" />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-3">
                    {result.lead_generation_cta.map((cta, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-black italic">
                        «{cta}»
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={() => copyToClipboard(result.lead_generation_cta.join('\n'), 'ctas')}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${copiedField === 'ctas' ? 'bg-green-500 text-white' : 'btn-secondary'}`}
                    >
                      {copiedField === 'ctas' ? <Check size={14} /> : <Copy size={14} />} Копировать все CTA
                    </button>
                  </div>
                </div>
              </AccordionItem>

              {/* Subtitles */}
              <AccordionItem title="💬 Субтитры для видео" icon={<Users className="w-5 h-5" />}>
                <div className="py-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {result.subtitles.map((sub, i) => (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <span className="text-[10px] font-black text-brand-purple block mb-2">{sub.time}</span>
                        <p className="text-sm font-bold text-white/80">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.subtitles.map(s => `[${s.time}] ${s.text}`).join('\n'), 'subs')}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${copiedField === 'subs' ? 'bg-green-500 text-white' : 'btn-secondary'}`}
                  >
                    {copiedField === 'subs' ? <Check size={14} /> : <Copy size={14} />} Копировать субтитры
                  </button>
                </div>
              </AccordionItem>

              {/* Description */}
              <AccordionItem title="📄 Текст под ролик" icon={<FileText size={20} />}>
                <div className="py-4 space-y-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-base font-medium leading-relaxed italic serif opacity-80 whitespace-pre-wrap">{result.description}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.description, 'post')}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${copiedField === 'post' ? 'bg-green-500 text-white' : 'btn-secondary'}`}
                  >
                    {copiedField === 'post' ? <Check size={14} /> : <Copy size={14} />} Копировать текст
                  </button>
                </div>
              </AccordionItem>

              {/* Hashtags */}
              <AccordionItem title="# Хештеги" icon={<Hash size={20} />}>
                <div className="py-4 space-y-4">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                    <p className="text-sm font-black text-brand-blue leading-loose tracking-widest uppercase">#{result.hashtags.join(' #')}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(result.hashtags.join(' '), 'tags')}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${copiedField === 'tags' ? 'bg-green-500 text-white' : 'btn-secondary'}`}
                  >
                    {copiedField === 'tags' ? <Check size={14} /> : <Copy size={14} />} Копировать хештеги
                  </button>
                </div>
              </AccordionItem>

              {/* Covers */}
              <AccordionItem title="🖼 Текст для обложки" icon={<Layout size={20} />}>
                <div className="py-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.cover_text.map((c, i) => (
                      <div key={i} className="p-6 bg-brand-purple rounded-3xl text-center shadow-lg shadow-brand-purple/20 flex items-center justify-center min-h-[140px]">
                        <p className="text-xl md:text-2xl font-black italic serif uppercase tracking-tight leading-none text-white">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionItem>

              {/* Shooting advice */}
              <AccordionItem title="🎥 Как снять ролик" icon={<Camera size={20} />}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <AdviceCard label="Ракурс" value={result.filming_tips.angle} />
                    <AdviceCard label="Свет" value={result.filming_tips.lighting} />
                  </div>
                  <div className="space-y-4">
                    <AdviceCard label="Движение" value={result.filming_tips.camera_movement} />
                    <AdviceCard label="Фон" value={result.filming_tips.background} />
                  </div>
                  <div className="space-y-4">
                    <AdviceCard label="Эмоция" value={result.filming_tips.emotion} />
                    <AdviceCard label="Музыка" value={result.filming_tips.music} />
                  </div>
                </div>
              </AccordionItem>

              {/* strategy logic */}
              <AccordionItem title="📈 Почему это сработает" icon={<Zap className="w-5 h-5 text-brand-purple" />}>
                <div className="py-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 glass-card rounded-3xl border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-purple mb-4 block">Главный триггер</span>
                      <p className="text-lg font-black italic serif text-white/90 leading-tight uppercase">{result.why_it_works.trigger}</p>
                    </div>
                    <div className="p-6 glass-card rounded-3xl border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-4 block">Закрываем возражение</span>
                      <p className="text-lg font-black italic serif text-white/90 leading-tight uppercase">{result.why_it_works.objection_closed}</p>
                    </div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
                    <p className="italic serif text-xl leading-relaxed opacity-60">«{result.why_it_works.dialog_logic}»</p>
                  </div>
                </div>
              </AccordionItem>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12">
               <button className="py-5 bg-white text-surface-dark rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                 <Download size={14} /> Скачать всё в PDF
               </button>
               <button 
                  onClick={() => {
                    setStep('hero');
                    setWizardStep(1);
                  }}
                  className="py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                 <Plus size={14} /> Новый ролик
               </button>
               <button 
                 onClick={() => setStep('content-plan')}
                 className="py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
               >
                 <Calendar size={14} /> Контент-план
               </button>
               <button className="py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                 <Save size={14} /> В избранное
               </button>
            </div>
          </motion.div>
        )}

        {step === 'content-plan' && (
          <motion.div
            key="content-plan"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="min-h-screen pt-24 pb-24 px-6 max-w-5xl mx-auto space-y-12"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-2">
                  <Calendar className="w-4 h-4 text-brand-purple" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Архитектор воронки</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black italic serif tracking-tight uppercase">Ваш Контент-план</h1>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
                   {formData.niche} · {formData.userLevel} · {formData.platform}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Период</label>
                   <div className="flex bg-white/5 border border-white/5 rounded-2xl p-1">
                      {['7 дней', '14 дней', '30 дней'].map(p => (
                        <button
                          key={p}
                          onClick={() => setPlanSettings({...planSettings, period: p})}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${planSettings.period === p ? 'bg-brand-purple text-white' : 'text-white/40 hover:text-white/60'}`}
                        >
                          {p.split(' ')[0]} {p.split(' ')[1][0]}.
                        </button>
                      ))}
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-white/20 tracking-widest ml-1">Частота</label>
                   <div className="flex bg-white/5 border border-white/5 rounded-2xl p-1">
                      {['каждый день', 'через день', '3 раза/нед'].map(f => (
                        <button
                          key={f}
                          onClick={() => setPlanSettings({...planSettings, frequency: f})}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${planSettings.frequency === f ? 'bg-brand-purple text-white' : 'text-white/40 hover:text-white/60'}`}
                        >
                          {f}
                        </button>
                      ))}
                   </div>
                 </div>
              </div>
            </div>

            <div className="glass-card rounded-[3.5rem] border-white/5 overflow-hidden shadow-2xl shadow-brand-purple/5">
               <div className="bg-white/[0.03] px-8 py-6 border-b border-white/5 hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  <div className="w-10">День</div>
                  <div className="flex-1">Тема ролика / Тип контента</div>
                  <div className="max-w-[200px] w-full">Первый Хук</div>
                  <div className="w-16">Тайм</div>
                  <div className="w-12">Инфо</div>
               </div>
               <div className="divide-y divide-white/5">
                 {MOCK_PLAN.map((item, i) => (
                   <PlanRow 
                    key={i} 
                    item={item} 
                    index={i} 
                    onGenerate={() => {
                      setFormData({ ...formData, topic: item.topic });
                      handleSubmit();
                    }}
                  />
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button className="py-6 bg-white text-surface-dark rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:scale-[1.01] transition-transform">
                 <Download size={18} /> Скачать план в PDF
               </button>
               <button 
                onClick={() => {
                  const txt = MOCK_PLAN.map(p => `${p.day}: ${p.topic} (${p.type})\nHook: ${p.hook}\nCTA: ${p.cta}`).join('\n\n');
                  copyToClipboard(txt, 'all-plan');
                }}
                className={`py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all ${copiedField === 'all-plan' ? 'bg-green-500 text-white' : 'btn-secondary'}`}
               >
                 {copiedField === 'all-plan' ? <Check size={18} /> : <Copy size={18} />} {copiedField === 'all-plan' ? 'План скопирован' : 'Скопировать весь план'}
               </button>
            </div>

            <button 
              onClick={() => setStep('result')}
              className="mx-auto block text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-brand-purple transition-colors"
            >
              ← Вернуться к сценарию
            </button>
          </motion.div>
        )}

        {step === ('history' as any) && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen pt-24 pb-24 px-6 max-w-4xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
               <h1 className="text-5xl font-black italic serif tracking-tight uppercase">История генераций</h1>
               <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Последние 10 созданных сценариев</p>
            </div>

            <div className="space-y-4">
              {history.map((entry: any) => (
                <div 
                  key={entry.id}
                  onClick={() => {
                    setResult(entry.result);
                    setFormData(entry.goal);
                    setStep('result');
                  }}
                  className="glass-card p-6 rounded-3xl border border-white/5 hover:border-brand-purple/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-2 py-0.5 rounded">
                          {entry.goal.objective.split(' ').slice(1).join(' ')}
                        </span>
                        <span className="text-[10px] text-white/20 font-bold">{new Date(entry.date).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white/90 group-hover:text-brand-purple transition-colors">{entry.goal.topic || entry.goal.objective}</h3>
                      <p className="text-xs text-white/40 mt-1 capitalize">{entry.goal.niche} · {entry.goal.platform}</p>
                    </div>
                    <ChevronRight className="text-white/10 group-hover:text-brand-purple transition-colors" />
                  </div>
                </div>
              ))}
              
              {history.length === 0 && (
                <div className="text-center py-20 opacity-20">
                  <Database size={48} className="mx-auto mb-4" />
                  <p className="font-black uppercase tracking-widest text-sm">История пуста</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setStep('hero')}
              className="mx-auto block text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-brand-purple transition-colors"
            >
              ← На главную
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
