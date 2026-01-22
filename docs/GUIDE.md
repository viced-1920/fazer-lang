# Le Guide Ultime de Fazer (A-Z)

Bienvenue dans le guide complet du langage **Fazer**. Ce document est conçu pour vous apprendre tout ce qu'il y a à savoir sur Fazer, de l'installation à la création d'applications graphiques natives.

---

## 1. Introduction

Fazer est un langage de script moderne, interprété et "batteries included". Il est conçu pour :
*   L'automatisation système (remplaçant PowerShell/Batch pour beaucoup de tâches).
*   La création rapide d'interfaces graphiques (GUI) natives Windows.
*   Le scripting réseau (serveurs HTTP, bots Discord).
*   La simplicité grâce à une syntaxe épurée et l'opérateur "Pipe".

### Pourquoi Fazer ?
*   **Simple** : Pas de classes, pas de `this`, pas de boilerplate.
*   **Puissant** : Bibliothèque standard riche (FS, Crypto, Net, GUI).
*   **Portable** : Compilez vos scripts en exécutables `.exe` autonomes.

---

## 2. Installation

### Prérequis
*   Node.js (v14+) installé sur votre machine.

### Installation Rapide
1.  Clonez ou téléchargez le dossier `fazer-lang`.
2.  Dans le dossier, double-cliquez sur **`install_system.ps1`**.
    *   Cela ajoute `fazer` à votre PATH.
    *   Cela associe les fichiers `.fz` à l'interpréteur.

### Vérification
Ouvrez un terminal (CMD ou PowerShell) et tapez :
```bash
fazer --version
```

---

## 3. Premiers Pas

Créez un fichier `hello.fz` avec votre éditeur préféré (ou Fazer Studio).

```fazer
# Mon premier script
print("Bonjour le Monde !")
```

Lancez-le via le terminal :
```bash
fazer hello.fz
```

---

## 4. Syntaxe et Concepts de Base

### Commentaires
Utilisez `#` ou `//` pour commenter votre code.

```fazer
# Ceci est un commentaire
// Ceci aussi
```

### Variables
Fazer utilise `:=` pour assigner des variables.
*   Par défaut, les variables sont **constantes** (immutables).
*   Utilisez `mut` pour créer une variable modifiable.

```fazer
# Constante (ne peut pas changer)
nom := "Fazer"

# Variable modifiable
mut compteur := 0
compteur := compteur + 1
```

### Types de Données
*   **Nombre** : `10`, `3.14` (Int et Float sont gérés automatiquement)
*   **Chaîne** : `"Texte"`
*   **Booléen** : `true`, `false`
*   **Null** : `null`
*   **Liste** : `[1, 2, "trois"]`
*   **Map (Objet)** : `{ "clé": "valeur", "âge": 20 }`

### L'Opérateur Pipe (`->>`)
C'est la force de Fazer. Il permet de passer le résultat d'une expression à la fonction suivante. Cela rend le code lisible de gauche à droite.

```fazer
# Sans pipe
println(str_upper("bonjour"))

# Avec pipe
"bonjour" ->> str_upper ->> println
```

---

## 5. Structures de Contrôle

### Conditionnel : Le bloc `case`
Fazer n'a pas de `if/else` classique. Tout se fait avec `case`, qui est plus puissant.

**Forme 1 : Comparaison de valeur**
```fazer
valeur := 10

case valeur
  > 10 -> print("Grand") end
  == 10 -> print("Égal") end
  else -> print("Petit") end
end
```

**Forme 2 : Conditions multiples (comme if/else if)**
```fazer
nom := "Admin"
age := 25

case
  nom == "Admin" -> print("Bonjour Chef") end
  age >= 18 -> print("Majeur") end
  else -> print("Accès refusé") end
end
```

### Boucles
Fazer privilégie l'approche fonctionnelle ou les fonctions natives (`map`, `foreach` à venir). Pour l'instant, pour boucler, on utilise souvent la **récursion** ou des fonctions intégrées comme `gui` (boucle d'événements).

*Note : Une boucle `while` est prévue dans les futures versions.*

---

## 6. Fonctions

Définissez une fonction avec `fn`.

```fazer
fn additionner(a, b) ->
  return a + b
end

res := additionner(5, 10)
print(res)
```

Les fonctions retournent automatiquement la dernière valeur si `return` n'est pas utilisé, mais `return` est conseillé pour la clarté.

---

## 7. Bibliothèque Standard (Stdlib)

Fazer est livré avec tout ce qu'il faut. Pas besoin d'installer de modules externes pour les tâches courantes.

### Système de Fichiers (File System)
```fazer
# Lire un fichier
contenu := readText("data.txt")

# Écrire dans un fichier
writeText("log.txt", "Opération réussie")

# Vérifier l'existence
if exists("config.json") -> ... end

# Lister les fichiers
fichiers := ls(".")
```

### Système et Exécution
```fazer
# Exécuter une commande shell
res := exec("ipconfig")

# Pause
sleep(1000) # 1 seconde

# Presse-papier
clipboard_set("Mon texte")
presse_papier := clipboard_get()
```

### Réseau (Network)
```fazer
# Requête HTTP GET
res := fetch("https://api.ipify.org")
print("Mon IP est : " + res.body)

# Serveur Web Simple
fn handler(req) ->
  return "<h1>Site Fazer</h1>"
end
server(8080, handler)
```

### Utilitaires
*   `json(obj)` : Convertit en texte JSON.
*   `parseJson(str)` : Convertit JSON en objet.
*   `nowMs()` : Temps actuel en millisecondes.
*   `random()` : Nombre aléatoire entre 0 et 1.

---

## 8. Interface Graphique Native (GUI)

Fazer permet de créer des fenêtres Windows natives (pas du web/electron) très légères.

### Exemple Complet GUI

```fazer
# Définir la fenêtre
window("Mon App Fazer", 400, 300, "icon.ico")

# Ajouter des widgets
label("lbl_info", "Entrez votre nom :", 20, 20, 300, 30)
entry("txt_nom", "", 20, 60, 300, 30)
button("btn_ok", "Valider", 20, 110, 100, 40)

# État de l'application
state := { "nom": "" }

# Gestionnaire d'événements
fn handler(ev) ->
  id := ev["id"]
  
  case id
    == "txt_nom" ->
      # Mettre à jour l'état quand on tape
      set(state, "nom", ev["value"])
    end
    
    == "btn_ok" ->
      nom := get(state, "nom")
      msgbox("Bonjour " + nom + " !")
    end
  end
end

# Lancer l'application
gui(handler)
```

---

## 9. Créer un Exécutable (.exe)

Vous pouvez distribuer votre application sans que les utilisateurs aient besoin d'installer Fazer.

Utilisez la commande `build` :

```bash
fazer build mon_app.fz
```

Ou avec une icône :
```bash
fazer build mon_app.fz --icon app.ico
```

Cela crée un dossier `dist/mon_app/` contenant `mon_app.exe`.

---

## 10. Bonnes Pratiques

1.  **Organisation** : Utilisez `import("module.fz")` pour découper votre code.
2.  **Sécurité** : Utilisez les fonctions `encText` / `decText` pour chiffrer vos données sensibles.
3.  **Nommage** : Utilisez le `snake_case` pour les variables et fonctions (`ma_variable`, `calculer_total`).

---

*Fazer - Simple, Rapide, Puissant.*
