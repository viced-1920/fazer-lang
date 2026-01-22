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

### Boucles (`while`)

La boucle `while` permet de répéter un bloc de code tant qu'une condition est vraie.

```fazer
mut i := 0

while i < 5 ->
    print("Compteur : " + i)
    i := i + 1
end
```

### Gestion d'Erreurs (`try/catch`)

Pour rendre vos programmes solides, interceptez les erreurs potentielles.

```fazer
try ->
    # Code risqué
    f := readText("fichier_inexistant.txt")
catch e ->
    # Gestion de l'erreur
    print("Oups : " + e)
end
```

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

### Crypto & Encoding

Fazer intègre des outils pour chiffrer et encoder vos données.

```fazer
# Base64
b64 := base64_encode("Hello World")
txt := base64_decode(b64)

# AES-256 (Chiffrement symétrique)
key := "mon_mot_de_passe_super_secret"
crypted := aes_encrypt("Donnée Confidentielle", key)
print("Encrypted: " + crypted)

decrypted := aes_decrypt(crypted, key)
print("Decrypted: " + decrypted)
```

### Cybersécurité & Pentesting (Nouveau 2.5)

Fazer intègre désormais des outils puissants pour l'audit et la sécurité.

**Scan de Port**
```fazer
# Scanner un port spécifique
if scan_port("192.168.1.1", 80) ->
    print("Port 80 ouvert !")
end

# Scanner une plage
mut p := 20
while p < 100 ->
    if scan_port("google.com", p) ->
        print("Port ouvert : " + p)
    end
    p := p + 1
end
```

**DNS & Réseau**
```fazer
ip := dns_resolve("github.com")
print("IP GitHub : " + ip)

ips := dns_resolve_all("google.com")
print(ips)
```

**Hashing & Crypto**
```fazer
hash_md5 := md5("secret")
hash_sha1 := sha1("secret")
hash_256 := sha256("secret")
```

**Requêtes HTTP Avancées**
Pour tester des injections ou des headers spécifiques :
```fazer
res := http_req("http://target.com/login", {
    "method": "POST",
    "headers": { "User-Agent": "FazerBot/1.0", "Cookie": "admin=true" },
    "body": "user=admin&pass=' OR '1'='1"
})
print("Status: " + res.status)
print(res.body)
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

# Nouveaux Widgets (v2.6)
checkbox("chk_admin", "Mode Admin", 20, 100, 150, 30)
combo("cmb_role", "Utilisateur,Modérateur,Admin", 180, 100, 140, 30)
progress("prg_loading", 0, 20, 140, 300, 20)

button("btn_ok", "Valider", 20, 180, 100, 40)

# État de l'application
state := { "nom": "" }

# Gestionnaire d'événements
fn handler(ev) ->
  id := ev["id"]
  val := ev["value"]
  
  case id
    == "txt_nom" -> set(state, "nom", val) end
    == "chk_admin" -> print("Admin: " + val) end # True/False
    == "btn_ok" ->
      nom := get(state, "nom")
      set_text("prg_loading", 100) # Remplir la barre
      msgbox("Bonjour " + nom)
    end
  end
end


# Lancer l'application
gui(handler)
```

---

## 9. Modules Avancés (Cybersécurité & OSINT)

Fazer intègre des outils puissants pour les experts en sécurité et l'OSINT.

### OSINT (Renseignement en Sources Ouvertes)

```fazer
# WHOIS
info := whois("google.com")
print(info)

# Géolocalisation IP
loc := geoip("8.8.8.8")
print("Pays : " + get(loc, "country"))
print("Ville : " + get(loc, "city"))

# Extraction HTML (Scraping léger)
html := fetch("https://example.com").body
titres := html_extract(html, "h1")
print(titres)
```

### Système Avancé (Windows/Linux)

Contrôlez le système en profondeur.

```fazer
# Lister les processus
procs := ps_list()
# procs est une liste d'objets : { "name": "chrome.exe", "pid": "1234", "mem": "50MB" }

# Tuer un processus
kill(1234)

# Capture d'écran (Spying/Monitoring)
screenshot("capture.png")
```

### Réseau & Pentest

```fazer
# Écouteur TCP (Reverse Shell receiver ou Honeypot)
fn on_data(data, id) ->
    print("[" + id + "] Reçu : " + data)
    return "Commande reçue\n"
end

srv := tcp_listen(4444, on_data)
# srv.close() pour arrêter

# Fuzzing Web (Découverte de fichiers cachés)
wordlist := ["admin", "login", "backup", ".env"]
res := fuzz_url("http://target.com", wordlist)
# res contient : [{ "path": "admin", "status": 200 }, ...]
```

---

## 10. Créer un Exécutable (.exe)

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

## 11. Bonnes Pratiques

1.  **Organisation** : Utilisez `import("module.fz")` pour découper votre code.
2.  **Sécurité** : Utilisez les fonctions `encText` / `decText` pour chiffrer vos données sensibles.
3.  **Nommage** : Utilisez le `snake_case` pour les variables et fonctions (`ma_variable`, `calculer_total`).

---

*Fazer - Simple, Rapide, Puissant.*
