# Le Guide Ultime de Fazer (A-Z) - Édition 2.5

Bienvenue dans l'univers de **Fazer**. Ce guide a été conçu pour vous accompagner de vos premières lignes de code jusqu'à la maîtrise des fonctionnalités les plus avancées (Pentest, GUI, Réseau).

Que vous soyez un débutant complet ou un développeur expérimenté, ce manuel est votre référence.

---

## 📚 Table des Matières

1.  [Module 1 : Premiers Pas & Installation](#module-1--premiers-pas--installation)
2.  [Module 2 : Les Bases du Langage](#module-2--les-bases-du-langage)
3.  [Module 3 : Contrôle du Flux (Logique)](#module-3--contrôle-du-flux-logique)
4.  [Module 4 : Fonctions & Organisation](#module-4--fonctions--organisation)
5.  [Module 5 : Manipulation de Fichiers & Système](#module-5--manipulation-de-fichiers--système)
6.  [Module 6 : Interfaces Graphiques (GUI)](#module-6--interfaces-graphiques-gui)
7.  [Module 7 : Réseau & Web](#module-7--réseau--web)
8.  [Module 8 : Cybersécurité & Red Team](#module-8--cybersécurité--red-team)
9.  [Annexe : Compiler en .EXE](#annexe--compiler-en-exe)

---

## Module 1 : Premiers Pas & Installation

### C'est quoi Fazer ?
Fazer est un langage de programmation moderne, simple et puissant. Il est "batteries included", ce qui signifie qu'il contient déjà tout ce qu'il faut pour créer des applications graphiques, des outils réseaux, ou des scripts d'automatisation sans rien installer d'autre.

### Installation
1.  **Téléchargez** le dossier `fazer-lang`.
2.  **Exécutez** le script `install_system.ps1` (double-clic).
3.  C'est tout ! Ouvrez un terminal et tapez `fazer` pour vérifier.

### Votre Premier Script ("Hello World")
Créez un fichier nommé `hello.fz` :

```fazer
print("Bienvenue sur Fazer !")
```

Lancez-le :
```bash
fazer hello.fz
```

---

## Module 2 : Les Bases du Langage

### Variables
En Fazer, on utilise `:=` pour créer une variable.
*   Par défaut, une variable ne peut pas changer (elle est **constante**).
*   Si vous voulez la modifier, utilisez le mot-clé `mut`.

```fazer
# Constante (ne bougera pas)
nom := "Fazer"

# Variable (peut changer)
mut score := 0
score := score + 10
print(score) # Affiche 10
```

### Types de Données
Fazer gère les types automatiquement :
*   `"Texte"` (String)
*   `42` ou `3.14` (Number)
*   `true` / `false` (Boolean)
*   `[1, 2, 3]` (List / Tableau)
*   `{ "nom": "Jean", "age": 20 }` (Map / Objet)

### L'Opérateur Pipe (`->>`)
C'est la signature de Fazer. Il permet de passer une valeur à la fonction suivante, comme un tuyau.

```fazer
# Méthode classique
print(str_upper("bonjour"))

# Méthode Fazer (Pipe)
"bonjour" ->> str_upper ->> print
```
*Lecture : Prends "bonjour", mets-le en majuscules, puis affiche-le.*

---

## Module 3 : Contrôle du Flux (Logique)

### Les Conditions (`if`)
Fazer utilise des flèches `->` pour délimiter les blocs de code, et `end` pour finir.

```fazer
age := 18

if age >= 18 ->
    print("Majeur")
end
else ->
    print("Mineur")
end
```

### Les Boucles (`while`)
Pour répéter une action tant qu'une condition est vraie.

```fazer
mut i := 0

while i < 5 ->
    print("Compteur : " + i)
    i := i + 1
end
```

---

## Module 4 : Fonctions & Organisation

### Créer une Fonction
Une fonction est un bloc de code réutilisable.

```fazer
fn dire_bonjour(nom) ->
    msg := "Salut " + nom + " !"
    return msg
end

res := dire_bonjour("Alice")
print(res)
```

### Fonctions Anonymes (Lambdas)
Très utiles pour les événements (GUI, Serveurs).

```fazer
ma_fonction := fn(x) -> x * 2 end
print(ma_fonction(10)) # 20
```

---

## Module 5 : Manipulation de Fichiers & Système

Fazer brille pour l'automatisation système.

### Lire et Écrire
```fazer
# Écrire
fs_write("test.txt", "Contenu du fichier")

# Lire
contenu := fs_read("test.txt")
print(contenu)

# Vérifier existence
if fs_exists("test.txt") -> print("Fichier trouvé !") end
```

### Parcourir des Dossiers (Nouveau 2.5)
```fazer
fichiers := walk_dir(".") # Liste récursivement tout le dossier actuel
print("Fichiers trouvés : " + fichiers.length)
```

### Exécuter des Commandes Système
```fazer
# Lance une commande et récupère la sortie
ip := exec("ipconfig")
print(ip)
```

---

## Module 6 : Interfaces Graphiques (GUI)

Créez des fenêtres Windows natives en quelques lignes.

```fazer
config := {
  title: "Ma App Fazer",
  w: 400, h: 300,
  icon: "app.ico" # Support des icônes !
}

# Définition des widgets
widgets := [
  { id: "lbl", type: "label", text: "Bienvenue !", x: 10, y: 10, w: 200, h: 30 },
  { id: "btn", type: "button", text: "Cliquez-moi", x: 10, y: 50, w: 120, h: 40 }
]

# Gestionnaire d'événements
fn handler(id, event, data) ->
  if id == "btn" ->
    notify("Succès", "Vous avez cliqué !")
  end
end

# Lancer la fenêtre
window(config, widgets, handler)
```

---

## Module 7 : Réseau & Web

### Serveur Web Express
Créez un serveur HTTP en une ligne.

```fazer
fn mon_site(req) ->
    return "<h1>Site propulsé par Fazer</h1>"
end

# Écoute sur le port 8080
http_server(8080, mon_site)
```

### Client HTTP
```fazer
page := fetch("https://google.com")
print(page.status)
```

---

## Module 8 : Cybersécurité & Red Team

**Nouveauté 2.5** : Fazer intègre des outils natifs pour le Pentest et la simulation d'attaques (autorisées).

> ⚠️ **AVERTISSEMENT** : Usage éducatif et autorisé uniquement.

### Fonctionnalités Clés
*   **Chiffrement** : `encrypt_file("secret.txt", "clé")` (AES-256)
*   **Registre Windows** : `registry_set`, `registry_get` (Persistance)
*   **Reverse Shell** : `tcp_connect` (Client TCP brut)
*   **Fond d'écran** : `set_wallpaper("hacked.jpg")`

*Pour un guide détaillé sur ces fonctions, consultez le fichier `PENTESTING.md`.*

---

## Annexe : Compiler en .EXE

Transformez n'importe quel script `.fz` en un exécutable Windows autonome `.exe` que vous pouvez partager.

```bash
fazer build mon_script.fz
```

L'exécutable sera généré dans le dossier `dist/`. Il contient tout le nécessaire pour fonctionner sans installer Fazer sur la machine cible.
