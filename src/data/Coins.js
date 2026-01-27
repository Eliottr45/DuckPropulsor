export class Coins extends Objects {
  #coins;
  constructor() {
    super();
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
  }
}
