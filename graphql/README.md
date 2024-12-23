# GraphQL Server

## Lancer le serveur GraphQL

```
docker compose up
```

## Accéder à l'interface Apollo Studio

http://localhost:4000/graphql


## Documentation de l'API

### Queries

#### `rockets: [Rocket!]!`
Retourne la liste de toutes les fusées disponibles pour la course.

Chaque fusée contient :
- `id`: Identifiant unique
- `name`: Nom de la fusée
- `description`: Description de la fusée
- `image`: URL de l'image de la fusée

#### `race(id: ID!): Race`
Retourne les détails d'une course spécifique à partir de son ID **une fois la course terminée**.
- Retourne `null` si la course n'existe pas
- Inclut les informations de progression des deux fusées et le gagnant

### Mutations

#### `startRace(rocket1: ID!, rocket2: ID!): Race!`
Démarre une nouvelle course entre deux fusées.

Paramètres :
- `rocket1`: ID de la première fusée
- `rocket2`: ID de la deuxième fusée

Retourne un objet `Race` contenant :
- `id`: ID unique de la course
- `rocket1`: État de la première fusée
- `rocket2`: État de la deuxième fusée
- `winner`: null étant donné que c'est le début de la course

Erreurs possibles :
- Lance une erreur si l'une des fusées n'existe pas

### Subscriptions

#### `rocketProgress(raceId: ID!, rocketId: ID!): RocketProgressEvent!`
Permet de suivre en temps réel la progression d'une fusée pendant une course.

Paramètres :
- `raceId`: ID de la course
- `rocketId`: ID de la fusée à suivre

Retourne un flux d'événements `RocketProgressEvent` contenant :
- `raceId`: ID de la course
- `rocketId`: ID de la fusée
- `progress`: Progression actuelle (0-100)
- `exploded`: Indique si la fusée a explosé

### Types

#### Race
```graphql
type Race {
    id: ID!
    rocket1: RocketProgress!
    rocket2: RocketProgress!
    winner: ID
}
```

#### Rocket
```graphql
type Rocket {
    id: ID!
    name: String!
    description: String!
    image: String!
}
```

#### RocketProgress
```graphql
type RocketProgress {
    id: ID!
    progress: Int!
    exploded: Boolean!
}
```

#### RocketProgressEvent
```graphql
type RocketProgressEvent {
    raceId: ID!
    rocketId: ID!
    progress: Int!
    exploded: Boolean!
}
```

## Fonctionnement d'une course

1. Une course est initiée via la mutation `startRace`
2. Les deux fusées progressent automatiquement avec une vitesse aléatoire
3. Il y a un risque d'explosion aléatoire pour chaque fusée
4. La course se termine quand :
   - Une fusée atteint 100% de progression sans avoir explosé (gagnant)
   - Une fusée explose (l'autre fusée gagne automatiquement)
5. La progression peut être suivie en temps réel via la subscription `rocketProgress`
6. Une fois la course terminée, le résultat final peut être récupéré via la query `race`