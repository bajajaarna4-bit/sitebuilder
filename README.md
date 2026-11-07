# NEXUS AI

> **"From an idea to a fully functional application. Designed, developed, tested, and deployed by AI."**

NEXUS AI is a production-grade autonomous AI website and full-stack software development platform inspired by Google Antigravity, Google AI Studio, Lovable, and Emergent. It orchestrates a multi-agent team to take natural language requirements through the complete development lifecycle:

$$\text{IDEA} \longrightarrow \text{PLAN} \longrightarrow \text{DESIGN} \longrightarrow \text{CODE} \longrightarrow \text{EXECUTE} \longrightarrow \text{TEST} \longrightarrow \text{DEBUG} \longrightarrow \text{DEPLOY}$$

---

## Key Highlights

- **Multi-Agent Autonomous Orchestration**: 10 specialized agent roles (Product Planner, UI/UX Designer, Frontend Developer, Backend Developer, Database Engineer, Debugging Engineer, Testing Engineer, Security Engineer, Performance Engineer, Deployment Engineer).
- **Universal AI Model Control Center**: Provider-agnostic adapter supporting Google Gemini, OpenAI, Anthropic Claude, and local/custom endpoints with encrypted server-side credential storage, BYOK (Bring Your Own Key), model fallbacks, token counting, cost estimation, and live health checks.
- **Real Development Environment**: Full IDE layout featuring Monaco editor, syntax highlighting, multi-file tabs, file tree explorer, diff viewer, terminal emulator, git checkpoints, and live application preview with device switching (desktop, tablet, mobile).
- **Interactive Visual Editor & Screenshot-to-Code**: Click-to-inspect UI elements, bidirectional visual-to-code synchronization, real-time styling updates, and multi-modal screenshot analysis to generate functional interfaces.
- **Isolated Execution & Sandbox System**: Secure virtual workspace execution manager with CPU/memory limits, execution timeouts, network egress control, safe preview bundling, and runtime log capture.
- **Full-Stack & Database Generation**: Automated creation of PostgreSQL/Supabase schemas, migrations, CRUD APIs, business logic, validation, authentication, and role-based permissions.
- **Production Deployment Engine**: Pluggable deployment adapters for Supabase, Vercel, Netlify, custom webhooks, and production ZIP exports with automated build verification.
- **Enterprise Multi-Tenancy & Security**: Free, Pro, Team, and Enterprise entitlement quotas, role-based access control, CSRF protection, input sanitization, audit logging, and strict data isolation.

---

## Architecture Overview

```
nexus-ai/
├── apps/
│   └── web/                     # Next.js 15 Full-Stack SaaS Application
│       ├── src/
│       │   ├── app/             # App Router pages & API routes
│       │   ├── components/      # UI, IDE, Canvas, Preview, Terminal
│       │   └── styles/          # Tailwind CSS & design system
├── packages/
│   ├── shared-types/            # Unified domain models & contracts
│   ├── ai-providers/            # Gemini, OpenAI, Claude adapters & health checks
│   ├── agent-engine/            # Orchestrator & 10 specialized agents
│   ├── project-engine/          # VFS, Templates, AST modifier, ZIP exporter
│   ├── execution-sandbox/       # Virtual runtime, preview bundler, terminal
│   └── security/                # Secret encryption, RLS policies, rate limits
├── docs/                        # Specifications, Architecture, Security, API
└── tests/                       # Unit, integration, and E2E test suites
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.0.0 (Node 24 LTS verified)
- pnpm >= 9.0.0 (pnpm 12.15 verified)
- Git >= 2.40

### Installation

```bash
# Clone the repository
git clone https://github.com/nexus-ai/nexus-platform.git
cd "site builder combo"

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Run the development server
pnpm dev
```

Visit `http://localhost:3000` to access the NEXUS AI platform.

---

## Documentation

- [Architecture Guide](ARCHITECTURE.md)
- [Implementation Plan](IMPLEMENTATION_PLAN.md)
- [Database Schema & Supabase Setup](DATABASE_SCHEMA.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Security Model & Sandbox Policies](SECURITY.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Engineering Changelog](CHANGELOG.md)

---

## License

Proprietary © NEXUS AI Systems. All rights reserved.
