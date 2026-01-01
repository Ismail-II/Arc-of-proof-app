
import React, { useState } from 'react';

interface DepthProps {
  initialValue?: string;
  onSave: (val: string) => void;
  label: string;
  timestamp?: string;
}

export const DailyProof: React.FC<DepthProps> = ({ initialValue, onSave, label, timestamp }) => {
  const [value, setValue] = useState(initialValue || '');
  const [saved, setSaved] = useState(!!initialValue);

  const handleSave = () => {
    if (value.trim()) {
      onSave(value.trim());
      setSaved(true);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-neutral-100">
      <div className="flex justify-between items-baseline mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{label}</span>
          {saved && <span className="text-[9px] uppercase tracking-widest text-neutral-200 mono font-light">— Locked</span>}
        </div>
        {timestamp && <span className="text-[10px] text-neutral-300 mono">{timestamp}</span>}
      </div>
      {saved ? (
        <p className="text-sm italic text-neutral-500 mono leading-relaxed">
          {value}
        </p>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder-neutral-300 mono"
            placeholder="Type one line..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button 
            onClick={handleSave}
            className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black"
          >
            Lock
          </button>
        </div>
      )}
    </div>
  );
};

export const OneSentence: React.FC<DepthProps> = ({ initialValue, onSave, label }) => {
  const [value, setValue] = useState(initialValue || '');
  const [saved, setSaved] = useState(!!initialValue);

  const handleSave = () => {
    if (value.trim()) {
      onSave(value.trim());
      setSaved(true);
    }
  };

  return (
    <div className="mt-8 mb-12">
      <div className="flex justify-between items-baseline mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium">{label}</span>
          {saved && <span className="text-[9px] uppercase tracking-widest text-neutral-200 mono font-light">— Recorded</span>}
        </div>
      </div>
      {saved ? (
        <p className="text-lg font-light text-neutral-800 leading-relaxed">
          {value}
        </p>
      ) : (
        <textarea
          rows={3}
          className="w-full bg-transparent border border-neutral-100 p-3 outline-none text-lg font-light placeholder-neutral-200 resize-none"
          placeholder="One sentence that sums up your presence today..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
        />
      )}
    </div>
  );
};
