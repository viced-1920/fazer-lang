# Exemples Fazer

## 1. Hello World

```fazer
"Hello World" ->> println
```

## 2. Demander le nom

```fazer
"Quel est votre nom ? " ->> ask ->> println
```

## 3. Chiffrement de Fichier (Logique simplifiée)

Ce script montre comment on pourrait structurer un outil de chiffrement.

```fazer
fn main () {
  "1. Chiffrer" ->> println
  "2. Déchiffrer" ->> println
  "Choix : " ->> ask ->> case {
    "1" : {
      "Fichier à chiffrer : " ->> ask ->> enc_flow
    }
    "2" : {
      "Fichier à déchiffrer : " ->> ask ->> dec_flow
    }
    _ : {
      "Choix invalide" ->> println
    }
  }
}

fn enc_flow (path) {
  path ->> exists ->> case {
    true : {
      "Mot de passe : " ->> ask ->> pass
      path ->> readText ->> encText(pass) ->> saveText(path)
      "Fichier chiffré !" ->> println
    }
    _ : { "Fichier introuvable" ->> println }
  }
}

// Lancer le main
main()
```

## 4. Serveur Web Simple

```fazer
fn handle_request (req) {
  "<h1>Bienvenue sur Fazer Web</h1>" // Retourne le HTML
}

"Démarrage du serveur sur 8080..." ->> println
8080 ->> server("handle_request")
```
