export class Objects {
  #coordX;
  #coordY;
  #width;
  #height;

  constructor(coordX, coordY, width, height) {
    this.#coordX = coordX;
    this.#coordY = coordY;
    this.#width = width;
    this.#height = height;
  }

  setPostionX(coordX) {
    this.#coordX = coordX;
  }

  setPostionY(coordY) {
    this.#coordY = coordY;
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  moveLeft(speed) {
    this.#coordX -= speed;
    if (this.#coordX + this.#width < 0) {
      // this.#coordY = 300;
      const temp = window.innerWidth * 2;
      this.#coordX = this.getRandomNumber(window.innerWidth, temp);
      this.#coordY = this.getRandomNumber(100, window.innerHeight) - 100;
    }
  }

  // création de la hitbox
  hitBox(ctx) {
    ctx.fillRect(this.#coordX, this.#coordY, this.#width, this.#height);
  }

  insertasset(pathimage, ctx) {
    ctx.drawImage(
      pathimage,
      this.#coordX,
      this.#coordY,
      this.#width,
      this.#height,
    );
  }

  //déplacement de la hitbox
  deplacement(classObjet) {
    const track = document.querySelector(`.${classObjet}`);
    track.innerHTML += track.innerHTML;

    let position = this.#coordX;
    const speed = 200; // Pixels par seconde
    let lastTimestamp = 0;

    function animate(timestamp) {
      // Calcul du temps écoulé entre deux frames (delta time)
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = (timestamp - lastTimestamp) / 1000; // en secondes
      lastTimestamp = timestamp;
      // Mise à jour de la position basée sur le temps réel
      position -= speed * deltaTime;
      // Réinitialisation si on a défilé la moitié du contenu
      if (Math.abs(position) >= track.scrollWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      // On demande la frame suivante
      requestAnimationFrame(animate);
    }
    // Lancement de l'animation
    requestAnimationFrame(animate);
  }

  //collision de la hitbox
  // On passe directement l'instance de la classe Player (player)
  onCollide(player) {
    // instance de la class player
    const endX = this.#coordX + this.#width;
    const endY = this.#coordY + this.#height;
    const playerX = player.getCoordX();
    const playerY = player.getCoordY();
    const playerEndX = player.getEndCoordX();
    const playerEndY = player.getEndCoordY();
    if (
      playerX <= endX &&
      playerEndX >= this.#coordX &&
      playerEndY >= this.#coordY &&
      playerY <= endY
    ) {
      return true;
    }
    return false;
  }
}
