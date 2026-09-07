$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$LogDir = Join-Path $Root '.runtime\logs'
New-Item -ItemType Directory -Force -Path $LogDir | Out-Null
if (-not (Get-Command node -ErrorAction SilentlyContinue) -and (Get-Command winget -ErrorAction SilentlyContinue)) { winget install --id OpenJS.NodeJS.LTS -e --silent --accept-package-agreements --accept-source-agreements }
$Python = Get-Command python -ErrorAction SilentlyContinue
if (-not $Python -and (Get-Command winget -ErrorAction SilentlyContinue)) { winget install --id Python.Python.3.13 -e --silent --accept-package-agreements --accept-source-agreements }
$Python = Get-Command python -ErrorAction SilentlyContinue
if (-not $Python) { $Python = Get-Command py -ErrorAction Stop }
& { & $Python.Source (Join-Path $Root 'core\boot.py') 2>&1 | Tee-Object -FilePath (Join-Path $LogDir 'install.log') -Append }
if ($LASTEXITCODE -ne 0) { throw 'RootMC Net bootstrap failed' }
