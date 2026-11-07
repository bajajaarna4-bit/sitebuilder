# NEXUS AI — Deployment Architecture & Operations Guide

This guide describes how to configure, deploy, and operate the NEXUS AI platform in development, staging, and production environments.

---

## 1. Deployment Topology

```mermaid
graph LR
    DNS["Cloudflare DNS / Edge SSL"]
    AppInstance["NEXUS Next.js App (Vercel / Docker Container)"]
    PostgresDB[("Supabase / Managed PostgreSQL")]
    ObjectStore[("S3 / Storage Bucket (Project ZIPs & Assets)")]

    DNS --> AppInstance
    AppInstance --> PostgresDB
    AppInstance --> ObjectStore
```

---

## 2. Environment Variables Specification

Create `.env.local` for local development or configure in your deployment platform:

```ini
# NEXUS AI Core
NEXT_PUBLIC_APP_NAME="NEXUS AI"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database Configuration (Supabase / Postgres)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."

# Encryption Key for User Stored API Keys (32 bytes hex)
ENCRYPTION_MASTER_KEY="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"

# Default Model Provider API Keys (Optional server defaults)
GEMINI_API_KEY=""
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""

# Application Feature Flags
ENABLE_LOCAL_FALLBACK_AI=true
ENABLE_STRICT_SANDBOX=true
```

---

## 3. Production Deployment Steps

### 3.1 Dockerized Deployment
A production multi-stage Dockerfile is provided:

```bash
# Build the production image
docker build -t nexus-ai:latest -f infrastructure/docker/Dockerfile .

# Run the container
docker run -p 3000:3000 \
  --env-file .env.production \
  nexus-ai:latest
```

### 3.2 Vercel / Edge Deployment
The platform is designed to deploy natively to Vercel:
1. Connect Git repository.
2. Configure environment variables in Vercel project settings.
3. Deploy automatically via GitHub / Git push hooks.

### 3.3 Health Checks & Monitoring
- **Liveness Probe**: `GET /api/health`
- **Readiness Probe**: Tests database connection and AI provider registry status.

