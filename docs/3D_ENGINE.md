# Guide du Moteur 3D Fazer (v3.2)

Fazer v3.2 introduit un moteur de rendu 3D complet, accéléré matériellement via WebGL 2.0. Ce guide explique comment créer des scènes 3D, gérer la caméra, et utiliser la bibliothèque standard `engine3d`.

## Initialisation

Pour démarrer le mode 3D, utilisez `gfx.init3d` au lieu de `gfx.init`.

```fazer
gfx.init3d("Mon Jeu 3D", 800, 600)

fn loop() ->
    gfx.clear({r:0.1, g:0.1, b:0.1})
    # ... rendu ...
end

gfx.loop(loop)
```

## Bibliothèque `engine3d`

La bibliothèque `engine3d` fournit des abstractions de haut niveau pour faciliter le développement. Elle est incluse dans la distribution standard.

```fazer
engine3d := import("engine3d.fz")
```

### Vecteurs

```fazer
v1 := engine3d.Vec3(1, 0, 0)
v2 := engine3d.Vec3(0, 1, 0)
v3 := engine3d.vec_add(v1, v2) # {x:1, y:1, z:0}
```

### Création de Meshes

Vous pouvez générer des formes primitives facilement :

```fazer
# Créer un cube rouge avec l'ID "cube1"
engine3d.create_cube_mesh("cube1", {r:1, g:0, b:0})

# Créer un sol gris
engine3d.create_plane_mesh("floor", {r:0.5, g:0.5, b:0.5}, 20, 20)
```

### Entités et Caméra

La bibliothèque propose une structure `Entity` et une `Camera` FPS prête à l'emploi.

```fazer
# Caméra
mut cam := engine3d.Camera(0, 2, 5)

# Entité
mut box := engine3d.Entity("cube1", 0, 0, 0)

fn loop() ->
    gfx.clear({r:0.1, g:0.1, b:0.1})
    
    # Mise à jour Caméra (ZQSD + Souris)
    cam.update(cam)
    
    # Dessiner l'entité
    box.draw(box)
end
```

## API Bas Niveau (`gfx`)

Si vous souhaitez contrôler directement le pipeline de rendu :

*   `gfx.mesh_create(id, verts, cols, norms)`: Envoie les données géométriques au GPU.
    *   `verts`: Liste plate [x,y,z, x,y,z, ...]
    *   `cols`: Liste plate [r,g,b, r,g,b, ...]
    *   `norms`: Liste plate [nx,ny,nz, ...]
*   `gfx.draw(id, x, y, z, rx, ry, rz, sx, sy, sz)`: Dessine un mesh avec transformation (Position, Rotation, Scale).
*   `gfx.camera(x, y, z, tx, ty, tz)`: Positionne la caméra et le point qu'elle regarde (LookAt).
*   `gfx.light(x, y, z)`: Positionne la source de lumière ponctuelle.

## Interface Utilisateur (Overlay)

Vous pouvez dessiner du texte 2D par-dessus la scène 3D pour afficher des scores, de la vie, etc.

```fazer
gfx.text(10, 10, "Score: 100", "#FFFFFF", 20)
```

## Collisions

La bibliothèque inclut une fonction simple d'intersection AABB (Axis-Aligned Bounding Box).

```fazer
hit := engine3d.aabb_intersect(
    pos1, size1, # {x,y,z}
    pos2, size2  # {x,y,z}
)
```
