#!/bin/bash
# ==============================================================================
# EquityLens - Midnight Cron Setup Script for macOS
# ==============================================================================

PROJECT_DIR="/Users/temp/Documents/Screener software "
PYTHON_BIN="/usr/bin/python3"
SCRIPT_PATH="$PROJECT_DIR/updater.py"
LOG_PATH="$PROJECT_DIR/updater.log"

# Check if Python script exists
if [ ! -f "$SCRIPT_PATH" ]; then
  # Fallback check without trailing space
  PROJECT_DIR="/Users/temp/Documents/Screener software"
  SCRIPT_PATH="$PROJECT_DIR/updater.py"
  LOG_PATH="$PROJECT_DIR/updater.log"
fi

CRON_JOB="0 0 * * * $PYTHON_BIN \"$SCRIPT_PATH\" >> \"$LOG_PATH\" 2>&1"

# Check if job is already present
(crontab -l 2>/dev/null | grep -F "$SCRIPT_PATH") >/dev/null 2>&1

if [ $? -eq 0 ]; then
  echo "[!] Midnight updater job is already scheduled in crontab."
else
  # Add new cron job
  (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
  echo "[✓] Successfully registered midnight auto-update cron job!"
  echo "Schedule: Every midnight (00:00 AM)"
  echo "Command: $CRON_JOB"
fi

echo ""
echo "Current crontab entries:"
crontab -l

