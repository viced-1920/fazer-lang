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

🎓 **[NOUVEAU : Le Guide Ultime (A-Z)](docs/GUIDE.md)** - Commencez ici ! C'est la ressource la plus complète pour apprendre Fazer.

Documentation détaillée par section :
*   [Guide de Démarrage](docs/getting-started.md)
*   [Syntaxe du Langage](docs/syntax.md)
*   [Bibliothèque Standard (Stdlib)](docs/stdlib.md)
*   [Exemples](docs/examples.md)

## Fonctionnalités Clés

*   **GUI Native** : Créez de vraies applications Windows (WinForms) avec widgets natifs (`window`, `button`, `entry`, etc.).
*   **Pipe Operator (`->>`)** : Enchaînez les opérations proprement.
*   **Pattern Matching (`case`)** : Contrôle de flux expressif.
*   **Sécurité Intégrée** : Chiffrement AES-256-GCM et SHA256 natifs.
*   **Réseau & Web** : Client HTTP `fetch`, serveur web `server`, et module `discord`.
*   **Système de Fichiers** : Manipulation simple et puissante.
*   **Automation** : Gestion du presse-papier (`clipboard`), notifications (`notify`), et persistance (`db`).
*   **Extensible** : Système de modules `import`.

## Copyright

© 2026 **L'EMPRISE**. Tous droits réservés.
Distribué sous licence MIT.
