# Nexus Agent Architecture

## Product Vision

Nexus Agent is a production-grade local desktop AI agent that combines the best capabilities of modern agentic coding tools. It provides:

- **Multi-model support**: Gemini, Qwen, OpenRouter, Ollama, OpenAI-compatible
- **Agentic reasoning**: Plan → Act → Verify → Reflect loop
- **Computer use & browser control**: Full browser automation with verification
- **Code intelligence**: Repository indexing, editing, testing, debugging
- **Kiro-style specifications**: Transform vague requests into production specs
- **Skills system**: Extensible modular capabilities
- **Premium desktop UI**: Professional developer tool experience

## Environment Analysis

### Current System
- **OS**: Debian GNU/Linux 12 (bookworm), x86_64
- **Node.js**: v20.20.2
- **npm**: 10.8.2
- **Python**: 3.12.10
- **Git**: 2.39.5
- **Memory**: ~2GB available
- **Disk**: ~9.3GB available
- **Browser**: Not installed (will need Chromium for Playwright)
- **CLIs**: gemini, qwen, ollama, docker, flutter not installed

### Architecture Decision: Electron + TypeScript Backend

**Rationale:**
1. Electron provides cross-platform desktop application capabilities
2. TypeScript ensures type safety across the entire stack
3. Node.js backend can integrate with Python tools when needed
4. Playwright for browser automation (official, well-maintained)
5. Modular architecture allows incremental implementation

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXUS AGENT                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    ELECTRON MAIN                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Window    │  │     IPC     │  │  Tray/Menu      │   │  │
│  │  │   Manager   │  │   Handler   │  │  System         │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   RENDERER (React)                        │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Project   │  │    Model    │  │      Mode       │   │  │
│  │  │   Selector  │  │   Selector  │  │     Selector    │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │    Files    │  │    Agent    │  │      Tools      │   │  │
│  │  │    Panel    │  │    Chat     │  │      Panel      │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Browser   │  │  Terminal   │  │      Diff       │   │  │
│  │  │   Preview   │  │    Panel    │  │      Viewer     │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   BACKEND CORE                            │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                  AGENT ENGINE                       │  │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐  │  │  │
│  │  │  │ Observe │→│  Plan   │→│   Act   │→│  Verify   │  │  │  │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └───────────┘  │  │  │
│  │  │       ↑                                  │          │  │  │
│  │  │       └──────────── Reflect ←────────────┘          │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌──────────────────┐  ┌──────────────────────────────┐  │  │
│  │  │  MODEL REGISTRY  │  │     PROVIDER ABSTRACTION     │  │  │
│  │  │  ┌────────────┐  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │  Gemini    │  │  │  │  ModelProvider         │  │  │  │
│  │  │  │  Qwen      │  │  │  │  - listModels()        │  │  │  │
│  │  │  │  OpenRouter│  │  │  │  - generate()          │  │  │  │
│  │  │  │  Ollama    │  │  │  │  - stream()            │  │  │  │
│  │  │  │  OpenAI    │  │  │  │  - supportsVision()    │  │  │  │
│  │  │  └────────────┘  │  │  │  - supportsTools()     │  │  │  │
│  │  └──────────────────┘  │  └────────────────────────┘  │  │  │
│  │                        └──────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌──────────────────────────────────────────────────────┐│  │
│  │  │                 TOOL REGISTRY                        ││  │
│  │  │  ┌────────────────────────────────────────────────┐  ││  │
│  │  │  │              AGENT TOOLS                       │  ││  │
│  │  │  │  • filesystem (read/write/edit/create/delete)  │  ││  │
│  │  │  │  • terminal (run/stream/kill/manage)           │  ││  │
│  │  │  │  • browser (navigate/click/type/screenshot)    │  ││  │
│  │  │  │  • computer-use (move/click/drag/scroll)       │  ││  │
│  │  │  │  • code-intel (search/index/analyze/test)      │  ││  │
│  │  │  │  • git (clone/commit/push/status)              │  ││  │
│  │  │  └────────────────────────────────────────────────┘  ││  │
│  │  └──────────────────────────────────────────────────────┘│  │
│  │                                                           │  │
│  │  ┌──────────────────┐  ┌──────────────────────────────┐  │  │
│  │  │  SKILL REGISTRY  │  │     BROWSER REGISTRY         │  │  │
│  │  │  ┌────────────┐  │  │  ┌────────────────────────┐  │  │  │
│  │  │  │  browser   │  │  │  │  Playwright Engine     │  │  │  │
│  │  │  │  coding    │  │  │  │  - Page Management     │  │  │  │
│  │  │  │  debugging │  │  │  │  - Element Targeting   │  │  │  │
│  │  │  │  testing   │  │  │  │  - Screenshot/Vision   │  │  │  │
│  │  │  │  spec      │  │  │  │  - Console/Network     │  │  │  │
│  │  │  └────────────┘  │  │  └────────────────────────┘  │  │  │
│  │  └──────────────────┘  └──────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   PERSISTENCE LAYER                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Config    │  │    Task     │  │      Log        │   │  │
│  │  │   Store     │  │    Store    │  │      Store      │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │   Memory    │  │    Skill    │  │      Spec       │   │  │
│  │  │   Store     │  │    Cache    │  │      Store      │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   SECURITY LAYER                          │  │
│  │  • Permission System    • Tool Approval                   │  │
│  │  • Secret Encryption    • Workspace Boundaries            │  │
│  │  • Audit Logging        • Timeout Limits                  │  │
│  │  • Emergency Stop       • Destructive Action Confirm      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

                              EXTERNAL
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Gemini API     │  │   Qwen API      │  │  OpenRouter     │
│  / Vertex AI    │  │  / Model Studio │  │  / Providers    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   Ollama        │  │   Playwright    │  │   Git           │
│   Local Models  │  │   Browser Auto  │  │   Repositories  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Core Interfaces

### Model Provider

```typescript
interface ModelProvider {
  id: string;
  name: string;
  listModels(): Promise<ModelInfo[]>;
  generate(request: GenerateRequest): Promise<GenerateResponse>;
  stream(request: GenerateRequest): AsyncIterable<StreamChunk>;
  supportsVision(modelId: string): boolean;
  supportsTools(modelId: string): boolean;
  getContextSize(modelId: string): number;
}

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  contextSize?: number;
  supportsVision?: boolean;
  supportsTools?: boolean;
  description?: string;
}
```

### Agent Tool

```typescript
interface AgentTool {
  name: string;
  description: string;
  inputSchema: JsonSchema;
  execute(params: Record<string, any>, context: ToolContext): Promise<ToolResult>;
}

interface ToolResult {
  success: boolean;
  output?: string;
  error?: string;
  data?: any;
  requiresVerification?: boolean;
}
```

### Skill

```typescript
interface Skill {
  name: string;
  version: string;
  description: string;
  tools: string[];
  permissions: Permission[];
  instructions?: string;
  examples?: SkillExample[];
  configuration?: Record<string, any>;
}
```

### Agent Loop

```typescript
interface AgentState {
  taskId: string;
  status: 'idle' | 'running' | 'paused' | 'completed' | 'failed';
  currentObjective: string;
  plan: Step[];
  executedSteps: StepResult[];
  memory: MemoryEntry[];
  filesTouched: string[];
  browserState?: BrowserState;
  terminalState?: TerminalState;
  errors: AgentError[];
}

interface Step {
  id: string;
  action: string;
  description: string;
  tool?: string;
  parameters?: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed';
}
```

## Browser Automation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   BROWSER ENGINE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  BrowserPool    │    │     SessionManager          │    │
│  │  - launch()     │    │  - createSession()          │    │
│  │  - close()      │    │  - getSession()             │    │
│  │  - getBrowser() │    │  - switchTab()              │    │
│  │  - contexts[]   │    │  - closeTab()               │    │
│  └─────────────────┘    └─────────────────────────────┘    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               PAGE CONTROLLER                         │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────────────┐   │  │
│  │  │ Navigation│ │  Input    │ │    Inspection     │   │  │
│  │  │ navigate()│ │  click()  │ │    getDOM()       │   │  │
│  │  │ back()    │ │  type()   │ │    getA11yTree()  │   │  │
│  │  │ reload()  │ │  scroll() │ │    screenshot()   │   │  │
│  │  │ goto()    │ │  drag()   │ │    console()      │   │  │
│  │  └───────────┘ └───────────┘ └───────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ACTION VERIFIER                          │  │
│  │  • Pre-condition checks                               │  │
│  │  • Post-condition verification                        │  │
│  │  • Timeout handling                                   │  │
│  │  • Retry logic                                        │  │
│  │  • Error recovery                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Computer Use Abstraction

```typescript
interface ComputerUseEngine {
  // Mouse
  move(x: number, y: number): Promise<void>;
  click(button?: 'left' | 'right' | 'middle'): Promise<void>;
  doubleClick(): Promise<void>;
  rightClick(): Promise<void>;
  drag(from: Position, to: Position): Promise<void>;
  
  // Keyboard
  type(text: string): Promise<void>;
  keypress(key: string, modifiers?: Modifier[]): Promise<void>;
  
  // Screen
  screenshot(region?: Rectangle): Promise<Screenshot>;
  scroll(direction: 'up' | 'down' | 'left' | 'right', amount?: number): Promise<void>;
  
  // Information
  getActiveWindow(): Promise<WindowInfo>;
  getFocusedElement(): Promise<ElementInfo>;
}
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYER                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  PermissionMgr  │    │     ToolGuard               │    │
│  │  - check()      │    │  - validateInput()          │    │
│  │  - request()    │    │  - sanitizeOutput()         │    │
│  │  - audit()      │    │  - rateLimit()              │    │
│  └─────────────────┘    └─────────────────────────────┘    │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  SecretStore    │    │     WorkspaceGuard          │    │
│  │  - encrypt()    │    │  - pathValidation()         │    │
│  │  - decrypt()    │    │  - symlinkBlock()           │    │
│  │  - rotate()     │    │  - escapePrevention()       │    │
│  └─────────────────┘    └─────────────────────────────┘    │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              EMERGENCY STOP                           │  │
│  │  • Kill all running processes                         │  │
│  │  • Close browser sessions                             │  │
│  │  • Cancel pending operations                          │  │
│  │  • Preserve state for recovery                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
USER INPUT
    │
    ▼
┌─────────────────┐
│  Input Parser   │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Mode Detector  │──→ Ask / Plan / Build / Debug / Review / Browser
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Model Router   │──→ Selected Provider + Model
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Agent Loop     │
│  ┌───────────┐  │
│  │ OBSERVE   │──┼──→ Read context, files, browser state
│  └───────────┘  │
│  ┌───────────┐  │
│  │ PLAN      │──┼──→ Generate steps
│  └───────────┘  │
│  ┌───────────┐  │
│  │ ACT       │──┼──→ Execute tools
│  └───────────┘  │
│  ┌───────────┐  │
│  │ VERIFY    │──┼──→ Check results
│  └───────────┘  │
│  ┌───────────┐  │
│  │ REFLECT   │──┼──→ Update state, decide next
│  └───────────┘  │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Response       │
│  Aggregator     │
└─────────────────┘
    │
    ▼
USER OUTPUT
```

## File Structure

```
nexus-agent/
├── package.json
├── tsconfig.json
├── electron/
│   ├── main.ts              # Electron main process
│   ├── preload.ts           # Preload script
│   └── window-manager.ts    # Window management
├── src/
│   ├── renderer.tsx         # React entry point
│   ├── App.tsx              # Root component
│   ├── components/          # UI components
│   │   ├── Layout/
│   │   ├── ModelSelector/
│   │   ├── ProjectSelector/
│   │   ├── AgentChat/
│   │   ├── FilePanel/
│   │   ├── ToolPanel/
│   │   ├── BrowserPreview/
│   │   ├── TerminalPanel/
│   │   └── ...
│   ├── hooks/               # React hooks
│   └── styles/              # CSS/styled-components
├── backend/
│   ├── index.ts             # Backend entry point
│   ├── agent/
│   │   ├── engine.ts        # Agent loop engine
│   │   ├── state.ts         # State management
│   │   └── memory.ts        # Memory system
│   ├── providers/
│   │   ├── base.ts          # Base provider interface
│   │   ├── gemini.ts        # Gemini provider
│   │   ├── qwen.ts          # Qwen provider
│   │   ├── openrouter.ts    # OpenRouter provider
│   │   ├── ollama.ts        # Ollama provider
│   │   └── openai.ts        # OpenAI-compatible
│   ├── tools/
│   │   ├── registry.ts      # Tool registry
│   │   ├── filesystem.ts    # Filesystem tools
│   │   ├── terminal.ts      # Terminal tools
│   │   ├── browser.ts       # Browser tools
│   │   ├── computer-use.ts  # Computer use tools
│   │   └── code-intel.ts    # Code intelligence
│   ├── skills/
│   │   ├── registry.ts      # Skill registry
│   │   └── [skill-name]/    # Individual skills
│   ├── browser/
│   │   ├── engine.ts        # Playwright engine
│   │   ├── session.ts       # Session management
│   │   └── verifier.ts      # Action verifier
│   ├── security/
│   │   ├── permissions.ts   # Permission system
│   │   ├── secrets.ts       # Secret storage
│   │   └── audit.ts         # Audit logging
│   └── storage/
│       ├── config.ts        # Configuration
│       ├── tasks.ts         # Task persistence
│       └── logs.ts          # Log storage
├── .agent/                  # Agent workspace data
│   ├── config/
│   ├── memory/
│   ├── tasks/
│   └── logs/
└── assets/                  # Application assets
```

## Development Phases

See DEVELOPMENT_PLAN.md for detailed phase breakdown.

## Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Desktop Shell | Electron | Cross-platform, mature, large ecosystem |
| Frontend | React + TypeScript | Component-based, type-safe, familiar |
| Styling | Tailwind CSS | Rapid UI development, consistent design |
| Backend Runtime | Node.js | Unified language, async I/O |
| Backend Language | TypeScript | Type safety, IDE support |
| Browser Automation | Playwright | Official, reliable, multi-browser |
| Process Management | node-pty | Real terminal emulation |
| State Management | Zustand | Lightweight, simple |
| IPC | Electron IPC | Secure, built-in |
| Storage | JSON files + SQLite | Simple config + structured data |
| Encryption | crypto (Node.js) | Built-in, secure |

## Key Design Decisions

1. **Local-first**: All core operations run locally; cloud APIs only for model inference
2. **Provider-agnostic**: No hard coupling to any single AI provider
3. **Extensible tools**: Tool registry allows adding new capabilities without core changes
4. **Skills system**: Packaged capabilities that can be enabled/disabled
5. **Verification-first**: Browser and computer actions include verification
6. **Security by default**: Permissions, approvals, and audit logging built-in
7. **Transparent operation**: Activity panel shows what agent is doing
8. **Resumable tasks**: State persistence allows recovery from failures
