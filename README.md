# Fazer

**Fazer** — Le langage de script nouvelle génération par **L'EMPRISE**.

Conçu pour l'automatisation, la sécurité et le traitement de données, Fazer combine une syntaxe concise avec une bibliothèque standard "batteries included".

## Installation

Installez Fazer globalement via npm :

```bash
npm install -g fazer-lang
```

## Utilisation Rapide

Lancer le REPL (mode interactif) :
```bash
fazer
```

Exécuter un script :
```bash
fazer mon_script.fz
```

Utiliser les outils CLI (OSINT) :
```bash
fazer geo 8.8.8.8
fazer scan google.com
fazer whois microsoft.com
```

## Création d'Exécutable (.exe)

Transformez vos scripts Fazer en applications Windows portables et natives :

1.  (Optionnel) Placez une icône `app.ico` dans le dossier.
2.  Lancez la commande de build :
    ```bash
    fazer build mon_script.fz
    ```
3.  Récupérez votre application dans `dist/mon_script/mon_script.exe`.

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

## Copyright

© 2026 **L'EMPRISE**. Tous droits réservés.
Distribué sous licence MIT.
