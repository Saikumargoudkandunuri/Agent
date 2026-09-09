# Nexus Agent Development Plan

## Phase Overview

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| 0 | Environment Inspection | Analyze system, tools, dependencies | ✅ COMPLETE |
| 1 | Architecture & Design | Create technical specifications | ✅ COMPLETE |
| 2 | Application Shell | Electron + React base UI | NEXT |
| 3 | Provider Abstraction | Model provider interfaces | PENDING |
| 4 | Terminal + Filesystem | Core agent tools | PENDING |
| 5 | Agent Loop | Planning and execution engine | PENDING |
| 6 | Browser Control Engine | Playwright integration | PENDING |
| 7 | Computer Use Engine | Screen/keyboard/mouse control | PENDING |
| 8 | Code Intelligence | Edit/test/review workflow | PENDING |
| 9 | Specification System | Kiro-style spec generation | PENDING |
| 10 | Skills System | Modular capability packages | PENDING |
| 11 | Additional Providers | OpenRouter, Ollama, etc. | PENDING |
| 12 | Security & Permissions | Tool approval, audit logging | PENDING |
| 13 | Diagnostics & Logging | Health checks, observability | PENDING |
| 14 | Build & Package | Production desktop application | PENDING |

---

## Phase 0: Environment Inspection ✅ COMPLETE

### Tasks
- [x] Detect OS and system specs
- [x] Check Node.js/npm availability
- [x] Check Python availability
- [x] Check Git availability
- [x] Check browser availability
- [x] Check CLI tool availability (gemini, qwen, ollama, docker)
- [x] Document findings in ARCHITECTURE.md

### Findings
- Debian 12, x86_64
- Node.js v20.20.2, npm 10.8.2
- Python 3.12.10
- Git 2.39.5
- No browsers installed (need Chromium for Playwright)
- No AI CLIs installed (will use API-based providers)
- ~2GB RAM available, ~9.3GB disk

---

## Phase 1: Architecture & Design ✅ COMPLETE

### Tasks
- [x] Create ARCHITECTURE.md with full system design
- [x] Define core interfaces (ModelProvider, AgentTool, Skill)
- [x] Design browser automation architecture
- [x] Design computer use abstraction
- [x] Design security architecture
- [x] Create development plan (this document)
- [x] Define file structure
- [x] Select technology stack

### Deliverables
- ARCHITECTURE.md
- DEVELOPMENT_PLAN.md
- Provider capability matrix (below)

---

## Phase 2: Application Shell (NEXT)

### Goals
Create the basic Electron + React application structure with premium UI.

### Tasks
- [ ] Initialize npm project with TypeScript
- [ ] Install Electron and dependencies
- [ ] Install React and dependencies
- [ ] Install Tailwind CSS
- [ ] Create Electron main process
- [ ] Create preload script with secure IPC
- [ ] Create React renderer entry point
- [ ] Create basic window layout
- [ ] Implement model selector UI component
- [ ] Implement project selector UI component
- [ ] Implement mode selector UI component
- [ ] Create agent chat panel
- [ ] Create files panel
- [ ] Create tools panel placeholder
- [ ] Create terminal panel placeholder
- [ ] Create browser preview placeholder
- [ ] Add stop agent button
- [ ] Test application launches correctly

### Acceptance Criteria
- Application opens in a window
- UI shows all major panels (even if empty)
- Model selector displays (static data initially)
- Stop button is visible and functional
- No console errors

---

## Phase 3: Provider Abstraction

### Goals
Implement the ModelProvider interface and initial providers.

### Tasks
- [ ] Create backend directory structure
- [ ] Define ModelProvider interface
- [ ] Define ModelInfo interface
- [ ] Create provider registry
- [ ] Implement Gemini provider (API key based)
- [ ] Implement Qwen provider (OpenAI-compatible)
- [ ] Implement OpenRouter provider
- [ ] Implement Ollama provider
- [ ] Implement OpenAI-compatible provider
- [ ] Create model discovery mechanism
- [ ] Add provider configuration UI
- [ ] Add API key management (secure storage)
- [ ] Test each provider with simple request

### Acceptance Criteria
- User can select provider in settings
- User can enter API keys securely
- Models are discovered and listed
- Test request succeeds for configured provider
- UI updates to show available models

### Provider Capability Matrix

| Provider | Vision | Tools | Context | Auth Method |
|----------|--------|-------|---------|-------------|
| Gemini (Google) | ✅ | ✅ | Up to 2M | API Key / OAuth |
| Qwen (Alibaba) | ✅ | ✅ | Up to 256K | API Key |
| OpenRouter | Varies | Varies | Varies | API Key |
| Ollama | ✅* | ✅* | Configurable | Local |
| OpenAI-compatible | ✅* | ✅* | Configurable | API Key |

*Depends on specific model

---

## Phase 4: Terminal + Filesystem Tools

### Goals
Implement core agent tools for filesystem and terminal operations.

### Tasks
- [ ] Define AgentTool interface
- [ ] Create tool registry
- [ ] Implement filesystem tools:
  - read_file
  - write_file
  - edit_file
  - create_file
  - delete_file
  - rename_file
  - list_directory
  - search_files
  - glob_files
- [ ] Implement terminal tools:
  - run_command
  - stream_output
  - kill_process
  - list_processes
  - detect_port
- [ ] Add node-pty for real terminal
- [ ] Implement workspace boundaries
- [ ] Add destructive action confirmations
- [ ] Create terminal UI component with live output
- [ ] Create file tree UI component
- [ ] Test tools manually

### Acceptance Criteria
- Agent can read/write files within workspace
- Terminal commands execute and stream output
- Destructive actions require confirmation
- Workspace boundaries enforced
- UI shows file tree and terminal output

---

## Phase 5: Agent Loop

### Goals
Implement the core agentic reasoning loop.

### Tasks
- [ ] Define AgentState interface
- [ ] Define Step and StepResult interfaces
- [ ] Implement OBSERVE phase
- [ ] Implement PLAN phase
- [ ] Implement ACT phase
- [ ] Implement VERIFY phase
- [ ] Implement REFLECT phase
- [ ] Create state persistence
- [ ] Implement retry logic
- [ ] Implement timeout handling
- [ ] Implement cancellation
- [ ] Add step limits
- [ ] Create activity panel UI
- [ ] Show agent progress in UI
- [ ] Test with simple tasks

### Acceptance Criteria
- Agent can receive a task
- Agent generates and executes a plan
- Agent verifies results
- State persists across operations
- User can see agent activity
- User can stop agent
- Agent handles errors gracefully

---

## Phase 6: Browser Control Engine

### Goals
Implement full browser automation using Playwright.

### Tasks
- [ ] Install Playwright
- [ ] Install Chromium browser
- [ ] Create BrowserEngine class
- [ ] Implement session management
- [ ] Implement tab management
- [ ] Implement navigation tools:
  - browser.open
  - browser.navigate
  - browser.back
  - browser.forward
  - browser.reload
  - browser.new_tab
  - browser.close_tab
  - browser.switch_tab
- [ ] Implement interaction tools:
  - browser.click
  - browser.type
  - browser.select
  - browser.upload
- [ ] Implement inspection tools:
  - browser.get_page
  - browser.get_dom
  - browser.get_accessibility_tree
  - browser.screenshot
  - browser.console
  - browser.network
- [ ] Implement download detection
- [ ] Implement popup/modal handling
- [ ] Add action verifier
- [ ] Add retry logic
- [ ] Create browser preview UI
- [ ] Show screenshots in UI
- [ ] Test browser automation

### Acceptance Criteria
- Browser launches in headless/headful mode
- Agent can navigate to URLs
- Agent can click and type
- Screenshots are captured and displayed
- Console errors are detected
- Downloads are handled
- Actions are verified after execution

---

## Phase 7: Computer Use Engine

### Goals
Implement screen/keyboard/mouse control for general computer use.

### Tasks
- [ ] Research cross-platform input libraries
- [ ] Implement mouse control:
  - computer.move
  - computer.click
  - computer.double_click
  - computer.right_click
  - computer.drag
- [ ] Implement keyboard control:
  - computer.type
  - computer.keypress
- [ ] Implement screen capture:
  - computer.screenshot
- [ ] Implement scroll
- [ ] Implement window information
- [ ] Implement focused element detection
- [ ] Add visual targeting
- [ ] Add safety limits
- [ ] Test computer use actions

### Acceptance Criteria
- Mouse movements work
- Keyboard input works
- Screenshots capture screen
- Actions respect safety limits
- Agent can reason from screenshots

---

## Phase 8: Code Intelligence

### Goals
Implement coding agent capabilities.

### Tasks
- [ ] Implement repository indexing
- [ ] Implement symbol search
- [ ] Implement semantic search
- [ ] Implement dependency analysis
- [ ] Implement error analysis
- [ ] Implement test discovery
- [ ] Implement test execution
- [ ] Integrate linting
- [ ] Integrate formatting
- [ ] Implement code review
- [ ] Generate diffs
- [ ] Create diff viewer UI
- [ ] Test code intelligence features

### Acceptance Criteria
- Agent can search codebase
- Agent can identify errors
- Tests can be discovered and run
- Code changes show clear diffs
- Agent can review its own code

---

## Phase 9: Specification System

### Goals
Implement Kiro-style specification generation.

### Tasks
- [ ] Define specification structure
- [ ] Implement requirements generation
- [ ] Implement architecture generation
- [ ] Implement implementation plan generation
- [ ] Implement acceptance criteria generation
- [ ] Implement test plan generation
- [ ] Create spec storage
- [ ] Create spec approval workflow
- [ ] Create spec execution workflow
- [ ] Add spec UI components
- [ ] Test specification workflow

### Acceptance Criteria
- Vague requests transform into structured specs
- User can review and approve specs
- Approved specs drive implementation
- Specs persist with tasks

---

## Phase 10: Skills System

### Goals
Implement modular skills architecture.

### Tasks
- [ ] Define skill manifest format
- [ ] Create skill registry
- [ ] Implement skill discovery
- [ ] Implement skill installation
- [ ] Implement skill enable/disable
- [ ] Create built-in skills:
  - browser-control
  - coding
  - debugging
  - testing
  - git
  - terminal
  - specification
- [ ] Create skills management UI
- [ ] Test skill loading

### Acceptance Criteria
- Skills can be discovered
- Skills can be enabled/disabled
- Built-in skills work correctly
- UI shows installed skills

---

## Phase 11: Additional Providers

### Goals
Expand provider support.

### Tasks
- [ ] Complete OpenRouter integration
- [ ] Complete Ollama integration
- [ ] Add more OpenAI-compatible endpoints
- [ ] Add LM Studio support
- [ ] Add model search/filter
- [ ] Improve model capability detection
- [ ] Test all providers

### Acceptance Criteria
- All configured providers work
- Models are correctly discovered
- Capabilities are accurately reported

---

## Phase 12: Security & Permissions

### Goals
Implement comprehensive security features.

### Tasks
- [ ] Implement permission system
- [ ] Implement tool approval workflow
- [ ] Implement secret encryption
- [ ] Implement workspace boundaries
- [ ] Implement audit logging
- [ ] Implement timeout limits
- [ ] Implement emergency stop
- [ ] Add rate limiting
- [ ] Implement input sanitization
- [ ] Implement output filtering
- [ ] Test security features

### Acceptance Criteria
- Permissions are enforced
- Secrets are encrypted
- Audit log captures actions
- Emergency stop works immediately
- Workspace boundaries prevent escapes

---

## Phase 13: Diagnostics & Logging

### Goals
Implement health checks and observability.

### Tasks
- [ ] Create diagnostics screen
- [ ] Implement system health checks
- [ ] Implement provider health checks
- [ ] Implement browser health check
- [ ] Create structured logging
- [ ] Create log viewer UI
- [ ] Implement error reporting
- [ ] Add task history view
- [ ] Test diagnostics

### Acceptance Criteria
- Diagnostics show system status
- Logs are structured and searchable
- Errors are properly reported
- Task history is accessible

---

## Phase 14: Build & Package

### Goals
Create production desktop application.

### Tasks
- [ ] Configure Electron builder
- [ ] Create production build
- [ ] Test on target platforms
- [ ] Create installer
- [ ] Document installation
- [ ] Create user documentation
- [ ] Final testing pass
- [ ] Release preparation

### Acceptance Criteria
- Application builds successfully
- Installer works
- Application runs without errors
- Documentation is complete

---

## Self-Testing Requirements

After each phase:

1. **Build**: `npm run build` must succeed
2. **Lint**: `npm run lint` must pass
3. **Launch**: Application must open without errors
4. **UI Inspection**: Manually verify UI elements
5. **Feature Test**: Test new functionality
6. **Error Fix**: Address any issues before proceeding

---

## Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Playwright browser install fails | High | Pre-install browsers, provide manual instructions |
| API rate limits | Medium | Implement caching, rate limiting |
| Memory constraints | Medium | Implement context compaction, streaming |
| Cross-platform issues | Medium | Test on Linux first, then expand |
| Security vulnerabilities | High | Defense in depth, audit logging |

---

## Success Metrics

- Agent completes tasks autonomously
- Browser automation works reliably
- Multiple providers function correctly
- UI is responsive and professional
- Security features prevent misuse
- Error recovery works gracefully
