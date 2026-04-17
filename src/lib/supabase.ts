import { createClient } from '@supabase/supabase-js';

// Mock Supabase client for MVP
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: JSON.parse(localStorage.getItem('mlm_session') || 'null') } }),
    signInWithOtp: async () => ({ error: null }),
    signOut: async () => { localStorage.removeItem('mlm_session'); return { error: null }; },
    onAuthStateChange: (callback: any) => {
      // Basic mock
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        single: async () => {
          if (table === 'profiles') {
            return { data: JSON.parse(localStorage.getItem('mlm_profile') || 'null') };
          }
          return { data: null };
        }
      })
    }),
    upsert: async (data: any) => {
      if (table === 'profiles') {
        localStorage.setItem('mlm_profile', JSON.stringify(data));
      }
      return { error: null };
    }
  })
} as any;

export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  team_name?: string;
  niche?: string;
  city?: string;
  default_tone?: string;
  subscription_tier: 'free' | 'pro' | 'business';
  scenarios_count: number;
  plans_count: number;
  created_at: string;
};

export type Scenario = {
  id: string;
  user_id: string;
  goal: any;
  result: any;
  is_favorite: boolean;
  created_at: string;
};

export type ContentPlan = {
  id: string;
  user_id: string;
  period: string;
  frequency: string;
  plan_data: any[];
  status: 'created' | 'in_progress' | 'completed';
  created_at: string;
};
