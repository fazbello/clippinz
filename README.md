```markdown
# ClipAI — TikTok + Azure OpenAI Prototype

This repository is a starter scaffold for an AI-powered clipping + scripting web app with a TikTok-first approach and Azure OpenAI integration. It includes:

- Backend: Node.js + Express API with FFmpeg wrapper (worker)
- Frontend: React + Vite demo UI (deploy on Vercel)
- Integration points:
  - Azure OpenAI (for transcription + script generation)
  - TikTok (placeholder; requires TikTok developer app + review)
  - Self-hosted Whisper option for transcription
- Deploy targets: Vercel (frontend), container for backend/workers (Cloud Run / DigitalOcean / ECS)

What this scaffold is not:
- Production-ready (no OAuth, no DB migrations, no job queue persistence, no secret manager)
- TikTok and Instagram require app registration and platform review; this scaffold includes placeholders.

Quickstart (local)
1. Clone and install
   - Install Node 18+ and ffmpeg locally (ffmpeg required for local worker)
2. Backend
   - cd server
   - cp .env.example .env and fill in keys (AZURE and TIKTOK placeholders)
   - npm install
   - npm run dev
3. Frontend
   - cd client
   - npm install
   - npm run dev
4. Upload a video from the demo UI, then create a 15s clip. See server endpoints for more.

Deployment notes
- Frontend: deploy /client to Vercel
- Backend & Workers: Docker container, run in Cloud Run / ECS / DigitalOcean App Platform. Uploads should be stored in S3-compatible storage or Azure Blob Storage.
- Set secrets in Vercel/Cloud provider (AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, TIKTOK_CLIENT_ID, TIKTOK_CLIENT_SECRET, S3 keys).

Next steps (after this scaffold)
- Add OAuth (TikTok + Google) and user model
- Add Redis + BullMQ job queue for robust background processing
- Add Postgres for persistence and usage tracking
- Implement secure storage of API keys (Secrets Manager)
- Implement TikTok developer flow and handle app review requirements

If you'd like, after you create the repo I will push this scaffold and open the PR.
```
