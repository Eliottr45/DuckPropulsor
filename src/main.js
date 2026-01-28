import "./style.css";
import { init } from "./display/interactions.js";
import { Coins } from "./data/Coins.js";
import monImage from "./assets/coins.png";

const container = document.body;

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
  getRandomNumber(0, canvas.height),
  50,
  50,
);
const coins2 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(0, canvas.height),
  50,
  50,
);
const coins3 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(0, canvas.height),
  50,
  50,
);
const coins4 = new Coins(
  canvas.width + getRandomNumber(0, canvas.width),
  getRandomNumber(0, canvas.height),
  50,
  50,
);

// deplacement();
ctx.fillStyle = "purple";
coins.hitBox(ctx);
coins2.hitBox(ctx);
coins3.hitBox(ctx);
coins4.hitBox(ctx);

const image = new Image();
image.src = monImage;

image.onload = () => {
  coins.insertasset(image, ctx);
  coins2.insertasset(image, ctx);
  coins3.insertasset(image, ctx);
  coins4.insertasset(image, ctx);
};

init(container);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coins.moveLeft(4);
  coins2.moveLeft(4);
  coins3.moveLeft(4);
  coins4.moveLeft(4);

  coins.insertasset(image, ctx);
  coins2.insertasset(image, ctx);
  coins3.insertasset(image, ctx);
  coins4.insertasset(image, ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
