
import React from 'react';
import { DailyData, BossQuest, Mood } from '../types';
import QuestItem from './QuestItem';
import { DailyProof, OneSentence } from './DepthFeatures';

interface DailyViewProps {
  data: DailyData;
  bossQuest: BossQuest | null;
  onUpdateDaily: (data: DailyData) => void;
  onUpdateBoss: (boss: BossQuest) => void;
}

const moods: { label: string; value: Mood }[] = [
  { label: 'Calm', value: 'calm' },
  { label: 'Clarity', value: 'clarity' },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Tension', value: 'tension' },
  { label: 'Resistance', value: 'resistance' },
];

const DailyView: React.FC<DailyViewProps> = ({ data, bossQuest, onUpdateDaily, onUpdateBoss }) => {
  const updateMain = (text: string) => {
    onUpdateDaily({ ...data, mainQuest: { ...data.mainQuest, text } });
  };

  const toggleMain = () => {
    onUpdateDaily({ ...data, mainQuest: { ...data.mainQuest, completed: !data.mainQuest.completed } });
  };

  const updateSide = (index: number, text: string) => {
    const sides = [...data.sideQuests];
    sides[index] = { ...sides[index], text };
    onUpdateDaily({ ...data, sideQuests: sides });
  };

  const toggleSide = (index: number) => {
    const sides = [...data.sideQuests];
    sides[index] = { ...sides[index], completed: !sides[index].completed };
    onUpdateDaily({ ...data, sideQuests: sides });
  };

  const setMood = (mood: Mood) => {
    onUpdateDaily({ ...data, mood });
  };

  const saveProof = (text: string) => {
    onUpdateDaily({ 
      ...data, 
      proof: { text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } 
    });
  };

  const saveOneSentence = (text: string) => {
    onUpdateDaily({ ...data, oneSentence: text });
  };

  const handleBossUpdate = (text: string) => {
    onUpdateBoss({ 
      text, 
      completed: bossQuest?.completed || false, 
      month: new Date().toISOString().slice(0, 7) 
    });
  };

  const handleBossToggle = () => {
    if (bossQuest) {
      onUpdateBoss({ ...bossQuest, completed: !bossQuest.completed });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12 pb-32">
      {/* Monthly Boss */}
      <div className={`mb-16 p-6 border border-neutral-100 transition-opacity ${bossQuest?.completed ? 'opacity-30' : 'opacity-100'}`}>
        <div className="flex justify-between items-baseline mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">Monthly Boss Quest</span>
            {bossQuest?.completed && (
              <span className="text-[9px] uppercase tracking-widest text-neutral-300 mono font-light">— Witnessed</span>
            )}
          </div>
          {bossQuest?.text && (
             <button 
              onClick={handleBossToggle}
              className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-black"
            >
              {bossQuest.completed ? 'Undo' : 'Complete'}
            </button>
          )}
        </div>
        <input
          type="text"
          value={bossQuest?.text || ''}
          onChange={(e) => handleBossUpdate(e.target.value)}
          placeholder="The one thing this month..."
          className="w-full bg-transparent border-none outline-none text-xl font-light placeholder-neutral-200"
        />
      </div>

      {/* Main Quest */}
      <QuestItem 
        label="Main Quest" 
        quest={data.mainQuest} 
        onUpdate={updateMain} 
        onToggle={toggleMain}
        placeholder="Today's non-negotiable..."
      />

      {/* Side Quests */}
      <div className="mt-12">
        {data.sideQuests.map((sq, i) => (
          <QuestItem 
            key={sq.id}
            label={`Side Quest ${i + 1}`} 
            quest={sq} 
            onUpdate={(val) => updateSide(i, val)} 
            onToggle={() => toggleSide(i)}
            placeholder="..."
          />
        ))}
      </div>

      {/* Mood */}
      <div className="mt-12 pt-8 border-t border-neutral-100">
        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block mb-4">Current State</span>
        <div className="flex flex-wrap gap-2">
          {moods.map((m) => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              className={`px-3 py-1 text-xs border transition-all ${
                data.mood === m.value 
                  ? 'border-black text-black bg-neutral-50' 
                  : 'border-neutral-100 text-neutral-400 hover:border-neutral-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Depth Features */}
      <DailyProof 
        label="Proof I showed up" 
        onSave={saveProof} 
        initialValue={data.proof?.text} 
        timestamp={data.proof?.timestamp}
      />

      {data.mainQuest.completed && (
        <OneSentence 
          label="The One Sentence" 
          onSave={saveOneSentence} 
          initialValue={data.oneSentence}
        />
      )}
    </div>
  );
};

export default DailyView;
