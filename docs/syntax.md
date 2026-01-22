# Syntaxe du Langage Fazer

Fazer est un langage orienté flux. La plupart des opérations se font de gauche à droite via l'opérateur pipe.

## Commentaires

```fazer
// Ceci est un commentaire sur une ligne
```

## Variables

Il n'y a pas de mot-clé de déclaration explicite comme `var` ou `let` pour l'assignation simple dans le flux, mais vous pouvez nommer des valeurs dans des arguments de fonctions.

Cependant, Fazer utilise principalement le passage de valeurs. Pour stocker des états globaux ou complexes, on utilise souvent des objets JSON ou la mémoire interne via `set`/`get`.

```fazer
// Exemple d'utilisation de set/get (mémoire clé-valeur)
"ma_valeur" "cle" ->> set
"cle" ->> get ->> println // Affiche "ma_valeur"
```

## Opérateur Pipe (`->>`)

L'opérateur `->>` passe le résultat de l'expression de gauche comme **premier argument** de la fonction de droite.

```fazer
"Bonjour" ->> println
// Équivalent à println("Bonjour") dans d'autres langages
```

Chaînage :

```fazer
"mot_de_passe" ->> sha256 ->> println
```

## Chaînes de Caractères et Nombres

```fazer
"Ceci est une chaîne"
123
12.34
```

## Fonctions (Définition)

Fazer supporte la définition de fonctions nommées.

```fazer
fn ma_fonction (arg1) {
  arg1 ->> println
}

"test" ->> ma_fonction
```

## Contrôle de Flux : `case`

Fazer n'a pas de `if/else` traditionnel. Tout se fait via `case` (pattern matching).

```fazer
valeur ->> case {
  "option1" : {
    "C'est l'option 1" ->> println
  }
  "option2" : {
    "C'est l'option 2" ->> println
  }
  _ : {
    "Cas par défaut (wildcard)" ->> println
  }
}
```

### Conditionnelle (If-Else simulé)

Pour faire un `if`, on matche souvent sur un booléen ou une valeur spécifique. Notez que Fazer évalue l'égalité stricte.

```fazer
// Exemple conceptuel
variable ->> case {
  "vrai" : { ... }
  _ : { ... }
}
```
