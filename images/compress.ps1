# === convert-to-webp.ps1 ===
$sourceFolder = Get-Location
$outputFolder = Join-Path $sourceFolder "output-webp"

# Buat folder output
if (!(Test-Path $outputFolder)) {
    New-Item -ItemType Directory -Path $outputFolder
}

# Cari semua JPG, JPEG, PNG
$images = Get-ChildItem -Recurse -Include *.jpg, *.jpeg, *.png

foreach ($img in $images) {
    # Generate nama unik untuk output
    $timestamp = Get-Date -Format "yyyyMMddHHmmssfff"
    $outputName = "$timestamp.webp"  # Nama baru: timestamp.webp
    $outputPath = Join-Path $outputFolder $outputName

    Write-Host "Converting: $($img.FullName) → $outputPath"
    magick "$($img.FullName)" -quality 80 "$outputPath"
}

Write-Host "`n✅ Semua gambar dah siap convert ke $outputFolder"
