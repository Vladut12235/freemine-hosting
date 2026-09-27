#!/usr/bin/env bash
set -euo pipefail

# Restore the last known backup from ./backups.
LATEST=$(ls -1t ./backups 2>/dev/null | head -n 1)

if [ -z "$LATEST" ]; then
  echo "No backup found in ./backups"
  exit 1
fi

tar -xzf "./backups/$LATEST" -C ./

echo "Restored backup: $LATEST"
