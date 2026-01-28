# Documentation Fazer

Bienvenue dans la documentation officielle du langage **Fazer**.

## Table des Matières

0.  **[NOUVEAU : Le Guide Ultime (A-Z)](./GUIDE.md)**
    *   Le point de départ idéal pour tout apprendre d'un coup.

1.  **[Guide de Démarrage](./getting-started.md)**
    *   Installation
    *   Votre premier script
    *   Mode interactif (REPL)

2.  **[Syntaxe du Langage](./syntax.md)**
    *   Variables et Types
    *   Opérateur Pipe (`->>`)
    *   Contrôle de Flux (`case`)
    *   Fonctions

3.  **[Bibliothèque Standard (Stdlib)](./stdlib.md)**
    *   E/S Console (`println`, `ask`...)
    *   Système de Fichiers (`readText`, `writeText`...)
    *   Chiffrement (`encText`, `sha256`...)
    *   Réseau & Web (`server`, `fetch`, `discord`...)
    *   Utilitaires (`json`, `exec`...)

4.  **[Exemples](./examples.md)**
    *   Scripts complets pour apprendre par l'exemple.

## Feuille de Route (Extensions publiables via npm/GitHub)

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
- Safe-zip (zip chifré, signature d’archive, intégrité).
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
