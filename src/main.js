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

const canvas = getCanvas();
const ctx = getContext();
const coins = new Coins(50, 50, 50, 50);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "purple";
coins.hitBox(ctx);

const image = new Image();
image.src = monImage;

image.onload = () => {
  coins.insertasset(image, ctx);
};

// function moveSquare() {
//   if (keysPressed.ArrowUp || keysPressed.z) squareY -= speed;
//   if (keysPressed.ArrowDown || keysPressed.s) squareY += speed;
//   if (keysPressed.ArrowLeft || keysPressed.q) squareX -= speed;
//   if (keysPressed.ArrowRight || keysPressed.d) squareX += speed;

//   if (keysPressed.space) squareX += speed;

//   squareX = Math.max(0, Math.min(squareX, canvas.width - squareSize));
//   squareY = Math.max(0, Math.min(squareY, canvas.height - squareSize));
// }

// function updateGame() {
//   const ctx = getContext();
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   drawSquare();
//   moveSquare();
// }
// updateGame();

//
//
//
//
//

init(container);

// function clear() {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// }

// function update() {
//   // mise a jour de toute les coordonnées de tout les objets présent sur le canva (player/obstacles/coins)
// }

// function draw() {
//   //affichage de tout les objets avec les nouvelles position set après le update
// }

// function gameLoop() {
//   // dessin de tout les objets
//   clear();

//   update();

//   draw();

//   // condition qui verifie si le player est toujours vivant
//   if (1 === 1) {
//     requestAnimationFrame(gameLoop);
//   }
// }

// gameLoop();
