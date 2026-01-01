# Setup SSH Key on reg.ru hosting
# Run this script manually to add the SSH key to the server

$SERVER = "server297.hosting.reg.ru"
$USER = "u3370847"
$PASSWORD = "RIU96ZH8IxsmXvO5"

# Public key to add
$PUBLIC_KEY = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFjLBu6VlC8NbZ07WTS6HXIwMkaEKwcU58X5YnTDJU/J github-actions-deploy"

Write-Host "=== SSH Key Setup for reg.ru Hosting ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server: $SERVER"
Write-Host "User: $USER"
Write-Host ""
Write-Host "Please run the following commands manually:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Connect to server:" -ForegroundColor Green
Write-Host "   ssh $USER@$SERVER"
Write-Host "   (Enter password: $PASSWORD)"
Write-Host ""
Write-Host "2. Once connected, run these commands:" -ForegroundColor Green
Write-Host @"

# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add public key
echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Verify
cat ~/.ssh/authorized_keys

# Exit
exit

"@

Write-Host ""
Write-Host "3. Test key-based login:" -ForegroundColor Green
Write-Host "   ssh -i deploy_key $USER@$SERVER"
Write-Host ""
Write-Host "If it connects without password, the setup is complete!" -ForegroundColor Cyan
