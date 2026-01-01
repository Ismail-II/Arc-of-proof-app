
import { AppState, DailyData, BossQuest } from '../types';

const STORAGE_KEY = 'arc_of_proof_data';

export const storageService = {
  loadState: (): AppState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        days: {},
        bossQuest: null
      };
    }
    return JSON.parse(saved);
  },

  saveState: (state: AppState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  getDailyData: (state: AppState, date: string): DailyData => {
    if (state.days[date]) return state.days[date];
    
    // Default initial daily data
    return {
      date,
      mainQuest: { id: `main-${date}`, text: '', completed: false },
      sideQuests: [
        { id: `side1-${date}`, text: '', completed: false },
        { id: `side2-${date}`, text: '', completed: false },
        { id: `side3-${date}`, text: '', completed: false },
      ],
      mood: null,
    };
  }
};
