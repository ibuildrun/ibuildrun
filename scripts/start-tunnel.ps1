# Tuna HTTP Tunnel Startup Script (Windows PowerShell)
# Exposes local Next.js dev server on ibuildrun.ru domain

$ErrorActionPreference = "Stop"

# Load environment variables from .env.local
if (Test-Path .env.local) {
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
}

# Check required environment variables
if (-not $env:TUNA_TOKEN) {
    Write-Error "Error: TUNA_TOKEN not set in .env.local"
    exit 1
}

if (-not $env:TUNA_DOMAIN) {
    Write-Error "Error: TUNA_DOMAIN not set in .env.local"
    exit 1
}

# Check if tuna is installed
$tunaPath = "$env:USERPROFILE\.tuna\bin\tuna.exe"
if (-not (Test-Path $tunaPath)) {
    Write-Host "Tuna CLI not found. Please install from https://tuna.am"
    Write-Host "Or run: irm https://get.tuna.am/install.ps1 | iex"
    exit 1
}

Write-Host "Starting Tuna HTTP tunnel..."
Write-Host "Local port: 3000"
Write-Host "Public domain: $env:TUNA_DOMAIN"
Write-Host ""

# Start the tunnel
& $tunaPath http 3000 --token="$env:TUNA_TOKEN" --domain="$env:TUNA_DOMAIN"
