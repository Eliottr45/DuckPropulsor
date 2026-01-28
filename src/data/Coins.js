import { Objects } from "./Objects.js";
export class Coins extends Objects {
  #coins;
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.coins = 0;
  }

  update(player) {
    if (this.onCollide(player)) {
      this.action(player);
      return true;
    }
    return false;
  }

  action(player) {
    this.coins += 1;
    console.log("Coin ramassée ! Total : " + this.coins);
  }
}
