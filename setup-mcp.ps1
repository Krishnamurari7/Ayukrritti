# PowerShell script to set up Supabase MCP configuration for Cursor
# Run this script in PowerShell: .\setup-mcp.ps1

$mcpConfigPath = "$env:APPDATA\Cursor\User\globalStorage\mcp.json"
$mcpConfigDir = Split-Path -Parent $mcpConfigPath

# Create directory if it doesn't exist
if (-not (Test-Path $mcpConfigDir)) {
    New-Item -ItemType Directory -Path $mcpConfigDir -Force | Out-Null
    Write-Host "Created directory: $mcpConfigDir" -ForegroundColor Green
}

# MCP configuration
$mcpConfig = @{
    mcpServers = @{
        supabase = @{
            url = "https://mcp.supabase.com/mcp"
        }
    }
} | ConvertTo-Json -Depth 10

# Check if mcp.json already exists
if (Test-Path $mcpConfigPath) {
    Write-Host "Found existing MCP configuration at: $mcpConfigPath" -ForegroundColor Yellow
    $existingConfig = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
    
    # Check if supabase server already exists
    if ($existingConfig.mcpServers.PSObject.Properties.Name -contains "supabase") {
        Write-Host "Supabase MCP server already configured!" -ForegroundColor Yellow
        Write-Host "Current configuration:" -ForegroundColor Cyan
        Write-Host ($existingConfig | ConvertTo-Json -Depth 10)
        $overwrite = Read-Host "Do you want to update it? (y/n)"
        if ($overwrite -ne "y") {
            Write-Host "Configuration unchanged." -ForegroundColor Green
            exit
        }
    }
    
    # Merge with existing configuration
    $existingConfig.mcpServers | Add-Member -MemberType NoteProperty -Name "supabase" -Value @{ url = "https://mcp.supabase.com/mcp" } -Force
    $mcpConfig = $existingConfig | ConvertTo-Json -Depth 10
}

# Write configuration
$mcpConfig | Set-Content -Path $mcpConfigPath -Encoding UTF8

Write-Host "`n✅ Supabase MCP configuration has been added!" -ForegroundColor Green
Write-Host "`nConfiguration saved to: $mcpConfigPath" -ForegroundColor Cyan
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Restart Cursor completely" -ForegroundColor White
Write-Host "2. You'll be prompted to authenticate with your Supabase account" -ForegroundColor White
Write-Host "3. Grant organization access when prompted" -ForegroundColor White
Write-Host "4. After authentication, you can query your database!" -ForegroundColor White
Write-Host "`nTry asking: 'List my Supabase tables' or 'Show me my database schema'" -ForegroundColor Cyan
