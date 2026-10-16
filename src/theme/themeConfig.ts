export type ThemeMode = 'chargrill-dark' | 'warm-cream';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  badge: string;
  description: string;
  bgPage: string;
  bgHeader: string;
  bgSubtle: string;
  bgCard: string;
  bgCardHover: string;
  borderMain: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentAmber: string;
  accentHover: string;
  accentFlame: string;
  accentButtonText: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  'chargrill-dark': {
    id: 'chargrill-dark',
    name: 'CharGrill Dark Bistro (Justdial Photos)',
    badge: 'Justdial Cafe Theme',
    description: 'Matte charcoal, warm golden ember & neon signage matching the real cafe interior and signboard',
    bgPage: '#121110',
    bgHeader: '#181614',
    bgSubtle: '#1F1C19',
    bgCard: '#1C1917',
    bgCardHover: '#24201C',
    borderMain: '#2E2822',
    borderSubtle: '#26201B',
    textPrimary: '#FAF5EE',
    textSecondary: '#D6D3D1',
    textMuted: '#A8A29E',
    accentAmber: '#F59E0B',
    accentHover: '#D97706',
    accentFlame: '#FF6B00',
    accentButtonText: '#121110',
  },
  'warm-cream': {
    id: 'warm-cream',
    name: 'OG Warm Cream & Honey',
    badge: 'OG Warm Theme',
    description: 'Warm cream, honey amber, and soft ivory cream cards without harsh pure white',
    bgPage: '#FAF6EF',
    bgHeader: '#FAF6EF',
    bgSubtle: '#F3EAD9',
    bgCard: '#FFFDF9',
    bgCardHover: '#F7EFE1',
    borderMain: '#E8DBC5',
    borderSubtle: '#EDE2D1',
    textPrimary: '#231F1D',
    textSecondary: '#575047',
    textMuted: '#7E7569',
    accentAmber: '#E59A19',
    accentHover: '#D4890B',
    accentFlame: '#DD5512',
    accentButtonText: '#FFFFFF',
  },
};

export const CHECKPOINT_INFO = {
  version: '2.0.0',
  name: 'Justdial Cafe Theme Update',
  sourceUrl: 'https://www.justdial.com/Karnal/Chargrill-Cafe-Near-Patwar-Khana-Indri/9999PX184-X184-240504194929-A1J1_BZDET',
  notes: 'Checkpoint created before and after color theme update. Allows instantaneous 1-click revert anytime.',
};
