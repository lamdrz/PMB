# Polytech Mont Blanc

Site web de l'association Polytech Mont Blanc : un club de l'école Polytech Annecy-Chambéry qui a pour objectif de faire monter 20 étudiants au sommet de l'Europe.

## Documentation technique

### Changer/Ajouter des photos

#### Photos de l'équipe

1. Modifier les photos de l'équipe dans le dossier `src/assets/br/`.

Pour les photos du BR, elles doivent être nommée `annecy` ou `chambery` selon le bureau, et placées dans le dossier `src/assets/br/`.

Pour les membres de l'équipe, les photos doivent être nommées de la manière suivante : `prenom_role` (exemple : `Louis_Respo com.jpeg`). Et placées respectivement dans le dossier `src/assets/br/annecy` ou `src/assets/br/chambery` selon le bureau.

_Extensions autorisées : `.jpg`, `.jpeg`, `.png`._

2. Modifier le nombre de membres dans le fichier `src/css/infos.css` pour ajuster l'animation de défilement :

```css
#equipe {
    --nb-membre-annecy: 6;
    --nb-membre-chambery: 5;
}
```

#### Photos de l'ascension

1. Ajouter les photos de l'ascension dans le dossier `src/assets/annees/20xx` en fonction de l'année.

2. Ajouter l'import du dossier dans le fichier `src/utils/loadImages.js` si elle n'y est pas déjà présente.

```js
const imageImports = {
    2000: import.meta.glob('../assets/annees/2000/*.{png,jpg,jpeg}'),
]
```

### Déploiement

Rien à faire, le site est construit automatiquement avec `npm run build` et publié depuis le dossier `docs/`.

Le build Vite s'occupe déjà de générer `docs/404.html` et `docs/CNAME`.

Le workflow GitHub Actions se trouve dans `.github/workflows/deploy.yml` et s'occupe de publier le site sur GitHub Pages.

### Nom de domaine

Le nom de domaine `polytech-montblanc.fr` est fourni par IONOS et est déjà configuré pour pointer vers le site GitHub Pages. Il n'y a rien à faire de ce côté-là.