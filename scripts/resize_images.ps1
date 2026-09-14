# Resize JPEG images in assets/images to max width 1600px and save with quality 85
# Usage: powershell -ExecutionPolicy Bypass -File scripts\resize_images.ps1

$srcDir = "assets\images"
$destDir = "assets\images\resized"
if (-Not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }

Add-Type -AssemblyName System.Drawing

Get-ChildItem -Path $srcDir -Include *.jpg,*.jpeg,*.png -File | ForEach-Object {
    $file = $_.FullName
    $img = [System.Drawing.Image]::FromFile($file)
    $maxWidth = 1600
    if ($img.Width -le $maxWidth) {
        # copy as-is
        $target = Join-Path $destDir $_.Name
        Copy-Item -Path $file -Destination $target -Force
        $img.Dispose()
        Write-Host "Copied: $($_.Name) (no resize needed)"
        return
    }

    $ratio = $img.Height / $img.Width
    $newWidth = $maxWidth
    $newHeight = [int]([math]::Round($newWidth * $ratio))

    $thumb = New-Object System.Drawing.Bitmap $newWidth, $newHeight
    $g = [System.Drawing.Graphics]::FromImage($thumb)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.DrawImage($img, 0, 0, $newWidth, $newHeight)

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85)

    $target = Join-Path $destDir $_.BaseName + ".jpg"
    $thumb.Save($target, $encoder, $encParams)

    $g.Dispose()
    $thumb.Dispose()
    $img.Dispose()

    Write-Host "Resized: $($_.Name) -> $([System.IO.Path]::GetFileName($target)) ($newWidth x $newHeight)"
}
