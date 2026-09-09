import React from 'react';

interface HeaderProps {
  projectName: string;
  selectedModel: string;
  selectedMode: string;
  agentStatus: 'idle' | 'running' | 'paused' | 'stopped';
  onModelChange: (modelId: string) => void;
  onModeChange: (modeId: string) => void;
  onStopAgent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  projectName,
  selectedModel,
  selectedMode,
  agentStatus,
  onModelChange,
  onModeChange,
  onStopAgent,
}) => {
  const ModelSelector = require('./ModelSelector/ModelSelector').ModelSelector;
  const ModeSelector = require('./ModeSelector/ModeSelector').ModeSelector;

  return (
    <header className="h-14 bg-dark-900 border-b border-dark-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-white font-semibold">Nexus Agent</span>
        </div>

        {/* Project Name */}
        <div className="h-6 w-px bg-dark-700" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-dark-400 uppercase tracking-wider">Project</span>
          <span className="text-sm text-white bg-dark-800 px-3 py-1 rounded-lg border border-dark-600">
            {projectName}
          </span>
        </div>

        {/* Model Selector */}
        <div className="h-6 w-px bg-dark-700" />
        <ModelSelector selectedModel={selectedModel} onModelChange={onModelChange} />

        {/* Mode Selector */}
        <div className="h-6 w-px bg-dark-700" />
        <ModeSelector selectedMode={selectedMode} onModeChange={onModeChange} />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            agentStatus === 'running' ? 'bg-green-500 animate-pulse' :
            agentStatus === 'paused' ? 'bg-yellow-500' :
            agentStatus === 'stopped' ? 'bg-red-500' :
            'bg-dark-500'
          }`} />
          <span className="text-xs text-dark-400 capitalize">{agentStatus}</span>
        </div>

        {/* Stop Button */}
        {agentStatus === 'running' && (
          <button
            onClick={onStopAgent}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <rect x="5" y="5" width="10" height="10" rx="1" />
            </svg>
            Stop Agent
          </button>
        )}

        {/* Window controls placeholder */}
        <div className="flex items-center gap-1 ml-4">
          <button className="w-8 h-8 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-800 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-dark-400 hover:text-white hover:bg-dark-800 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4h8l4 4v12H8z" />
            </svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-dark-400 hover:text-red-400 hover:bg-dark-800 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
