import { Objects } from "./Objects.js";

export class Obstacles extends Objects {
  #startX;
  constructor(coordX, coordY, width, height) {
    super(coordX, coordY, width, height);
    this.#startX = this.coordX;
  }

  update(player) {
    if (!player.getAlive()) return false;

    if (this.onCollide(player)) {
      this.action(player);
      return true;
    }
    return false;
  }

  action(player) {
    player.die();
  }

  moveLeft(speed) {
    let currentX = this.getCoordX();
    currentX -= speed;

    const levelLength = 7500;

    if (currentX + this.getWidth() < 0) {
      this.setPositionX(currentX + levelLength);
    } else {
      this.setPositionX(currentX);
    }
  }
}
