$path = $PSScriptRoot
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$path*") {
    $newUserPath = "$userPath;$path"
    [Environment]::SetEnvironmentVariable("Path", $newUserPath, "User")
    Write-Host "Succès : Fazer a été ajouté à votre PATH."
    Write-Host "Veuillez REDÉMARRER votre terminal (fermer et rouvrir) pour utiliser la commande 'fazer' partout."
} else {
    Write-Host "Fazer est déjà dans votre PATH."
}
