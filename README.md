# :musical_note: Feel the music :musical_note: 

## :bulb: Qu'est-ce que c'est ?

Feel the music est une application connectée à l'api Genius consacrée au monde de la musique.  

## :heavy_check_mark: Comment l'utiliser ?  

La partie client de l'application est hébergée à l'adresse suivante : https://zealous-kilby-5ce8f2.netlify.app/


A partir de cette application, il est possible de : 

- rechercher une musique ou un artiste (en fonction de son titre, de l'artiste, et des paroles) 
- afficher les détails d'un artiste (biographie, titre les plus connus, nombres de followers, lien vers ses réseaux...)
- afficher les informations d'une musique (nombre d'écoutes, auteur, album...) ainsi un lien Genius pour consulter les paroles

Lors de l'ouverture de l'application, on atterit sur une écran contenant une barre de recherche permettant à l'utilisateur de chercher une musique, un auteur ou un album en fonction de ses envies.

## :hammer_and_wrench: Déploiement local
### En utilisant les images Docker publiés sur le hub
Dans ce cas là il vous suffit de vous placer à la racine du projet et de faire la commande `docker-compose up -d` qui va récupérer les images Docker nécessaires si vous ne les avez pas téléchargées auparavant et lancer les deux containers (api et client).


### En buildant manuellement le projet 

#### Build de l'api : 
Placez vous dans le dossier api/ et lancez l'installation des dépendances
```bash
npm install
```
Buildez ensuite l'image Docker (vous pouvez utiliser un autre nom d'image mais si vous faites cela il faudra modifier le nom de l'image que vous utilisez dans le fichier `docker-compose.yml`)
```bash 
docker build -t mathiz11/github-ci_api .
```

#### Build du client : 
Placez vous dans le dossier client/ et lancez l'installation des dépendances
```bash
npm install
```
Buildez ensuite l'image Docker (vous pouvez utiliser un autre nom d'image mais si vous faites cela il faudra modifier le nom de l'image que vous utilisez dans le fichier `docker-compose.yml`)
```bash 
docker build -t mathiz11/github-ci_client .
```
