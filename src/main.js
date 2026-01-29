import "./style.css";
import { init } from "./display/interactions.js";
import { Coins } from "./data/Coins.js";
import monImage from "./assets/coins.png";
import imagePlayer from "./assets/player.png";
import { Player } from "./data/player.js";
import { Obstacles } from "./data/Obstacles.js";

const container = document.body;

init(container);

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
const obstacles = new Obstacles(
  canvas.width + getRandomNumber(0, canvas.width),
  0,
  50,
  300,
);

const obstacles2 = new Obstacles(
  canvas.width + getRandomNumber(0, canvas.width),
  canvas.height - 500,
  50,
  500,
);

const obstacles3 = new Obstacles(
  canvas.width + getRandomNumber(0, canvas.width),
  canvas.height / 2 - 100,
  50,
  200,
);

const obstacles4 = new Obstacles(
  canvas.width + getRandomNumber(0, canvas.width),
  canvas.height - 50,
  700,
  50,
);

// Faire en sorte que le spawn et le respawn des pièces ne se superpose pas avec les obstacles

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

// Liste de tout les obstacles
const tableObstacles = [obstacles, obstacles2, obstacles3, obstacles4];

// Liste de toutes les pièces
const tableCoins = [coins, coins2, coins3, coins4, coins5];

let coinsvalue = 0;

let score = `🪙 ${coinsvalue}`;
let scorestorage = parseInt(localStorage.getItem("Scoretotalcoin")) || 0;
const compteurp = document.getElementById("compteur-coins");
compteurp.textContent = score;

function totalCoins(coin, cointotal) {
  cointotal += coin;

  localStorage.setItem("Scoretotalcoin", cointotal);
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
  scoreDistance += (now - lastTime) * 0.01;
  lastTime = now;

  document.getElementById("score-coins").textContent =
    Math.floor(scoreDistance);

  requestAnimationFrame(affichageScore);
}

function gameLoop(player) {
  // On update la position du joueur (il peut être entrain de voler ou de tomber)
  player.update();

  // Pour chaque pièces on les déplaces vers la gauche
  tableCoins.forEach((coin) => {
    coin.moveLeft(2);
  });

  // On déplace chaque obstacles vers la gauche
  tableObstacles.forEach((obstacle) => {
    obstacle.moveLeft(2);
  });

  // On clear l'écran de jeu
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  checkCollisions(player);

  ctx.fillStyle = "red";

  tableCoins.forEach((coin) => {
    // Affichage de la hitbox (debug)
    coin.hitBox(ctx);
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

  // Condition permettant le refresh du jeu toute les 16ms, le jeu s'arrete
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
    totalCoins(coinsvalue, scorestorage);
    scorestorage = parseInt(localStorage.getItem("Scoretotalcoin"));
    console.log(scorestorage);
    console.log(coinsvalue);
    canva.style.display = "none";
    scoreDistance = 0;
    // ! coinsvalue = 0;
    // const caca = localStorage.setItem("Scoretotalcoin", 0);
    // scorestorage = localStorage.getItem(caca);
  }
}

const btnplay = document.getElementById("play");

btnplay.addEventListener("click", () => {
  playAgain();
  canvas.style.backgroundColor = "";
});

// Dans src/main.js

function playAgain() {
  // Réinitialisation score et coord du player
  player.reset(500, 300);
  coinsvalue = 0;
  scoreDistance = 0;
  lastTime = performance.now();

  // MIse à jour du score
  const compteur = document.getElementById("compteur-coins");
  if (compteur) compteur.textContent = `🪙 ${coinsvalue}`;

  const canvasWidth = canvas.width; // Assure-toi que canvas est accessible

  tableObstacles.forEach((obstacle) => {
    // On les replace aléatoirement hors champ à droite
    obstacle.setPositionX(canvasWidth + getRandomNumber(0, canvasWidth));
  });

  tableCoins.forEach((coin) => {
    coin.setPositionX(canvasWidth + getRandomNumber(0, canvasWidth));
    // Si tu as une propriété "collected" sur les coins, remets-la à false ici si nécessaire
  });

  // 4. Relancer la boucle de jeu
  affichageScore();
  gameLoop(player);
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
