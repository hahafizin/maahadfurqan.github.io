Get-ChildItem -Recurse -Filter *.webp | ForEach-Object {
    mogrify -quality 30 $_.FullName
}
