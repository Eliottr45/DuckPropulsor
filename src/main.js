import "./style.css";
import { init } from "./display/interactions.js";
import { Coins } from "./data/Coins.js";

const container = document.body;

const canvas = document.getElementById("game");
const coins = new Coins(50, 50, 50, 50);
const ctx = canvas.getContext("2d");
coins.hitBox(ctx);
coins.spritehitbox();

init(container);

function clear() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  // mise a jour de toute les coordonnées de tout les objets présent sur le canva (player/obstacles/coins)
}

function draw() {
  //affichage de tout les objets avec les nouvelles position set après le update
}

function gameLoop() {
  // dessin de tout les objets
  clear();

  update();

  draw();

  // condition qui verifie si le player est toujours vivant
  if (1 === 1) {
    requestAnimationFrame(gameLoop);
  }
}

gameLoop();
