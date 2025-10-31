#!/usr/bin/env bash
set -euo pipefail

# ----- config -----
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUB="/ssd1/workspace/criticalpath.dev/hrvatch.github.io"
DOMAIN="criticalpath.dev"

die() { echo "ERROR: $*" >&2; exit 1; }
have() { command -v "$1" >/dev/null 2>&1; }

# ----- preflight -----
[ -d "$ROOT/.git" ] || die "Run from the source repo (no .git here)."
[ -d "$PUB/.git" ]  || die "Publish repo not found at $PUB. Clone hrvatch.github.io there first."

have ruby   || die "ruby not found"
have bundle || die "bundle not found (gem install bundler)"
have git    || die "git not found"

# keep generated files out of source history
if [ -d "$ROOT/_site" ]; then
  die "_site/ exists in source. Add it to .gitignore and delete it before deploying."
fi

echo "==> Installing gems…"
cd "$ROOT"
bundle install

echo "==> Cleaning publish directory (but keeping its .git)..."
find "$PUB" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +

echo "==> Building site (production) into publish repo…"
JEKYLL_ENV=production bundle exec jekyll build --destination "$PUB" --trace

echo "==> Writing CNAME and .nojekyll…"
echo "$DOMAIN" > "$PUB/CNAME"
: > "$PUB/.nojekyll"

echo "==> Preparing commit in publish repo…"
cd "$PUB"

# ensure we’re on main; create if needed
if ! git rev-parse --verify main >/dev/null 2>&1; then
  git checkout -B main
else
  # if detached or on another branch, switch to main
  if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
    git checkout main
  fi
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to publish."
else
  git commit -m "Publish: $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
  # set upstream if first push
  if ! git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
    git push -u origin main
  else
    git push
  fi
fi

echo "Deploy complete. Visit https://$DOMAIN"
