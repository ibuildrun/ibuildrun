#!/bin/bash
# Tuna HTTP Tunnel Startup Script
# Exposes local Next.js dev server on ibuildrun.ru domain

set -e

# Load environment variables from .env.local
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Check required environment variables
if [ -z "$TUNA_TOKEN" ]; then
  echo "Error: TUNA_TOKEN not set in .env.local"
  exit 1
fi

if [ -z "$TUNA_DOMAIN" ]; then
  echo "Error: TUNA_DOMAIN not set in .env.local"
  exit 1
fi

# Check if tuna is installed
if ! command -v tuna &> /dev/null; then
  echo "Tuna CLI not found. Installing..."
  curl -fsSL https://get.tuna.am/install.sh | sh
  export PATH="$HOME/.tuna/bin:$PATH"
fi

echo "Starting Tuna HTTP tunnel..."
echo "Local port: 3000"
echo "Public domain: $TUNA_DOMAIN"
echo ""

# Start the tunnel
tuna http 3000 --token="$TUNA_TOKEN" --domain="$TUNA_DOMAIN"
