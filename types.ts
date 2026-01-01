
export interface Quest {
  id: string;
  text: string;
  completed: boolean;
}

export type Mood = 'neutral' | 'clarity' | 'tension' | 'calm' | 'resistance' | null;

export interface DailyData {
  date: string; // YYYY-MM-DD
  mainQuest: Quest;
  sideQuests: Quest[];
  mood: Mood;
  proof?: {
    text: string;
    timestamp: string;
  };
  oneSentence?: string;
}

export interface BossQuest {
  text: string;
  completed: boolean;
  month: string; // YYYY-MM
}

export interface AppState {
  days: Record<string, DailyData>;
  bossQuest: BossQuest | null;
}
