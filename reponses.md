# Réponses - Partie C : Lecture de HTTP

## Question 1 : requête vers https://dummyjson.com/users/1

- **Méthode** : GET (on demande une ressource sans rien modifier sur le serveur).
- **Code d'état** : 200 (OK : la requête a réussi).
- **Content-Type** : application/json; charset=utf-8 (le serveur renvoie du JSON).
- **Deux champs du JSON** : `firstName` ("Emily") et `email` ("emily.johnson@x.dummyjson.com").

## Question 2 : requête vers https://dummyjson.com/users/99999

- **Code obtenu** : 404 (Not Found).
- **Signification** : la ressource demandée n'existe pas, car aucun utilisateur n'a l'id 99999. Le serveur a bien répondu, mais il n'a rien à renvoyer.
- **Réaction de l'interface** : l'application ne doit pas planter ni afficher une page vide. Elle doit afficher un message clair, par exemple « Utilisateur introuvable ».

## Question 3 : côté client ou côté serveur ?

- (a) Afficher un message d'erreur sous un champ : **côté client** (c'est de l'affichage dans le navigateur).
- (b) Enregistrer une note dans la base de données : **côté serveur**.
- (c) Vérifier un mot de passe : **côté serveur** (sinon n'importe qui pourrait lire et contourner la vérification).
- (d) Changer la couleur d'un bouton au survol : **côté client** (CSS dans le navigateur).
- (e) Décider qu'un utilisateur n'a pas le droit de supprimer : **côté serveur** (c'est une règle de sécurité, que le client ne peut pas garantir).

## Question 4 : codes HTTP

- **201 (Created)** : une ressource vient d'être créée, par exemple une inscription. L'interface affiche un message de succès.
- **401 (Unauthorized)** : l'utilisateur n'est pas authentifié (pas connecté ou identifiants invalides). L'interface redirige vers la page de connexion.
- **404 (Not Found)** : la ressource n'existe pas. L'interface affiche « introuvable ».
- **500 (Internal Server Error)** : le serveur a rencontré une erreur. L'interface affiche un message général (« Erreur du serveur, réessayez plus tard ») sans détails techniques.
