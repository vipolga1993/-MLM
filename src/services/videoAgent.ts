import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export interface VideoGoal {
  niche: string;
  userLevel: string;
  audience: string;
  objective: string;
  tone: string;
  topic: string;
  platform: string;
  duration: string;
}

export interface VideoPackage {
  scenario_variants: {
    type: string;
    hook: { time: string; speaker_text: string; visual: string };
    main: { time: string; speaker_text: string; visual: string };
    cta: { time: string; speaker_text: string; visual: string };
  }[];
  lead_generation_cta: string[];
  subtitles: { time: string; text: string }[];
  description: string;
  hashtags: string[];
  cover_text: string[];
  filming_tips: {
    angle: string;
    lighting: string;
    background: string;
    camera_movement: string;
    emotion: string;
    music: string;
  };
  why_it_works: {
    trigger: string;
    objection_closed: string;
    dialog_logic: string;
  };
}

const SYSTEM_PROMPT = `Ты — топовый контент-стратег и сценарист коротких видео для MLM / сетевого бизнеса.
Ты создаешь Reels, Shorts, VK Клипы и Telegram-видео, которые помогают:
— привлекать новых партнеров
— привлекать клиентов на продукт
— прогревать аудиторию
— усиливать личный бренд
— вызывать входящие сообщения и диалог

Ты понимаешь специфику MLM:
— нельзя продавать в лоб
— нельзя писать агрессивно и шаблонно
— важно вызывать доверие
— важно избегать ощущения “пирамида / сетевой спам”
— важно строить контент через личный бренд, пользу, истории, кейсы, возражения и мягкие CTA

Ты умеешь создавать:
— сильные хуки
— живой разговорный текст
— сценарии под рекрутинг, продукт, прогрев, личный бренд
— CTA, которые переводят человека в диалог

Пиши современно, по-человечески, без шаблонного MLM-сленга.
Избегай слов:
— партнерка
— ветка
— ЛТО
— успешный успех
— миллионы без усилий

Твоя задача — выдавать контент, который не просто красиво звучит, а приводит к сообщениям в личку и заявкам.`;

export const generateVideoContent = async (input: VideoGoal): Promise<VideoPackage> => {
  const model = "gemini-2.0-flash";
  let attempts = 0;
  const maxAttempts = 3;

  const userPrompt = `Создай сценарий короткого вертикального видео для MLM / сетевого бизнеса.

Направление / продукт: ${input.niche}
Статус автора: ${input.userLevel}
Аудитория: ${input.audience}
Цель ролика: ${input.objective}
Тон: ${input.tone}
Тема: ${input.topic}
Площадка: ${input.platform}
Длительность: ${input.duration}

Важно:
— учти боли и желания этой аудитории
— выбери сильный контент-угол
— добавь мягкий CTA на диалог
— сделай ролик живым, не роботным
— адаптируй под MLM
— избегай прямого впаривания

Верни ответ строго в JSON-формате.`;

  while (attempts < maxAttempts) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          // @ts-ignore
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scenario_variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    hook: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        speaker_text: { type: Type.STRING },
                        visual: { type: Type.STRING }
                      },
                      required: ["time", "speaker_text", "visual"]
                    },
                    main: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        speaker_text: { type: Type.STRING },
                        visual: { type: Type.STRING }
                      },
                      required: ["time", "speaker_text", "visual"]
                    },
                    cta: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        speaker_text: { type: Type.STRING },
                        visual: { type: Type.STRING }
                      },
                      required: ["time", "speaker_text", "visual"]
                    }
                  },
                  required: ["type", "hook", "main", "cta"]
                }
              },
              lead_generation_cta: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              subtitles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING },
                    text: { type: Type.STRING }
                  },
                  required: ["time", "text"]
                }
              },
              description: { type: Type.STRING },
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              cover_text: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              filming_tips: {
                type: Type.OBJECT,
                properties: {
                  angle: { type: Type.STRING },
                  lighting: { type: Type.STRING },
                  background: { type: Type.STRING },
                  camera_movement: { type: Type.STRING },
                  emotion: { type: Type.STRING },
                  music: { type: Type.STRING }
                },
                required: ["angle", "lighting", "background", "camera_movement", "emotion", "music"]
              },
              why_it_works: {
                type: Type.OBJECT,
                properties: {
                  trigger: { type: Type.STRING },
                  objection_closed: { type: Type.STRING },
                  dialog_logic: { type: Type.STRING }
                },
                required: ["trigger", "objection_closed", "dialog_logic"]
              }
            },
            required: [
              "scenario_variants",
              "lead_generation_cta",
              "subtitles",
              "description",
              "hashtags",
              "cover_text",
              "filming_tips",
              "why_it_works"
            ]
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response");
      
      const parsed = JSON.parse(text);
      
      // Basic validation check
      if (!parsed.scenario_variants || !parsed.filming_tips) {
        throw new Error("Invalid JSON structure");
      }

      return parsed as VideoPackage;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      if (attempts === maxAttempts) {
        throw new Error("Сервис временно перегружен. Попробуйте чуть позже.");
      }
    }
  }

  throw new Error("Не удалось получить результат. Попробуйте ещё раз.");
};
