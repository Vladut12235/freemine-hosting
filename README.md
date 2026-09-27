# FreeMine Hosting

A real-world Minecraft hosting monorepo built for Docker-based deployments, resource-aware server provisioning, and a dark premium dashboard.

## Architecture

- Frontend: Next.js + TypeScript + Tailwind
- Backend: Node.js + Express + TypeScript + REST API
- Database: PostgreSQL
- Cache: Redis
- Realtime: WebSocket
- Infrastructure: Docker + Docker Compose
- Minecraft: Paper / Vanilla via Docker-powered Java server containers

## Repository layout

- `frontend/` - website and dashboard UI
- `backend/` - main API and server lifecycle logic
- `worker/` - background jobs and orchestration
- `node-agent/` - real node telemetry and container task workers
- `discord-bot/` - Discord notifications + verification bot
- `database/` - schema and migration files
- `shared/` - shared constants and types
- `docker/` - Dockerfiles/config
- `scripts/` - install/update/backup automation

## Quick start

1. Copy `.env.example` to `.env` and fill in secrets.
2. Start infrastructure:
   ```bash
   docker compose up --build
   ```
3. Run app in dev mode:
   ```bash
   npm install
   npm run dev
   ```

## Production install

```bash
chmod +x install.sh
./install.sh
```

## Security notes

- No secrets are checked into Git.
- Use Docker resource limits for every game container.
- Respect per-plan CPU/RAM/storage thresholds.
- Validate payment webhooks server-side.

## License

MIT
