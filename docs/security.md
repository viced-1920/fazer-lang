# Module de Sécurité (security)

Le module `security` fournit des outils avancés pour la protection des données, l'anti-forensique et la surveillance d'intrusions.

## Suppression Sécurisée (Shredding)

Supprime définitivement un fichier en écrasant son contenu plusieurs fois avant la suppression, rendant la récupération quasi-impossible.

### `security.shred(path, [passes])`
*   `path` : Chemin du fichier à détruire.
*   `passes` : (Optionnel) Nombre de passes d'écrasement (défaut: 3).

```fazer
# Destruction standard (3 passes)
security.shred("secrets.txt")

# Destruction extrême (10 passes)
security.shred("top_secret.db", 10)
```

## Chiffrement de Fichiers

Chiffre et déchiffre des fichiers entiers en utilisant l'algorithme AES-256-CBC.

### `security.encrypt_file(path, key)`
Chiffre le fichier spécifié et crée un nouveau fichier avec l'extension `.enc`.
*   Le fichier original n'est PAS supprimé automatiquement (utilisez `shred` si nécessaire).
*   Utilise un sel aléatoire et un IV aléatoire (stocké dans le fichier de sortie).

```fazer
key := "MonMotDePasseSuperSecurise"
if security.encrypt_file("data.json", key) ->
    println("Fichier chiffré avec succès !")
    security.shred("data.json") # Supprime l'original
end
```

### `security.decrypt_file(path, key)`
Déchiffre un fichier `.enc`. Si le fichier n'a pas l'extension `.enc`, ajoute `.dec` à la sortie.

```fazer
security.decrypt_file("data.json.enc", "MonMotDePasseSuperSecurise")
```

## Intégrité des Fichiers

### `security.hash_file(path)`
Calcule l'empreinte SHA-256 d'un fichier pour vérifier s'il a été modifié.

```fazer
hash := security.hash_file("system.dll")
if hash != KNOWN_GOOD_HASH ->
    println("ALERTE : Fichier système modifié !")
end
```

## Protection des Dossiers (Windows)

### `security.lock_folder(path)`
Cache et verrouille un dossier en le marquant comme fichier système caché (Super Hidden).
*   Le dossier ne sera pas visible même si "Afficher les fichiers cachés" est activé dans l'explorateur (sauf si "Masquer les fichiers protégés du système" est décoché).

```fazer
security.lock_folder("C:\\Users\\Moi\\CoffreFort")
```

### `security.unlock_folder(path)`
Restaure la visibilité normale d'un dossier.

```fazer
security.unlock_folder("C:\\Users\\Moi\\CoffreFort")
```

## Surveillance (Sentry Mode)

### `security.monitor(path, callback)`
Surveille un fichier ou un dossier pour détecter tout changement (accès, modification, renommage).

```fazer
fn alerte(type, nom) ->
    println("INTRUSION DÉTECTÉE : " + type + " sur " + nom)
    # Action défensive : supprimer les clés de chiffrement, envoyer une alerte, etc.
end

security.monitor("C:\\SensitiveData", alerte)

# Garder le script en vie
while true -> end
```

## Stéganographie (Nouveau)

Dissimulez des données sensibles à l'intérieur d'images anodines. Cette technique permet de contourner la censure ou de stocker des informations de manière invisible.

### `security.steg_hide(img_path, file_path, out_path)`
Fusionne un fichier secret dans une image (JPG, PNG, etc.). L'image résultante reste lisible par les visionneuses d'images.
*   `img_path` : Image de couverture.
*   `file_path` : Fichier secret à cacher.
*   `out_path` : Nom de l'image de sortie (qui contiendra le secret).

```fazer
security.steg_hide("chat.jpg", "codes_nucleaires.txt", "chat_safe.jpg")
```

### `security.steg_reveal(img_path, out_path)`
Extrait un fichier secret caché dans une image.
```fazer
security.steg_reveal("chat_safe.jpg", "codes_recuperes.txt")
```

## Pare-feu & Réseau (Windows Admin)

Contrôle direct du pare-feu Windows pour bloquer les menaces.

### `security.firewall_block(target)`
Bloque tout le trafic entrant venant d'une IP ou sur un port spécifique.
*   `target` : Chaîne (IP) ou Entier (Port).

```fazer
# Bloquer une IP malveillante
security.firewall_block("192.168.1.66")

# Bloquer le port Telnet
security.firewall_block(23)
```
