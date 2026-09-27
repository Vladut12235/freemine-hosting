#!/usr/bin/env bash
set -euo pipefail

# Install dependencies and initialize the environment.
NODE_VERSION="20"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Please install Node.js 20+ and run again."
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required. Please install Docker and try again."
  exit 1
fi

if [ ! -f .env ]; then
  cp .env.example .env
fi

npm install
npm run build

echo "Installation complete. Use 'docker compose up --build' to start the stack."
