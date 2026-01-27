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

  //affichage de la hitbox dans le canvas
  spritehitbox() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    hitBox(ctx);
  }

  spriteasset() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    insertasset(ctx);
  }

  //déplacement de la hitbox
  deplacement() {
    const track = document.querySelector(".track");
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
  onCollide(persoHitbox) {
    //persoHitbox = {persoX: 50, persoY: 50, endPersoX: 100 --> startX + width, endPersoY: 100 --> startY + height}
    const endX = this.#coordX + this.#width;
    const endY = this.#coordY + this.#height;
    if (
      persoHitbox.persoX < endX &&
      persoHitbox.endPersoX > this.#coordX &&
      persoHitbox.endPersoY > this.#coordY &&
      persoHitbox.persoY < endY
    ) {
      return true;
    }
    return false;
  }
}
