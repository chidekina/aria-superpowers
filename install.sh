#!/usr/bin/env bash
# ARIA-superpowers installer
# Usage:
#   ./install.sh              — install all skills
#   ./install.sh commit pdf   — install specific skills

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="${HOME}/.claude/skills"

mkdir -p "$SKILLS_DIR"

# Determine which skills to install
if [ $# -eq 0 ]; then
  TARGETS=($(ls "$SCRIPT_DIR/skills/"))
else
  TARGETS=("$@")
fi

installed=0
skipped=0

for skill in "${TARGETS[@]}"; do
  src="$SCRIPT_DIR/skills/$skill"

  if [ ! -d "$src" ]; then
    echo "⚠️  Skill '$skill' not found — skipping"
    continue
  fi

  dest="$SKILLS_DIR/$skill"

  if [ -d "$dest" ]; then
    read -r -p "⚠️  '$skill' already exists. Overwrite? [y/N] " answer
    if [[ ! "$answer" =~ ^[Yy]$ ]]; then
      echo "   Skipped $skill"
      ((skipped++)) || true
      continue
    fi
    rm -rf "$dest"
  fi

  cp -r "$src" "$dest"
  echo "✅  Installed $skill"
  ((installed++)) || true
done

echo ""
echo "Done. $installed installed, $skipped skipped."
echo "Restart Claude Code to activate new skills."
