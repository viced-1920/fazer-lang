# Bibliothèque Standard (Stdlib)

Fazer inclut une bibliothèque standard "batteries included" pour le développement d'applications robustes.

## Système de Fichiers (fs)

Manipulation de fichiers synchrones et performante.

### `fs_read(path)`
Lit le contenu d'un fichier en texte (UTF-8). Retourne `null` en cas d'erreur.
```fazer
content := fs_read("config.json")
```

### `fs_write(path, content)`
Écrit (écrase) du contenu dans un fichier. Retourne `true` si succès.
```fazer
fs_write("log.txt", "Initialisation...")
```

### `fs_append(path, content)`
Ajoute du contenu à la fin d'un fichier.
```fazer
fs_append("log.txt", "\nNouvelle entrée")
```

### `fs_exists(path)`
Vérifie si un fichier ou dossier existe.
```fazer
if fs_exists("data") -> ... end
```

## Manipulation de Données

### Entrée Utilisateur (Terminal)

*   `read_line(prompt)` : Lit une ligne tapée au clavier dans le terminal.
*   `menu(options)` : Affiche une liste numérotée et retourne le choix sélectionné.

```fazer
nom := read_line("Votre nom: ")
choix := menu(["Scanner", "Chiffrer", "Quitter"])
```

### JSON
*   `json_parse(str)` : Convertit une chaîne JSON en objet/liste.
*   `json_stringify(obj)` : Convertit un objet en chaîne JSON formatée.
    *   Alias : `json(obj)`

### Chaînes de Caractères (String)
*   `str_split(str, delimiter)` : Découpe une chaîne en liste.
*   `str_replace(str, old, new)` : Remplace toutes les occurrences.
*   `str_trim(str)` : Retire les espaces au début et à la fin.
*   `str_upper(str)` : Convertit en majuscules.
*   `str_lower(str)` : Convertit en minuscules.

### Mathématiques
*   `random()` : Retourne un nombre aléatoire entre 0.0 et 1.0.
*   `round(n)` : Arrondi à l'entier le plus proche.
*   `floor(n)` : Arrondi à l'entier inférieur.
*   `ceil(n)` : Arrondi à l'entier supérieur.
*   `int(n)` : Conversion en entier.
*   `float(n)` : Conversion en flottant.

### `net.tcp_client(host, port, onData)`
Crée un client TCP brut.
```fazer
net.tcp_client("127.0.0.1", 9000, fn(data, api) ->
    print("Reçu: " + data)
    api.write("Réponse")
    api.close()
end)
```

### `net.udp_socket(port, onMsg)`
Crée un socket UDP (Serveur si port > 0, Client si port = 0).
```fazer
# Serveur UDP
server := net.udp_socket(5140, fn(msg, info) ->
    print("De " + info.address + ": " + msg)
end)

# Client UDP
client := net.udp_socket(0, null)
client.send("Log message", "127.0.0.1", 5140)
```

## Base de Données (db)

Une base de données JSON NoSQL légère et intégrée.

### `db.open(path)`
Charge ou crée une base de données.
```fazer
db.open("users.json")
```

### Manipulation
*   `db.set(key, value)` : Enregistre une valeur.
*   `db.get(key)` : Récupère une valeur.
*   `db.delete(key)` : Supprime une clé.
*   `db.save()` : Sauvegarde les changements sur le disque.
*   `db.push(key, item)` : Ajoute un élément à une liste.
*   `db.keys()` : Liste toutes les clés.

## Planificateur (sched)

Pour l'automatisation et les tâches récurrentes.

### `sched.every(ms, fn)`

## Sécurité (security)

Module dédié à la protection des données, à l'anonymat et à l'anti-forensique.

### `security.shred(path, passes)`
Supprime définitivement un fichier en l'écrasant plusieurs fois avec des données aléatoires avant suppression.
*   `passes` (optionnel) : Nombre de passes (défaut : 3).
```fazer
security.shred("secret.txt", 7)
```

### `security.lock_folder(path)` / `security.unlock_folder(path)`
(Windows uniquement) Rend un dossier "Super-Caché" (Attributs Système + Caché + Lecture Seule).
Le dossier devient invisible dans l'explorateur par défaut.
```fazer
security.lock_folder("C:\\CoffreFort")
```

### `security.encrypt_file(path, password)` / `security.decrypt_file(path, password)`
Chiffre ou déchiffre un fichier en utilisant l'algorithme AES-256-CBC.
Le fichier original est remplacé par sa version `.enc` (ou restauré).
```fazer
security.encrypt_file("passwords.txt", "MonSuperMotDePasse")
```

### `security.monitor(path, callback)`
Surveille un dossier ou fichier en temps réel pour détecter les modifications (création, modification, suppression).
```fazer
security.monitor("C:\\Logs", fn(evt, file) ->
    print("Alerte: " + evt + " sur " + file)
end)
```

### `security.steg_hide(image_path, file_path, output_path)`
(Nouveau) Cache un fichier à l'intérieur d'une image (Stéganographie LSB).
```fazer
security.steg_hide("vacances.png", "secret.txt", "vacances_safe.png")
```

### `security.firewall_block(ip_or_port)`
(Nouveau) Ajoute une règle de pare-feu Windows pour bloquer une IP ou un Port (Nécessite Admin).
```fazer
security.firewall_block("192.168.1.50")
security.firewall_block(8080)
```

Exécute une fonction en boucle.
```fazer
id := sched.every(1000, fn() -> print("Tick") end)
```

### `sched.after(ms, fn)`
Exécute une fonction une fois après un délai.
```fazer
sched.after(5000, fn() -> print("Boom") end)
```

### `sched.cancel(id)`
Annule une tâche planifiée.

## Physique & Math (phys)

Helpers pour le développement de jeux.

*   `phys.dist(x1, y1, x2, y2)` : Distance entre deux points.
*   `phys.angle(x1, y1, x2, y2)` : Angle en radians.
*   `phys.clamp(val, min, max)` : Contraint une valeur.
*   `phys.lerp(a, b, t)` : Interpolation linéaire.
*   `phys.aabb(rect1, rect2)` : Collision AABB (x, y, w, h).

## Automation & Système

### Presse-papier
*   `clipboard_set(text)` : Copie du texte dans le presse-papier.
*   `clipboard_get()` : Récupère le texte du presse-papier.

### Notifications
*   `notify(title, msg)` : Affiche une notification système native.

### Exécution
*   `exec(cmd)` : Exécute une commande système et capture la sortie.
*   `sleep(ms)` : Pause l'exécution.
*   `import(path)` : Charge un module Fazer externe.

## Interface Graphique (GUI Native)

Créez des applications Windows Forms natives.

### Widgets
*   `window(title, width, height, icon_path)` : Définit la fenêtre principale. `icon_path` est optionnel (ex: `"app.ico"`).
*   `button(id, text, x, y, w, h)` : Ajoute un bouton.
*   `label(id, text, x, y, w, h)` : Ajoute une étiquette de texte.
*   `entry(id, text, x, y, w, h)` : Ajoute un champ de saisie texte.

### Interaction
*   `gui(handler)` : Lance la boucle d'événements. `handler` reçoit des événements `{id, type, value}`.
*   `set_text(id, text)` : Change le texte d'un widget (à utiliser dans le handler).
*   `msgbox(text)` : Affiche une boîte de dialogue modale.

## Réseau & Web

### `server(port, handler)`
Démarre un serveur HTTP.
```fazer
fn handler(req) ->
  return({ "body": "Hello World" })
end
server(8080, handler)
```

### `fetch(url, options)`
Effectue une requête HTTP asynchrone.
```fazer
res := fetch("https://api.example.com/data")
print(res.body)
```

### `download(url, path)`
Télécharge un fichier depuis une URL vers un chemin local.
```fazer
success := download("https://example.com/image.png", "img.png")
```

## Terminal Avancé (UI & FX)

Fonctionnalités pour créer des interfaces en ligne de commande (TUI) riches et animées.

### Couleurs & Styles (TrueColor)
*   `rgb(r, g, b, text)` : Texte en couleur TrueColor (16 millions de couleurs).
*   `bg_rgb(r, g, b, text)` : Arrière-plan en couleur TrueColor.
*   `gradient(text, r1, g1, b1, r2, g2, b2)` : Applique un dégradé linéaire sur le texte entre deux couleurs RGB.
*   `style(text, style_name)` : Styles de base ("bold", "dim", "red", "blue", etc.).

### Curseur & Affichage
*   `term_clear()` : Efface l'écran.
*   `term_pos(row, col)` : Déplace le curseur.
*   `term_hide()` / `cursor_hide()` : Masque le curseur.
*   `term_show()` / `cursor_show()` : Affiche le curseur.
*   `term_title(text)` : Change le titre de la fenêtre du terminal.
*   `cursor_save()` : Sauvegarde la position du curseur.
*   `cursor_restore()` : Restaure la position sauvegardée.

### Composants UI
*   `ui_bar(val, max, width, char)` : Génère une barre de progression.
    *   Exemple : `ui_bar(50, 100, 20)` -> `██████████          `
*   `box(title, line1, line2, ...)` : Affiche une boîte encadrée.

## Sécurité & Protection (security)

Module dédié à la protection des données, destruction sécurisée et surveillance.
Voir la documentation complète : [security.md](security.md)

*   `security.shred(path)` : Suppression sécurisée (multi-pass overwrite).
*   `security.encrypt_file(path, key)` : Chiffrement AES-256 de fichiers.
*   `security.lock_folder(path)` : Verrouillage/Masquage de dossier (Windows).
*   `security.monitor(path, callback)` : Détection d'intrusions sur fichiers/dossiers.
