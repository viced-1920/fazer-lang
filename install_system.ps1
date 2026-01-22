$path = $PSScriptRoot
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$pathParts = $userPath -split ";"

if ($pathParts -notcontains $path) {
    # Nettoyage de l'ancienne entrée erronée ending with \bin if present
    $newPathParts = $pathParts | Where-Object { $_ -ne "$path\bin" }
    
    $newPathParts += $path
    $newUserPath = $newPathParts -join ";"
    
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
    Write-Host "Succès : Fazer a été ajouté à votre PATH."
    Write-Host "Veuillez REDÉMARRER votre terminal (fermer et rouvrir) pour utiliser la commande 'fazer' partout."
} else {
    Write-Host "Fazer est déjà correctement configuré dans votre PATH."
}
