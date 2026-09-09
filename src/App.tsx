import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { ActivityPanel } from './components/ActivityPanel/ActivityPanel';
import { AgentChat } from './components/AgentChat/AgentChat';
import { FilePanel } from './components/FilePanel/FilePanel';
import { TerminalPanel } from './components/TerminalPanel/TerminalPanel';
import { BrowserPreview } from './components/BrowserPreview/BrowserPreview';

interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
}

interface ActivityItem {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
}

function App() {
  const [selectedModel, setSelectedModel] = useState('gemini-pro');
  const [selectedMode, setSelectedMode] = useState('ask');
  const [agentStatus, setAgentStatus] = useState<'idle' | 'running' | 'paused' | 'stopped'>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate agent starting
    setAgentStatus('running');
    addActivity('Received Task', content);
    
    // Simulate agent response (placeholder for real agent loop)
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: `I'll help you with: "${content}"\n\nThis is a placeholder response. The agent loop will be implemented in Phase 5.\n\nSelected Model: ${selectedModel}\nSelected Mode: ${selectedMode}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, agentMessage]);
      setAgentStatus('idle');
      addActivity('Completed', 'Initial response generated');
    }, 1000);
  };

  const addActivity = (action: string, description: string) => {
    const activity: ActivityItem = {
      id: Date.now().toString(),
      action,
      description,
      timestamp: new Date(),
    };
    setActivities(prev => [activity, ...prev].slice(0, 50));
  };

  const handleStopAgent = () => {
    setAgentStatus('stopped');
    addActivity('Stopped', 'Agent stopped by user');
  };

  return (
    <div className="h-screen w-screen bg-dark-950 flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        projectName="nexus-agent"
        selectedModel={selectedModel}
        selectedMode={selectedMode}
        agentStatus={agentStatus}
        onModelChange={setSelectedModel}
        onModeChange={setSelectedMode}
        onStopAgent={handleStopAgent}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Activity Panel */}
        <ActivityPanel activities={activities} />

        {/* Center - Chat */}
        <AgentChat
          messages={messages}
          onSendMessage={handleSendMessage}
          isAgentRunning={agentStatus === 'running'}
        />

        {/* Right Sidebar */}
        <div className="w-96 border-l border-dark-700 flex flex-col overflow-hidden">
          {/* File Panel */}
          <div className="h-1/3 border-b border-dark-700">
            <FilePanel />
          </div>
          
          {/* Browser Preview */}
          <div className="h-1/3 border-b border-dark-700">
            <BrowserPreview />
          </div>
          
          {/* Terminal */}
          <div className="h-1/3">
            <TerminalPanel output={terminalOutput} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
