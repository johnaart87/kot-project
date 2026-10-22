# Draws the Kot project icon (an isometric cube with cat ears) into PNG files.
param([string]$OutDir)
Add-Type -AssemblyName System.Drawing

function P([double]$x, [double]$y) { New-Object System.Drawing.PointF([single]$x, [single]$y) }

function Draw-Icon([int]$size, [string]$path, [bool]$maskable, [bool]$opaque) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $k = $size / 512.0
  $blue = [System.Drawing.Color]::FromArgb(255, 31, 111, 214)
  if ($maskable -or $opaque) {
    $g.Clear($blue)
  } else {
    $r = 112 * $k
    $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gp.AddArc(0, 0, 2 * $r, 2 * $r, 180, 90)
    $gp.AddArc($size - 2 * $r, 0, 2 * $r, 2 * $r, 270, 90)
    $gp.AddArc($size - 2 * $r, $size - 2 * $r, 2 * $r, 2 * $r, 0, 90)
    $gp.AddArc(0, $size - 2 * $r, 2 * $r, 2 * $r, 90, 90)
    $gp.CloseFigure()
    $g.FillPath((New-Object System.Drawing.SolidBrush $blue), $gp)
  }
  # artwork in a 512 grid, shrunk into the safe zone for maskable icons
  $s = if ($maskable) { 0.74 } else { 0.92 }
  $off = (512 - 512 * $s) / 2
  function Q([double]$x, [double]$y) { P (($off + $x * $s) * $k) (($off + $y * $s + 12 * $s) * $k) }
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $left  = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 214, 228, 251))
  $right = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 160, 192, 244))
  $pink  = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 246, 179, 198))
  $ink   = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 27, 37, 44))
  $edge  = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 20, 70, 150)), ([single](7 * $k * $s))
  $edge.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  # ears
  $earL = [System.Drawing.PointF[]]@((Q 158 214), (Q 160 112), (Q 228 176))
  $earR = [System.Drawing.PointF[]]@((Q 284 176), (Q 352 112), (Q 354 214))
  $g.FillPolygon($white, $earL); $g.DrawPolygon($edge, $earL)
  $g.FillPolygon($white, $earR); $g.DrawPolygon($edge, $earR)
  $g.FillPolygon($pink, [System.Drawing.PointF[]]@((Q 176 196), (Q 176 146), (Q 210 178)))
  $g.FillPolygon($pink, [System.Drawing.PointF[]]@((Q 302 178), (Q 336 146), (Q 336 196)))
  # cube faces
  $top = [System.Drawing.PointF[]]@((Q 256 150), (Q 382 222), (Q 256 294), (Q 130 222))
  $lf  = [System.Drawing.PointF[]]@((Q 130 222), (Q 256 294), (Q 256 438), (Q 130 366))
  $rf  = [System.Drawing.PointF[]]@((Q 256 294), (Q 382 222), (Q 382 366), (Q 256 438))
  $g.FillPolygon($left, $lf);  $g.DrawPolygon($edge, $lf)
  $g.FillPolygon($right, $rf); $g.DrawPolygon($edge, $rf)
  $g.FillPolygon($white, $top); $g.DrawPolygon($edge, $top)
  # eyes on the top face
  $er = 13 * $k * $s
  foreach ($e in @((Q 216 222), (Q 296 222))) { $g.FillEllipse($ink, $e.X - $er, $e.Y - $er * 0.8, 2 * $er, 1.6 * $er) }
  $g.Dispose()
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null
Draw-Icon 512 (Join-Path $OutDir 'icon-512.png') $false $false
Draw-Icon 192 (Join-Path $OutDir 'icon-192.png') $false $false
Draw-Icon 512 (Join-Path $OutDir 'maskable-512.png') $true $false
Draw-Icon 180 (Join-Path $OutDir 'apple-touch-icon.png') $false $true
Draw-Icon 32  (Join-Path $OutDir 'favicon-32.png') $false $false
Write-Host "Icons written to $OutDir"
