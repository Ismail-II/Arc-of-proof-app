
import React from 'react';
import { Quest } from '../types';

interface QuestItemProps {
  quest: Quest;
  label: string;
  onUpdate: (text: string) => void;
  onToggle: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, label, onUpdate, onToggle, disabled, placeholder }) => {
  return (
    <div className={`flex flex-col space-y-1 mb-8 ${quest.completed ? 'fade-quietly' : ''}`}>
      <div className="flex justify-between items-baseline">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{label}</span>
          {quest.completed && (
            <span className="text-[9px] uppercase tracking-widest text-neutral-300 mono font-light">— Witnessed</span>
          )}
        </div>
        {quest.text && (
          <button 
            onClick={onToggle}
            className={`text-[10px] uppercase tracking-widest transition-colors ${quest.completed ? 'text-neutral-300 hover:text-neutral-500' : 'text-neutral-500 hover:text-black'}`}
          >
            {quest.completed ? 'Undo' : 'Mark Done'}
          </button>
        )}
      </div>
      <input
        type="text"
        value={quest.text}
        onChange={(e) => onUpdate(e.target.value)}
        disabled={quest.completed || disabled}
        placeholder={placeholder || "Enter quest..."}
        className="w-full bg-transparent border-none outline-none text-lg font-light placeholder-neutral-300 disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default QuestItem;
