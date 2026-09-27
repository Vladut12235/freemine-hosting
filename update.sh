#!/usr/bin/env bash
set -euo pipefail

# Update existing stack.

git pull --ff-only || true
npm install
npm run build

docker compose up --build -d

echo "Update complete."
