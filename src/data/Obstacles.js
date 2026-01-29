import { Objects } from "./Objects.js";

export class Obstacles extends Objects {
  constructor(coordX, coordY, width, height) {
    super(coordX, coordY, width, height);
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
    this.setPositionX(currentX);
    if (currentX + this.getWidth() < 0) {
      const temp = window.innerWidth * 2;
      const newX = this.getRandomNumber(window.innerWidth, temp);
      const canvasHeight = document.getElementById("game").height;
      const obstacleHeight = this.getHeight();

      const newY = this.getRandomNumber(0, canvasHeight - obstacleHeight);

      this.setPositionX(newX);
      this.setPositionY(newY);
    }
  }
}
// while (this.getCoordY + this.getHeight > window.innerHeight) {
//   this.setPositionY += 10;
// }
