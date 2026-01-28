export class Obstacles extends Objects {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // faire passer en paramètres une instance de la class player
  onCollide(player) {
    if (!player.isAlive) return false;

    // récupération des position du player a travers un tableau des données du player
    const playerBounds = player.getBounds();
    return (
      this.x <= playerBounds.endX &&
      this.x + this.width >= playerBounds.startX &&
      this.y <= playerBounds.endY &&
      this.y + this.height >= playerBounds.startY
    );
  }

  // faire passer en paramètres une instance de la class player
  update(player) {
    if (this.onCollide(player)) {
      this.action(player);
      return true;
    }
    return false;
  }

  // ajout d'une condition dans le main.js if(player.getAlive === false){end of game}
  action(player) {
    player.die();
  }
}
