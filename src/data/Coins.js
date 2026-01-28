import { Objects } from "./Objects.js";
export class Coins extends Objects {
  #coins;

  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.#coins = 0;
  }

  getCoin() {
    return this.#coins;
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  update(player, compteurp, speed) {
    if (this.onCollide(player)) {
      this.#coins += 1;
      let score = `"Score coins:"${this.#coins}`;
      compteurp.textContent = score;
      moveLeft(speed);
    }
  }
}
