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

  // ! a terminer !
  destroy(player) {
    if (this.onCollide(player)) {
      // this.#coordY = 300;
      const temp = window.innerWidth * 2;
      const x = this.getRandomNumber(window.innerWidth, temp);
      const y = this.getRandomNumber(100, window.innerHeight) - 100;
      this.setPositionX(x);
      this.setPositionY(y);
    }
  }
}
