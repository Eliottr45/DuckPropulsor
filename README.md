
<div align="center" ><img  width="174" height="151" alt="duckpropulsor" src="https://github.com/user-attachments/assets/d947d189-fc08-4333-8fe9-9c829f45ac62" /></div>

# DuckPropulsor

Jeu d'arcade inspiré de jetpack joyride. Ici c'est un canard qui est propulsé par un jetpack. Son but est de parcourir le plus de distance sans se heurter à des obstacles, tout en recueillant le plus de pièces possible sur son chemin

## Fonctionnalités Clés du jeu

* **Course infinie:** Génération continue des obstacles et des décors.
* **Esquive et Obstacles:** Des obstacles sur le chemin du canard qu'il doit éviter sans quoi sa mort est assurée .
* **Système de score :** Ramassage de pièces tout au long du parcours et enregistrement de la distance maximale parcourue (High Score) pour encourager la rejouabilité.

## Comment lancer notre jeu?

### 1. Prérequis
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre ordinateur.

### 2. Cloner le projet
Récupérez le code source depuis GitHub :
```bash
git clone https://github.com/Eliottr45/DuckPropulsor.git
```
### 3. Installer l'outil Vite.js pour retranscrire et compresser le code pour le navigateur
```bash
npm install
```
### 4. Démarrer le jeu
```bash
npm run dev
```
### 5. Jouer
Cliquer sur le lien généré et amusez-vous avec notre jeu


## 🛠️ Technologies utilisées

 <table>
   <thead>
      <tr>        
        <th align="center">
          <h3 style="color:#38bdf8;">Frontend</h3>        
        </th>        
      </tr>
   </thead>
   <tbody>
        <tr>            
            <td align="center"><img src="https://skillicons.dev/icons?i=html,css,javascript" /></td>            
        </tr>
    </tbody>
   
  </table> 

  ## 👥 Contributeurs & Projet de Groupe

Ce projet est un projet académique réalisé en équipe de 3 étudiants.  
Il applique les notions vues au cours de nos 3 semaines de cours sur le langage javascript:

- Programmation Orientée Objet (POO)
- langage javascript
- gestion d'un localstorage

### Répartition des tâches dans le Groupe

[**Eliot TOURTELIER**](https://github.com/Eliottr45):  
fonction de création de la HitBox des objets
Création des classes filles Coins et Obstacles
Déplacement du Player
Eviter les collisions des pièces avec les obstacles

[**Félix PARENDEAU MILLERIOUX**](https://github.com/felix-pm):  
Création de la structure html
Gestion du Background du jeu qui défile en continue
Gestion du défilement des objets
Gestion de la pause du jeu

[**Pierre SOREAU**](https://github.com/PierreSoreau):  
Définition de la classe mère des objects qui représenteront joueur, obstacles et pièces
Gestion du compteur des pièces pendant la partie
Gestion du localstorage qui enregistre le montant total des pièces récoltées de toutes les parties et la meilleure distance parcourue
Gestion de la pause du jeu

## 🧠 Difficultées rencontrées

* **Architecture logicielle (Design Pattern) :** L'un des grands défis a été d'appréhender et d'implémenter le **modèle Composite**. Il a fallu repenser la structure du code pour assembler les différents éléments du jeu de manière hiérarchique, afin de pouvoir traiter des groupes d'objets de la même manière qu'un objet unique.
* **Gestion du Scrolling Infini (Seamless) :** Pour reproduire l'effet de course infinie, il fallait gérer le déplacement continu du décor. La difficulté mathématique et logique était d'instancier, recycler et repositionner les éléments graphiques hors de l'écran de manière fluide, sans qu'ils ne se chevauchent ou ne créent de "trous" visuels.
* **Modélisation Orientée Objet (POO) :** Un important travail d'abstraction a été nécessaire pour évaluer et définir les fonctions indispensables de chaque entité du jeu (le canard, les obstacles, le décor). L'objectif était de créer des classes avec des responsabilités claires et uniques pour garder un code modulaire et maintenable.



  
