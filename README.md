# Fazer

**Fazer** — Le langage de script nouvelle génération par **L'EMPRISE**.

Conçu pour l'automatisation, la sécurité et le traitement de données, Fazer combine une syntaxe concise avec une bibliothèque standard "batteries included".

![Version](https://img.shields.io/badge/version-4.1.1-blue.svg) ![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Nouveautés v4.1.1
- **Support Command**: `fazer support` pour accéder aux dons et soutenir le développement.
- **Keygen Command**: `fazer keygen` pour générer des clés cryptographiques sécurisées.
- **FAZER Crypto System**: Algorithme de chiffrement militaire exclusif (FAZER-512) avec blocs de 512 bits et S-Boxes adaptatives.
- **Binary Structs**: Manipulation binaire bas niveau (pack/unpack) pour protocoles réseau.
- **Worker Threads**: Vrai parallélisme multi-thread via `worker` module.
- **HTML/OSINT**: Module `html` pour l'extraction de données (liens, emails).
- **SQLite**: Support natif des bases de données SQL.
- **WASM & Plugins**: Exécution WebAssembly et extensions JS dynamiques.
- **Net & Security**: WebSocket client, RSA Crypto, Keystore chiffré.
- **System**: Clipboard, Notifications, Dialogues natifs.
- **Concurrency**: Async/Await, Channels, Cron scheduling.
- **Dev Tools**: Profiler, Trace mode, Permission Sandbox.

---

## 🛡️ Showcase : Sentinelle

Fazer inclut désormais **Sentinelle**, un outil de sécurité console de référence écrit entièrement en Fazer.
Il démontre les capacités de protection active :
*   Surveillance de fichiers temps réel.
*   Coffre-fort (dossiers invisibles).
*   Anti-Forensique (suppression définitive).

Retrouvez-le dans le dossier `Sentinelle/`.

Lancer Sentinelle depuis la racine du projet :

```bash
fazer Sentinelle/sentinelle.fz
```

## 📦 Installation
```bash
# Via npm
npm install -g fazer-lang

# Build depuis la source
git clone https://github.com/viced/fazer.git
cd fazer
npm install
npm link
```
### Installation Système (Script)
- **Windows**: Exécutez `.\install_system.ps1` dans PowerShell.
- **Linux/Mac**: Exécutez `./install_system.sh`.

## Utilisation Rapide

Lancer le REPL (mode interactif) :
```bash
fazer
```

Exécuter un script :
```bash
fazer mon_script.fz
```

Utiliser les outils CLI (OSINT & Crypto) :
```bash
fazer geo 8.8.8.8
fazer scan google.com
fazer whois microsoft.com
fazer keygen        # Génère une clé 256 bits
fazer keygen 64     # Génère une clé 512 bits (FAZER)
```

## Cryptage / Protection de Code

Pour distribuer un script sans révéler son code source (obfuscation/cryptage) :

```bash
fazer compile mon_script.fz
```

Cela génère un fichier `mon_script.fzc` (Fazer Compiled/Crypted).
Ce fichier est chiffré (AES-256) mais peut être exécuté directement par n'importe quel interpréteur Fazer :

```bash
fazer mon_script.fzc
```

Cela permet de partager des outils "privés" tout en gardant la portabilité du fichier.

## Création d'Exécutable (.exe / Binaire)

Transformez vos scripts Fazer en applications portables et natives :

1.  (Optionnel) Placez une icône `app.ico` dans le dossier.
2.  Lancez la commande de build :
    ```bash
    fazer build mon_script.fz
    ```
3.  Récupérez votre application dans `dist/mon_script/`.

*   **Sur Windows** : Crée un fichier `.exe` autonome.
*   **Sur Linux/Mac** : Crée un binaire exécutable (script shell + runtime).

Le dossier généré est **portable** : zippez-le et envoyez-le à n'importe qui, aucune installation n'est requise !

## Documentation

🎓 **[NOUVEAU : Le Guide Ultime (A-Z)](https://github.com/viced-1920/fazer-lang/blob/main/docs/GUIDE.md)** - Commencez ici ! C'est la ressource la plus complète pour apprendre Fazer.

Documentation détaillée par section :
*   [Guide de Démarrage](https://github.com/viced-1920/fazer-lang/blob/main/docs/getting-started.md)
*   [Syntaxe du Langage](https://github.com/viced-1920/fazer-lang/blob/main/docs/syntax.md)
*   [Bibliothèque Standard (Stdlib)](https://github.com/viced-1920/fazer-lang/blob/main/docs/stdlib.md)
*   [Outils CLI (OSINT & Sys)](https://github.com/viced-1920/fazer-lang/blob/main/docs/CLI_TOOLS.md)
*   [Exemples](https://github.com/viced-1920/fazer-lang/blob/main/docs/examples.md)

## Fonctionnalités Clés

*   **GUI Native** : Créez de vraies applications Windows (WinForms) avec widgets natifs.
*   **Red Team & Securité (v3.1)** : Suite offensive et défensive native :
    *   **Implant** : Beacon C2 automatique, Persistance (Startup/Registry).
    *   **Reconnaissance WiFi** : Scan réseaux, Dump mots de passe (netsh).
    *   **Stéganographie** : Dissimulation de données dans les images (LSB pour BMP, Append pour autres).
    *   **Injection de Code** : Injection de Shellcode via `CreateRemoteThread` (Memory Injection).
    *   **Crypto** : AES-256, Hachage (SHA256/512), HMAC, Encodages.
    *   **Forensics** : Dump mémoire (MiniDump), Liste processus.
*   **Moteur 3D (v3.2)** : Moteur de jeu WebGL 2.0 complet intégré.
    *   **Rendu** : Meshes 3D, Eclairage, Caméra FPS.
    *   **Bibliothèque** : `engine3d` inclus pour la physique (AABB) et les mathématiques vectorielles.
    *   **Mixte** : Overlay 2D sur scène 3D pour les interfaces utilisateur.
*   **Stdlib Étendue** : Mathématiques, FS récursif, HTTP avancé (Headers, Proxies).
*   **Pipe Operator (`->>`)** : Enchaînez les opérations proprement.
*   **Pattern Matching (`case`)** : Contrôle de flux expressif.
*   **Portable** : Compilation en `.exe` natif avec support d'icônes.
*   **Réseau & Web** : Client HTTP `fetch`, serveur web `server`, et module `discord`.
*   **Système** : Manipulation fichiers, processus et presse-papier.

## Feuille de Route (Grandes Extensions)

### Langage & Exécution
- Ajouter async/await natif et Promises internes pour uniformiser l’asynchronisme.
- Introduire des “channels” et “workers” légers (goroutine-like) pour concurrence structurée.
- Activer un profiler CPU/IO intégré et un mode “trace” pour diagnostiquer la perf.
- Mettre en cache l’AST/bytecode (compilation incrémentale) pour accélérer les lancements.
- Exposer un “sandbox” d’exécution (policy de permissions: fs/net/sys) pour scripts confinés.

### Interop & Extensibilité
- FFI minimal pour appeler des fonctions C/DLL/SO avec mapping types sûrs.
- Support WebAssembly en exécution embarquée (charger et appeler des modules .wasm).
- “Plugins Fazer” (API stable): modules communautaires auto-chargés via convention.

### Sécurité & Confidentialité
- Keystore sécurisé intégré (stockage secrets chifrés, KMS local).
- PGP-like: signer/vérifier/chiffrer des fichiers et messages.
- Safe-zip (zip chiffré, signature d’archive, intégrité).
- Scanner d’intégrité (inventaire SHA-256 + détection de dérive).
- Audit réseau (capture basique, DNS monitor, détection connexions sortantes suspectes).
- Sandboxing réseau (liste blanche IP/ports au niveau runtime avec netsh/iptables abstrait).

### Réseau & Intégrations
- HTTP complet: retries, backoff, pooling, proxy, cookies, multipart, streaming.
- WebSocket/MQTT natifs pour apps temps réel et IoT.
- Client S3/GCS/Azure Blob minimal (GET/PUT, presigned URLs).
- Tunnels locaux (reverse proxy dev) avec authentification simple.

### Automatisation Système & Desktop
- Automatisation UI native (Windows UIA, macOS AX, Linux AT-SPI) pour tests/app headless.
- Automatisation navigateur (Chrome/Edge) embarquée type Playwright-like minimal.
- Jobs planifiés: cron syntactic sugar, persistance des tâches, journaux.

### Données & Science
- Tableaux numériques optimisés (typed arrays, opérations vectorisées).
- CSV/Parquet readers/writers et pipeline ETL (map/reduce/aggregate).
- Visualisation terminal (sparklines, histogrammes, heatmaps ASCII).
- Moteur de requêtes “query” sur JSON/CSV (sélection, filtre, groupby).

### Base de Données
- SQLite intégré (sans dépendance externe côté API: bundling selectif) et mini ORM.
- KV store natif (LMDB/LevelDB-like en JS natif) pour cache et queues persistantes.

### Interface & UX
- Toolkit TUI riche (panels, tables, forms, navigation), non-bloquant.
- Générateur d’apps (fazer create) avec templates prêtes (cli, tui, service, webview).
- Thèmes et i18n natifs pour standardiser l’expérience utilisateur.

### DevEx & Qualité
- Linter/formatter officiel (opinions simples, auto-fix).
- Test runner intégré (describe/it, assertions, coverage simple).
- Debugger pas-à-pas (breakpoints, watch, step) via protocole runtime.
- Docstrings et génération docs (fazer doc) à partir des signatures.
- Telemetry opt-in (usage anonymisé) pour comprendre adoption, désactivable globalement.

### Distribution & Build
- Emballage autonome: build en exécutable multiplateforme avec runtime embarqué.
- Signatures de build (hash + signature binaire) pour confiance et releases vérifiables.
- Packager “assets” (images, sons, modèles) avec manifest, cachehash et hot-reload.

### Web & Graphique
- Webview modernisé (Chromium headless) avec bridge sécurisé bidirectionnel.
- Rendu 2D TUI + sprites ASCII, animations terminales fluides (pour jeux/monitoring).
- Export PDF/Image (rasterize) pour rapports et dashboards automatiques.

### Observabilité
- Logger structuré (levels, JSON, rotation, sinks: file/console/http).
- Metrics intégrés (counters, histograms) + endpoint Prometheus optionnel.
- Traces (correlation-id) pour scripts longs et systèmes distribués.

### Gouvernance & Écosystème
- Registre des modules Fazer (index JSON) avec vérification signatures des packages.
- Badge “verified” pour modules maintenus et conformes (tests/docs).
- “Examples Hub” riche avec cas réels: sécurité, scraping, ETL, UI.

## Copyright

© 2026 **L'EMPRISE**. Tous droits réservés.
Distribué sous licence MIT.
