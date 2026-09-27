#!/usr/bin/env bash
set -euo pipefail

# Create a backup archive for the current deployment.
BACKUP_DIR="./backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

if [ -d ./database ]; then
  tar -czf "$BACKUP_DIR/freemine-db-$TIMESTAMP.tar.gz" ./database
fi

if [ -d ./backend ]; then
  tar -czf "$BACKUP_DIR/freemine-backend-$TIMESTAMP.tar.gz" ./backend
fi

echo "Backup created in $BACKUP_DIR"
