import "./style.css";
import { init } from "./display/interactions.js";
import { Coins } from "./data/Coins.js";
import monImage from "./assets/coins.png";
import imagePlayer from "./assets/player.png";
import { Player } from "./data/player.js";
import { Obstacles } from "./data/Obstacles.js";

const container = document.body;
let playerMoveUpdateInterval;

let ispaused = false;

init(container, () => ispaused);

function getCanvas() {
  const canvas = document.getElementById("game");
  if (!canvas) {
    throw new Error("Canvas introuvable");
  }
  return canvas;
}

//affichage de la hitbox dans le canvas
function getContext() {
  const canvas = getCanvas();
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Impossible de trouver le contexte 2D");
  }
  return ctx;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const canvas = getCanvas();
const ctx = getContext();
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Il faut modifier la height de chaque obstacle pour le responsive (faire en sorte que la height se calcul par rapport a la height de l'écran de l'utilisateur)

// On définit une constante pour l'espacement horizontal entre les obstacles
const spacing = 600;

const tableObstacles = [
  // 1. Un tunnel de départ (Plafond + Sol)
  new Obstacles(canvas.width + 500, 0, 400, 50),
  new Obstacles(canvas.width + 500, canvas.height - 50, 400, 50),

  // 2. Un mur central (oblige à choisir haut ou bas)
  new Obstacles(canvas.width + 500 + spacing, canvas.height / 2 - 150, 50, 300),

  // 3. Un escalier montant (3 blocs)
  new Obstacles(
    canvas.width + 500 + spacing * 2,
    canvas.height - 100,
    100,
    100,
  ),
  new Obstacles(
    canvas.width + 500 + spacing * 2.3,
    canvas.height - 200,
    100,
    200,
  ),
  new Obstacles(
    canvas.width + 500 + spacing * 2.6,
    canvas.height - 300,
    100,
    300,
  ),

  // 4. Les "Dents de la mer" (Stalactites en haut)
  new Obstacles(canvas.width + 500 + spacing * 4, 0, 50, 400),
  new Obstacles(canvas.width + 500 + spacing * 4.5, 0, 50, 300),
  new Obstacles(canvas.width + 500 + spacing * 5, 0, 50, 400),

  // 5. Un passage très étroit au milieu
  new Obstacles(
    canvas.width + 500 + spacing * 6,
    0,
    100,
    canvas.height / 2 - 100,
  ),
  new Obstacles(
    canvas.width + 500 + spacing * 6,
    canvas.height / 2 + 100,
    100,
    canvas.height / 2,
  ),

  // 6. Une plateforme flottante longue
  new Obstacles(
    canvas.width + 500 + spacing * 7.5,
    canvas.height / 2 - 25,
    600,
    50,
  ),

  // 7. Le saut final (Murs alternés)
  new Obstacles(canvas.width + 500 + spacing * 9, canvas.height - 400, 50, 400),
  new Obstacles(canvas.width + 500 + spacing * 9.5, 0, 50, 400),
  new Obstacles(
    canvas.width + 500 + spacing * 10,
    canvas.height - 400,
    50,
    400,
  ),
];

// instanciation des coins
const coins = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(100, canvas.height - 100),
  50,
  50,
);
const coins2 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(100, canvas.height - 100),
  50,
  50,
);
const coins3 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(100, canvas.height - 100),
  50,
  50,
);
const coins4 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(100, canvas.height - 100),
  50,
  50,
);
const coins5 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(100, canvas.height - 100),
  50,
  50,
);

// Instanciation du player
const player = new Player(500, 300, 100, 100);
player.hitBox(ctx);

// Affectation de l'image à la coin
const image = new Image();
image.src = monImage;

// Affectation de l'image au player
const imageJoueur = new Image();
imageJoueur.src = imagePlayer;

// Liste de toutes les pièces
const tableCoins = [coins, coins2, coins3, coins4, coins5];

let coinsvalue = 0;

let score = `🪙 ${coinsvalue}`;
let scorestorage = parseInt(localStorage.getItem("Scoretotalcoin")) || 0;
let scoremeilleurdistance =
  parseInt(localStorage.getItem("meilleurdistance")) || 0;
const compteurp = document.getElementById("compteur-coins");
compteurp.textContent = score;

// src/main.js

function totalScore(coin, cointotal, ancienRecord, distanceActuelle) {
  // Mise à jour du total des pièces
  cointotal += coin;
  localStorage.setItem("Scoretotalcoin", cointotal);

  // Si la distance actuelle est supérieure à l'ancien record, on met à jour
  if (distanceActuelle > ancienRecord) {
    localStorage.setItem("meilleurdistance", distanceActuelle);
  }
}

function coinObstacleCollide(coin, tabElt) {
  tabElt.forEach((element) => {
    if (element === coin) return;
    let newX = coin.getCoordX();
    const coinWidth = coin.getWidth();
    const coinHeight = coin.getHeight();
    const coinY = coin.getCoordY();

    while (
      newX < element.getCoordX() + element.getWidth() &&
      newX + coinWidth > element.getCoordX() &&
      coinY < element.getCoordY() + element.getHeight() &&
      coinY + coinHeight > element.getCoordY()
    ) {
      newX += 100;
    }
    coin.setPositionX(newX);
  });
}

// Fonction qui vérifie la collision entre le joueur et un élément du jeu (utilisation de onCollide => class Object)
function checkCollisions(player) {
  tableCoins.forEach((coin) => {
    if (coin.onCollide(player)) {
      // 1. Incrémenter le score
      coinsvalue += 1;

      // 2. Téléporter la pièce immédiatement
      coin.destroy();

      // 3. Mettre à jour l'affichage
      const compteur = document.getElementById("compteur-coins");
      if (compteur) {
        compteur.textContent = `🪙 ${coinsvalue}`;
      }
    }
  });

  // Pour chaque obstacles on vérifie collision
  tableObstacles.forEach((obstacle) => {
    if (obstacle.onCollide(player)) {
      obstacle.update(player);
      // debug verification de fonction
      console.log(player.getAlive);
    }
  });
}

let scoreDistance = 0;
let lastTime = 2;

const buttonPlay = document.getElementById("play");

buttonPlay.addEventListener("click", () => {
  lastTime = performance.now();
  affichageScore();
});

function affichageScore() {
  const now = performance.now();
  if (!ispaused) {
    scoreDistance += (now - lastTime) * 0.01;
    document.getElementById("score-coins").textContent =
      Math.floor(scoreDistance);
  }
  lastTime = now;
  requestAnimationFrame(affichageScore);
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p") {
    ispaused = !ispaused;
    if (ispaused === false) {
      boxpause.style.display = "none";
    } else {
      boxpause.style.display = "block";
    }
  }
});

const boxpause = document.getElementById("div-pause");

function gameLoop(player) {
  //if( ispaused === false) =>
  // On update la position du joueur (il peut être entrain de voler ou de tomber)

  // Pour chaque pièces on les déplaces vers la gauche
  if (ispaused === false) {
    // Pour chaque pièces on les déplaces vers la gauche
    tableCoins.forEach((coin) => {
      coin.moveLeft(2);
      coinObstacleCollide(coin, tableObstacles);
      coinObstacleCollide(coin, tableCoins);
    });

    // On déplace chaque obstacles vers la gauche
    tableObstacles.forEach((obstacle) => {
      obstacle.moveLeft(2);
    });

    // On clear l'écran de jeu
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    checkCollisions(player);

    tableCoins.forEach((coin) => {
      // Affichage de la hitbox (debug)
      coinObstacleCollide(coin, tableCoins);
      coin.hitBox(ctx);
      coin.insertasset(image, ctx);
    });
    ctx.fillStyle = "red";

    tableCoins.forEach((coin) => {
      // Affichage de la hitbox (debug)
      coin.hitBox(ctx);
      // Affichage de l'image de la pièce
      coin.insertasset(image, ctx);
    });

    tableObstacles.forEach((obstacle) => {
      // Affichage de la hitbox (debug)
      obstacle.hitBox(ctx);
      // Affichage de l'image de la pièce
      // coin.insertasset(image, ctx);
    });

    player.hitBox(ctx);

    player.insertPlayerImg(imageJoueur, ctx);
  }

  // Condition permettant le refresh du jeu toute les 16ms, le jeu s'arrete
  //}
  //else if(ispause){}

  if (player.getAlive()) {
    requestAnimationFrame(() => gameLoop(player));
  } else {
    console.log("Game Over");
    // faire un affichage d'une page game over
    const canva = document.getElementById("game");
    const playPage = document.getElementById("play-page");
    const GameOverPage = document.getElementById("game-over-page");
    const canvas = document.getElementById("game");
    canvas.style.backgroundColor = "transparent";
    playPage.style.display = "none";
    GameOverPage.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scorestorage = parseInt(localStorage.getItem("Scoretotalcoin"));
    console.log(scorestorage);
    console.log(coinsvalue);
    console.log(Math.round(scoreDistance));
    canva.style.display = "none";

    // ! coinsvalue = 0;
    // const caca = localStorage.setItem("Scoretotalcoin", 0);
    // scorestorage = localStorage.getItem(caca);

    //Affichage Résultat score distance et coin de la partie finie au game over

    let scoreCoinFinal = `Votre score de pièce ${coinsvalue}`;
    let scoreDistanceFinal = `Distance parcourue ${Math.round(scoreDistance)}`;
    const coin = document.getElementById("coin");
    const distance = document.getElementById("distance");
    coin.textContent = scoreCoinFinal;
    distance.textContent = scoreDistanceFinal;

    //Ajout dans le localstorage le score total des pièces + le meilleur score de la distance
    totalScore(coinsvalue, scorestorage, scoremeilleurdistance, scoreDistance);
    scorestorage = localStorage.getItem("Scoretotalcoin");
    scoremeilleurdistance =
      parseInt(localStorage.getItem("meilleurdistance")) || 0;
    console.log(scorestorage);
    scoreDistance = 0;

    //Affichage des meilleurs résultats à la page d'accueil

    // let scoreCoinTotal = `Total des pièces en stock ${scorestorage}`;
    // let scoreMeilleurDistance = `Meilleure distance parcourue ${scoremeilleurdistance}`;
    // const cointotal = document.getElementById("coin-total");
    // console.log(scoreCoinTotal);
    // const meilleuredistance = document.getElementById("meilleure-distance");
    // cointotal.textContent = scoreCoinTotal;
    // meilleuredistance.textContent = scoreMeilleurDistance;
  }
}

let scoreCoinTotal = `Total des pièces en stock ${scorestorage}`;
let scoreMeilleurDistance = `Meilleure distance parcourue ${scoremeilleurdistance}`;
const cointotal = document.getElementById("coin-total");
console.log(scoreCoinTotal);
const meilleuredistance = document.getElementById("meilleure-distance");
cointotal.textContent = scoreCoinTotal;
meilleuredistance.textContent = scoreMeilleurDistance;

const btnplay = document.getElementById("play");

btnplay.addEventListener("click", () => {
  playAgain();
  canvas.style.backgroundColor = "";
});

// Dans src/main.js

function playAgain() {
  // Réinitialisation score et coord du player
  player.reset(500, 300);
  clearInterval(playerMoveUpdateInterval);
  coinsvalue = 0;
  scoreDistance = 0;
  lastTime = performance.now();

  // MIse à jour du score
  const compteur = document.getElementById("compteur-coins");
  if (compteur) compteur.textContent = `🪙 ${coinsvalue}`;

  const canvasWidth = canvas.width; // Assure-toi que canvas est accessible

  tableObstacles.forEach((obstacle) => {
    obstacle.resetToDefault();
  });

  tableCoins.forEach((coin) => {
    coin.setPositionX(canvasWidth + getRandomNumber(0, canvasWidth));
    // Si tu as une propriété "collected" sur les coins, remets-la à false ici si nécessaire
  });

  // 4. Relancer la boucle de jeu
  affichageScore();
  gameLoop(player);

  playerMoveUpdateInterval = setInterval(() => {
    !ispaused && player.update();
  }, 1000 / 144);
}

const btnReplay = document.getElementById("buttonRejouer");

if (btnReplay) {
  btnReplay.addEventListener("click", () => {
    const gameOverPage = document.getElementById("game-over-page");
    const playPage = document.getElementById("play-page");
    const canvas = document.getElementById("game");

    if (gameOverPage) gameOverPage.style.display = "none";
    if (playPage) playPage.style.display = "block";

    if (canvas) {
      canvas.style.display = "block";
      canvas.style.backgroundColor = "";
    }

    playAgain();
  });
}
