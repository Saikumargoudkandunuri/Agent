import React from 'react';

interface BrowserPreviewProps {
  url?: string;
  screenshot?: string;
}

export const BrowserPreview: React.FC<BrowserPreviewProps> = ({ url, screenshot }) => {
  return (
    <div className="h-full bg-dark-900 flex flex-col">
      <div className="px-3 py-2 border-b border-dark-700 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button className="p-1 text-dark-400 hover:text-white transition-colors" disabled>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 text-dark-400 hover:text-white transition-colors" disabled>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="p-1 text-dark-400 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <div className="flex-1 bg-dark-800 rounded px-3 py-1 text-xs text-dark-300 truncate">
          {url || 'about:blank'}
        </div>
      </div>
      <div className="flex-1 overflow-hidden relative bg-white">
        {screenshot ? (
          <img src={screenshot} alt="Page screenshot" className="w-full h-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-dark-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <p className="text-dark-400 text-sm">Browser preview will appear here</p>
              <p className="text-dark-500 text-xs mt-1">Agent will navigate and capture pages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
