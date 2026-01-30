import { Objects } from "./Objects.js";

export class Obstacles extends Objects {
  #startX;
  constructor(coordX, coordY, width, height) {
    super(coordX, coordY, width, height);
    this.#startX = coordX;
  }

  resetToDefault() {
    this.setPositionX(this.#startX);
  }

  hitBox(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.getCoordX(),
      this.getCoordY(),
      this.getWidth(),
      this.getHeight(),
    );
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

    const levelLength = 8000;

    if (currentX + this.getWidth() < 0) {
      this.setPositionX(currentX + levelLength);
    } else {
      this.setPositionX(currentX);
    }
  }
}
