#!/usr/bin/env bash
# Run on the VPS (rnk@192.168.1.52), from ~/jenn-site, to redeploy after a git pull
# or rsync. The box runs this under pm2 (pm2-rnk.service keeps the pm2 daemon itself alive).
set -euo pipefail

npm ci
npm run build
pm2 reload jenn-site || pm2 start ecosystem.config.cjs
pm2 save
