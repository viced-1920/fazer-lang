# Guide de Démarrage Fazer

Bienvenue dans Fazer, le langage de script puissant et moderne pour Windows.

## Installation

1. Téléchargez la dernière version.
2. Lancez `install_system.ps1` pour configurer le PATH et les associations de fichiers.
3. Ouvrez un terminal et tapez `fazer` pour lancer le REPL.

## Votre premier script

Créez un fichier `hello.fz` :

```fazer
"Bonjour Fazer !" ->> println
```

Exécutez-le :
```bash
fazer run hello.fz
```

Ou simplement (si installé) :
```bash
fazer hello.fz
```

## Concepts de Base

### Variables et Fonctions

```fazer
# Variable
nom := "Monde"

# Fonction
fn saluer(n) ->
  "Bonjour " + n
end

saluer(nom) ->> println
```

### Pipe (`->>`)

L'opérateur pipe passe le résultat de gauche comme premier argument à la fonction de droite.

```fazer
"  texte sale  " ->> str_trim ->> str_upper ->> println
# Affiche : "TEXTE SALE"
```

## Bibliothèque Standard (Nouveau !)

Fazer dispose maintenant d'une bibliothèque standard riche pour les tâches réelles.

### 1. Système de Fichiers
```fazer
# Lire
contenu := fs_read("config.txt")

# Écrire
fs_write("log.txt", "Succès")
```

### 2. Modules (`import`)
Organisez votre code en plusieurs fichiers.

**math.fz** :
```fazer
add := (a, b) => a + b
PI := 3.14159
```

**main.fz** :
```fazer
m := import("math.fz")
m.add(10, 5) ->> println
m.PI ->> println
```

### 3. Base de Données Native (`db`)
Persistance des données JSON simple et efficace.

```fazer
# Initialiser (charge ou crée le fichier)
store := db("data.json")

# Sauvegarder une valeur
store.set("score", 100)
store.set("user", "viced")

# Lire une valeur
store.get("score") ->> println

# Récupérer tout
all := store.all()
```

### 4. Automation Système
Interagissez avec Windows.

```fazer
# Presse-papier (Copier)
clipboard_set("Copié depuis Fazer !")

# Notifications
notify("Titre", "Ceci est une notification Windows native")

# Exécution de commandes
ip := exec("ipconfig")
```

### 5. GUI Native (Vrai Native)
Créez des applications Windows natives (WinForms) directement en Fazer.

```fazer
# 1. Définir l'interface
window("Mon Application", 400, 300)
label("lbl_msg", "Bienvenue !", 20, 20, 360, 30)
button("btn_ok", "Cliquez-moi", 20, 60, 150, 40)
entry("txt_nom", "Votre nom", 20, 120, 360, 30)

# 2. Gestionnaire d'événements
fn handler(ev) ->
  id = ev["id"]
  
  if id == "btn_ok"
    msgbox("Bouton cliqué !")
    set_text("lbl_msg", "Merci !")
  end
  
  if id == "txt_nom"
    # ev["value"] contient le texte tapé
    print("Nom changé: " + ev["value"])
  end
end

# 3. Lancer l'interface
gui(handler)
```

### 6. Serveur Web
Créez des API ou des sites web.

```fazer
fn handler(req) ->
  "Vous avez demandé : " + req.url
end

server(8080, handler)
```
