
import React from 'react';
import { AppState } from '../types';

interface CalendarViewProps {
  state: AppState;
  onSelectDate: (date: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ state, onSelectDate }) => {
  const days = Object.keys(state.days).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-8">Past Practice</h2>
      
      {days.length === 0 ? (
        <p className="text-neutral-300 italic text-sm">No records yet. Start today.</p>
      ) : (
        <div className="space-y-4">
          {days.map((date) => {
            const day = state.days[date];
            const hasMain = day.mainQuest.completed;
            const sidesDone = day.sideQuests.filter(q => q.completed).length;

            return (
              <div 
                key={date}
                onClick={() => onSelectDate(date)}
                className="group p-4 border border-neutral-100 hover:border-neutral-300 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="mono text-xs text-neutral-600">{date}</span>
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full ${hasMain ? 'bg-black' : 'bg-neutral-100'}`} />
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full ${i < sidesDone ? 'bg-neutral-400' : 'bg-neutral-100'}`} 
                      />
                    ))}
                  </div>
                </div>
                {day.oneSentence && (
                  <p className="mt-2 text-xs text-neutral-400 line-clamp-1 italic">
                    {day.oneSentence}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CalendarView;
