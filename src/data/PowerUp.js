export class PowerUp extends Objects {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  onCollide(player) {
    return (
      this.x <= player.x + player.width &&
      this.x + this.width >= player.x &&
      this.y <= player.y + player.height &&
      this.y + this.height >= player.y
    );
  }

  update(player) {
    if (this.onCollide(player)) {
      this.action(player);
      return true;
    }
    return false;
  }
}
