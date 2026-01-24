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

## Base de Données (db)

### `db(path)`
Crée ou charge une base de données JSON persistante.
```fazer
store := db("data.json")
store.set("key", "value")
val := store.get("key")
data := store.all()
```

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

