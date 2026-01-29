import { Objects } from "./Objects.js";
export class Coins extends Objects {
  #collected;

  constructor(coordX, coordY, width, height) {
    super(coordX, coordY, width, height);
    this.#collected = false;
  }

  hitBox(ctx) {
    // On ne dessine rien pour les pièces
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.coordX, this.coordY, this.width, this.height);
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  destroy() {
    // On définit une nouvelle position aléatoire à droite
    const newX = window.innerWidth + this.getRandomNumber(100, 500);
    const newY = this.getRandomNumber(100, window.innerHeight - 100);

    // On utilise les méthodes de la classe Objects pour mettre à jour
    this.setPositionX(newX);
    this.setPositionY(newY);
  }
}
