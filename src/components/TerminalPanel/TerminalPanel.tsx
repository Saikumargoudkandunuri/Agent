import React from 'react';

interface TerminalPanelProps {
  output: string[];
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ output }) => {
  return (
    <div className="h-full bg-[#0d1117] flex flex-col">
      <div className="px-3 py-2 border-b border-dark-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium text-dark-300">Terminal</span>
        </div>
        <button className="text-dark-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 font-mono text-xs">
        {output.length === 0 ? (
          <div className="text-dark-500">Terminal ready. Run commands to see output.</div>
        ) : (
          output.map((line, index) => (
            <div key={index} className="text-dark-300 whitespace-pre-wrap">
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
