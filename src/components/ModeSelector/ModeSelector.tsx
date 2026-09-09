import React from 'react';

interface Mode {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const MODES: Mode[] = [
  { id: 'ask', name: 'Ask', icon: '💬', description: 'Answer questions about code' },
  { id: 'plan', name: 'Plan', icon: '📋', description: 'Create implementation plans' },
  { id: 'build', name: 'Build', icon: '🔨', description: 'Write and modify code' },
  { id: 'debug', name: 'Debug', icon: '🐛', description: 'Fix errors and issues' },
  { id: 'review', name: 'Review', icon: '👀', description: 'Code review and analysis' },
  { id: 'browser', name: 'Browser', icon: '🌐', description: 'Browser automation' },
  { id: 'computer', name: 'Computer Use', icon: '🖥️', description: 'Full computer control' },
  { id: 'spec', name: 'Specification', icon: '📐', description: 'Generate Kiro-style specs' },
];

interface ModeSelectorProps {
  selectedMode: string;
  onModeChange: (modeId: string) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-dark-400 uppercase tracking-wider">Mode</span>
      <div className="flex bg-dark-800 border border-dark-600 rounded-lg p-1 gap-1">
        {MODES.map(mode => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            title={mode.description}
            className={`p-2 rounded-md transition-all ${
              selectedMode === mode.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'text-dark-400 hover:text-white hover:bg-dark-700'
            }`}
          >
            <span className="text-sm">{mode.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
