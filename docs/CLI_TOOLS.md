# Fazer CLI - Outils & Commandes

Fazer intègre une suite complète d'outils CLI (>30 commandes) pour l'OSINT, le réseau, la cryptographie et l'administration système.

## Utilisation

```bash
fazer <commande> [arguments...]
```

## 🌐 Réseau & OSINT

*   **`geo <ip/domain>`** : Géolocalisation précise (Pays, Ville, ISP, Map).
*   **`ip`** : Affiche votre IP publique actuelle.
*   **`scan <host> [ports]`** : Scanner de ports TCP rapide.
*   **`ping <host> [port]`** : Ping TCP pour vérifier la connectivité.
*   **`whois <domain>`** : Informations WHOIS complètes.
*   **`sub <domain>`** : Énumération de sous-domaines (via Certificate Transparency).
*   **`dns <domain>`** : Résolution DNS (A, MX, TXT, NS, SOA).
*   **`tech <url>`** : Détection de technologies (Headers, Cookies, Server).
*   **`headers <url>`** : Affiche les en-têtes HTTP.
*   **`ssl <host> [port]`** : Inspecte le certificat SSL/TLS (Issuer, Validité, Fingerprint).
*   **`curl <url>`** : Affiche le corps de la réponse HTTP (GET).
*   **`robots <url>`** : Récupère et affiche le fichier robots.txt.

## 🔒 Cryptographie & Encodage

*   **`b64 <enc|dec> <str>`** : Encodage/Décodage Base64.
*   **`hex <enc|dec> <str>`** : Encodage/Décodage Hexadécimal.
*   **`url <enc|dec> <str>`** : Encodage/Décodage URL.
*   **`md5 <str>`** : Hash MD5.
*   **`sha1 <str>`** : Hash SHA1.
*   **`sha256 <str>`** : Hash SHA256.
*   **`uuid`** : Génère un UUID v4 aléatoire.

## 💻 Système & Utilitaires

*   **`ls [dir]`** : Liste les fichiers et dossiers.
*   **`cat <file>`** : Affiche le contenu d'un fichier.
*   **`grep <regex> <file>`** : Recherche un motif dans un fichier.
*   **`wc <file>`** : Compte les lignes et caractères d'un fichier.
*   **`whoami`** : Affiche l'utilisateur et la machine actuels.
*   **`env`** : Affiche les variables d'environnement.
*   **`pass [len]`** : Génère un mot de passe sécurisé (défaut 16 chars).
*   **`calc <expr>`** : Calculatrice mathématique (ex: `10 * 5 + 2`).
*   **`now`** : Affiche la date et le timestamp actuels.
*   **`coin`** : Pile ou Face.
*   **`dice`** : Lance un dé (1-6).
