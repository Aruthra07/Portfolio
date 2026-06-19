cd dist
git reset

$files = Get-ChildItem -Path "poftfolio images" -File
foreach ($file in $files) {
    $filePath = "poftfolio images/$($file.Name)"
    Write-Host "Adding $filePath"
    git add $filePath
    git commit -m "Add $($file.Name)"
    git push origin gh-pages
}
