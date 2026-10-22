# Builds the installable Kot project site into the "site" folder (upload its contents to GitHub Pages).
# Run: powershell -ExecutionPolicy Bypass -File build.ps1
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$site = Join-Path $root 'site'
New-Item -ItemType Directory -Force -Path $site | Out-Null

& (Join-Path $root 'tools\make-icons.ps1') -OutDir (Join-Path $site 'icons')

$utf8 = New-Object System.Text.UTF8Encoding $false
$body = [System.IO.File]::ReadAllText((Join-Path $root 'index.html'), [System.Text.Encoding]::UTF8)
$head = @'
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1f6fd6">
<meta name="description" content="Kot project: черчение стен, дверей и окон, многослойные стены, размеры, 3D-модель и аксонометрия.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Kot project">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
</head>
<body>

'@
[System.IO.File]::WriteAllText((Join-Path $site 'index.html'), $head + $body + "`n</body>`n</html>`n", $utf8)
Copy-Item -Force (Join-Path $root 'manifest.webmanifest') $site
$sw = [System.IO.File]::ReadAllText((Join-Path $root 'sw.js'), [System.Text.Encoding]::UTF8)
$sw = $sw -replace "const VERSION = '[^']*';", ("const VERSION = 'kot-" + (Get-Date -Format 'yyyyMMdd-HHmm') + "';")
[System.IO.File]::WriteAllText((Join-Path $site 'sw.js'), $sw, $utf8)
[System.IO.File]::WriteAllText((Join-Path $site '.nojekyll'), '', $utf8)
Write-Host "Built: $site"
Get-ChildItem -Recurse $site | Select-Object FullName, Length | Format-Table -AutoSize
