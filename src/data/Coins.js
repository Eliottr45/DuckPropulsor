import { Objects } from "./Objects.js";
export class Coins extends Objects {
  #coins;
  #collected;

  constructor(coordX, coordY, width, height) {
    super(coordX, coordY, width, height);
    this.#coins = 0;
    this.#collected = false;
  }

  getCoin() {
    return this.#coins;
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
