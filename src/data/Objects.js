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

  setPositionX(val) {
    this.#coordX = val;
  }

  setPositionY(val) {
    this.#coordY = val;
  }

  // Getter utile pour savoir où est l'objet
  getCoordX() {
    return this.#coordX;
  }

  getCoordY() {
    return this.#coordY;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
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
    // 1. Définir les bords de l'obstacle (this)
    const obstacleLeft = this.#coordX;
    const obstacleRight = this.#coordX + this.#width;
    const obstacleTop = this.#coordY;
    const obstacleBottom = this.#coordY + this.#height;

    // 2. Définir les bords du joueur (via ses getters/méthodes)
    const playerLeft = player.getCoordX();
    const playerRight = player.getEndCoordX();
    const playerTop = player.getCoordY();
    const playerBottom = player.getEndCoordY();

    // 3. Logique de collision AABB (Axis-Aligned Bounding Box)
    // On vérifie si les rectangles se chevauchent
    const isColliding =
      playerLeft < obstacleRight &&
      playerRight > obstacleLeft &&
      playerTop < obstacleBottom &&
      playerBottom > obstacleTop;

    return isColliding;
  }
}
