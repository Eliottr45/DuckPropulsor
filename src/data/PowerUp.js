export class PowerUp extends Objects {
  constructor(x, y, width, height, power) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.power = null;
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

  action() {
    if (this.power === "invicible") {
      // bouclier qui protège contre les obstacles
    }
    if (this.power === "aimant") {
      // attire toute les piéces environnante vers le player
    }
    if (this.power === "noObstacles") {
      // stopper l'apparition des obstacles
    }
    if (this.power === "boost") {
      //incrémentation rapide du score plus effet de de distorsion pour mimer le boost
    }
  }
}
