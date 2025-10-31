#!/usr/bin/env bash
set -euo pipefail

PUB="/ssd1/workspace/criticalpath.dev/hrvatch.github.io"

# 1) Build into the publish worktree
bundle install
bundle exec jekyll build --destination "$PUB"

# 2) Ensure CNAME file is always presente
echo "criticalpath.dev" > "$PUB/CNAME"

# 3) Ensure GitHub doesn't try to run Jekyll on the public repo
touch "$PUB/.nojekyll"

# 4) Commit and push the published site
cd "$PUB"
git add .
git commit -m "Publish: $(date -u +'%Y-%m-%d %H:%M:%S UTC')" || echo "No changes to publish."
git push -u origin main

