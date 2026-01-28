# Fazer Installation Script (Windows)
# Adds the current directory to the User PATH environment variable

$installDir = $PSScriptRoot
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($userPath -notlike "*$installDir*") {
    Write-Host "Adding Fazer to User PATH..." -ForegroundColor Cyan
    [Environment]::SetEnvironmentVariable("Path", "$userPath;$installDir", "User")
    Write-Host "Success! Please restart your terminal." -ForegroundColor Green
} else {
    Write-Host "Fazer is already in your PATH." -ForegroundColor Yellow
}

# Create file association (Optional, requires Admin usually, so we skip or just try)
Write-Host "Installation Complete. You can now run 'fazer' from anywhere." -ForegroundColor Green
