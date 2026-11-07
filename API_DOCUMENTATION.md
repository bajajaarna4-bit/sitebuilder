# NEXUS AI — API Documentation

This document specifies the REST, Server Action, and Streaming interfaces exposed by the NEXUS AI backend.

---

## 1. Authentication & Session

All API endpoints (except `/api/health` and `/api/auth/*`) require a valid session token passed via `Authorization: Bearer <jwt>` or standard HTTP-only session cookies.

---

## 2. Endpoints

### 2.1 Health Check
- **`GET /api/health`**
  - **Response**: `200 OK`
  ```json
  {
    "status": "healthy",
    "version": "1.0.0",
    "timestamp": "2026-11-07T14:30:00Z",
    "services": {
      "database": "connected",
      "ai_gateway": "ready",
      "sandbox_runner": "active"
    }
  }
  ```

### 2.2 Projects Management
- **`GET /api/projects`**
  - Query projects belonging to the authenticated user.
  - Query parameters: `archived=false`, `limit=20`, `search=streaming`
- **`POST /api/projects`**
  - Create a new project.
  - Body:
    ```json
    {
      "name": "Netflix Clone",
      "description": "Premium video streaming service with hero and modal player",
      "template": "netflix-streaming"
    }
    ```
- **`GET /api/projects/:id`**
  - Fetch detailed project metadata, file tree summary, and status.
- **`DELETE /api/projects/:id`**
  - Delete project and its associated files, agent runs, and deployments.
- **`POST /api/projects/:id/export`**
  - Generate and download a structured ZIP archive of the project codebase.

### 2.3 Files & Virtual File System (VFS)
- **`GET /api/projects/:id/files`**
  - List all files and directories in the project.
- **`GET /api/projects/:id/files/content?path=/src/App.tsx`**
  - Fetch content and version of an individual file.
- **`PUT /api/projects/:id/files`**
  - Create or update a file.
  - Body:
    ```json
    {
      "path": "/src/components/Hero.tsx",
      "content": "export function Hero() { ... }",
      "language": "typescript"
    }
    ```
- **`DELETE /api/projects/:id/files?path=/src/temp.txt`**
  - Remove file from the virtual file system.

### 2.4 Autonomous Agent Orchestrator
- **`POST /api/projects/:id/agent/run`**
  - Dispatch a natural language instruction to the 10-agent orchestration team.
  - Body:
    ```json
    {
      "prompt": "Build a Netflix-like streaming platform with dark aesthetic, hero carousel, video modal, and category rows.",
      "model": "gemini-2.5-pro",
      "options": {
        "autoFix": true,
        "runTests": true
      }
    }
    ```
  - **Streaming SSE Response**:
    `text/event-stream` delivering real-time lifecycle updates:
    ```
    event: state_change
    data: {"status": "PLANNING", "stage": "Product Planner analyzing requirements"}

    event: task_update
    data: {"agent": "planner", "title": "Specifying Netflix page architecture", "status": "completed"}

    event: file_written
    data: {"path": "/src/components/HeroBanner.tsx", "action": "create"}

    event: test_result
    data: {"tests": 12, "passed": 12, "failed": 0}

    event: state_change
    data: {"status": "READY", "previewUrl": "/preview/proj_123"}
    ```
- **`POST /api/projects/:id/agent/cancel`**
  - Safely aborts the running agent sequence.

### 2.5 AI Model Control Center
- **`GET /api/ai/models`**
  - List available model providers (Gemini, OpenAI, Anthropic, Custom), their status, token rate, and connection health.
- **`POST /api/ai/credentials`**
  - Save or update encrypted user API keys.
- **`POST /api/ai/health-check`**
  - Test ping an AI provider API endpoint to verify credential validity.

### 2.6 Live Preview & Sandbox
- **`GET /api/projects/:id/preview/bundle`**
  - Compile the VFS into a client-executable bundle served inside the sandboxed preview iframe.
- **`POST /api/projects/:id/preview/inspect`**
  - Visual element inspector: accepts DOM selector or target identifier and returns corresponding source file, line number, and component hierarchy.

### 2.7 Deployment Engine
- **`POST /api/projects/:id/deploy`**
  - Trigger deployment to target provider (`supabase`, `vercel`, `netlify`, `zip`).
- **`GET /api/projects/:id/deployments`**
  - List deployment history, live URLs, and build logs.

