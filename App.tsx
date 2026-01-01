
import React, { useState, useEffect } from 'react';
import { AppState, DailyData, BossQuest } from './types';
import { storageService } from './services/storageService';
import DailyView from './components/DailyView';
import CalendarView from './components/CalendarView';

const App: React.FC = () => {
  const [view, setView] = useState<'today' | 'history'>('today');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [state, setState] = useState<AppState>(storageService.loadState());

  // Save on state change
  useEffect(() => {
    storageService.saveState(state);
  }, [state]);

  const currentDailyData = storageService.getDailyData(state, selectedDate);

  const handleUpdateDaily = (data: DailyData) => {
    setState(prev => ({
      ...prev,
      days: {
        ...prev.days,
        [data.date]: data
      }
    }));
  };

  const handleUpdateBoss = (boss: BossQuest) => {
    setState(prev => ({
      ...prev,
      bossQuest: boss
    }));
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setView('today');
  };

  const isToday = selectedDate === new Date().toISOString().slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="px-6 py-8 border-b border-neutral-50 flex justify-between items-baseline sticky top-0 bg-white z-10">
        <div>
          <h1 className="text-xl font-medium tracking-tight">Arc of Proof</h1>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 mono">
            {view === 'history' ? 'ARCHIVE' : selectedDate}
          </p>
        </div>
        <div className="flex space-x-6">
          <button 
            onClick={() => { setView('today'); setSelectedDate(new Date().toISOString().slice(0, 10)); }}
            className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${view === 'today' && isToday ? 'text-black' : 'text-neutral-300 hover:text-neutral-600'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setView('history')}
            className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${view === 'history' ? 'text-black' : 'text-neutral-300 hover:text-neutral-600'}`}
          >
            History
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {view === 'today' ? (
          <DailyView 
            data={currentDailyData} 
            bossQuest={state.bossQuest} 
            onUpdateDaily={handleUpdateDaily}
            onUpdateBoss={handleUpdateBoss}
          />
        ) : (
          <CalendarView state={state} onSelectDate={handleSelectDate} />
        )}
      </main>

      {/* Footer hint */}
      {view === 'today' && (
        <footer className="fixed bottom-0 left-0 w-full p-4 pointer-events-none text-center">
          <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-200">Silence is Action.</span>
        </footer>
      )}
    </div>
  );
};

export default App;
