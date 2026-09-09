import React, { useState } from 'react';

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  contextSize?: number;
  supportsVision?: boolean;
  supportsTools?: boolean;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const MOCK_MODELS: ModelInfo[] = [
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Gemini', contextSize: 128000, supportsVision: true, supportsTools: true },
  { id: 'gemini-ultra', name: 'Gemini Ultra', provider: 'Gemini', contextSize: 1000000, supportsVision: true, supportsTools: true },
  { id: 'qwen-max', name: 'Qwen Max', provider: 'Qwen', contextSize: 32000, supportsVision: true, supportsTools: true },
  { id: 'qwen-plus', name: 'Qwen Plus', provider: 'Qwen', contextSize: 128000, supportsVision: true, supportsTools: true },
  { id: 'openrouter-auto', name: 'Auto (OpenRouter)', provider: 'OpenRouter', supportsVision: true, supportsTools: true },
  { id: 'ollama/llama2', name: 'Llama 2', provider: 'Ollama', contextSize: 4096, supportsVision: false, supportsTools: true },
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedModelInfo = MOCK_MODELS.find(m => m.id === selectedModel);

  const groupedModels = MOCK_MODELS.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, ModelInfo[]>);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="text-xs text-dark-400 uppercase tracking-wider">Model</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 transition-colors"
        >
          <span className="text-sm font-medium text-white">{selectedModelInfo?.name || 'Select Model'}</span>
          <svg className={`w-4 h-4 text-dark-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-80 bg-dark-800 border border-dark-600 rounded-xl shadow-2xl z-20 overflow-hidden">
            <div className="p-3 border-b border-dark-600">
              <h3 className="text-sm font-semibold text-white">Select Model</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(groupedModels).map(([provider, models]) => (
                <div key={provider} className="border-b border-dark-600 last:border-b-0">
                  <div className="px-3 py-2 bg-dark-900">
                    <span className="text-xs font-semibold text-primary-400 uppercase">{provider}</span>
                  </div>
                  {models.map(model => (
                    <button
                      key={model.id}
                      onClick={() => {
                        onModelChange(model.id);
                        setIsOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-dark-700 transition-colors ${
                        selectedModel === model.id ? 'bg-dark-700' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">{model.name}</span>
                        <div className="flex items-center gap-1">
                          {model.supportsVision && (
                            <span className="text-xs text-dark-400" title="Supports Vision">👁</span>
                          )}
                          {model.supportsTools && (
                            <span className="text-xs text-dark-400" title="Supports Tools">🔧</span>
                          )}
                        </div>
                      </div>
                      {model.contextSize && (
                        <div className="text-xs text-dark-400 mt-0.5">
                          {model.contextSize >= 1000000 
                            ? `${model.contextSize / 1000000}M context` 
                            : `${model.contextSize / 1000}K context`}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="p-3 bg-dark-900 border-t border-dark-600">
              <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                Configure Providers →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
