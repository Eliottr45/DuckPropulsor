import "./style.css";
import { init } from "./display/interactions.js";
import { Coins } from "./data/Coins.js";
import monImage from "./assets/coins.png";
import imagePlayer from "./assets/player.png";
import { Player } from "./data/player.js";

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

const player = new Player(500, 300, 100, 100);
player.hitBox(ctx);

// deplacement();

const image = new Image();
image.src = monImage;

const imageJoueur = new Image();
imageJoueur.src = imagePlayer;

const tableCoins = [coins, coins2, coins3, coins4, coins5];

let coinsvalue = 0;
let score = `Score coins : ${coinsvalue}`;

const compteurp = document.getElementById("compteur-coins");
compteurp.textContent = score;

function checkCollisions(player) {
  tableCoins.forEach((coin) => {
    if (coin.onCollide(player)) {
      coinsvalue += 1;
      coin.collected = true;
      coin.destroy(player);
      score = `Score coins: ${coinsvalue}`;

      const affichageScore = document.getElementById("compteur-coins");
      if (compteurp) {
        compteurp.textContent = score;
      }
    }
  });
}

function gameLoop(player) {
  player.update();

  tableCoins.forEach((coin) => {
    coin.moveLeft(2);
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  checkCollisions(player);

  ctx.fillStyle = "red";

  tableCoins.forEach((coin) => {
    // Affichage de la hitbox (debug)
    coin.hitBox(ctx);
    // Affichage de l'image de la piÃ¨ce
    coin.insertasset(image, ctx);
  });

  player.hitBox(ctx);

  player.insertPlayerImg(imageJoueur, ctx);

  if (player.getAlive()) {
    requestAnimationFrame(() => gameLoop(player));
  } else {
    console.log("Game Over");
  }
}

gameLoop(player);
