#!/usr/bin/env bash
set -euo pipefail

docker compose down -v --remove-orphans || true
rm -rf node_modules .next dist

echo "FreeMine Hosting has been uninstalled from the local environment."
