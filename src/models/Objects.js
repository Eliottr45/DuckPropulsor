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

  // paramètres coord X et une coord Y
  hitBox(ctx) {
    ctx.fillRect(this.#coordX, this.#coordY, this.#width, this.#height);
  }

  deplacement() {
    const speed = 100; // px par seconde
    const step = speed * (16 / 1000); // px par tick

    setInterval(() => {
      this.#coordX -= step;
    }, 16);
  }

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

  // paramètres url/chemin du sprite
  sprite() {
    throw new Error(
      "L'url du sprite doit être défini dans la class de l'objet",
    );
  }

  // paramètres coord X et Y de l'endroite ou l'on veut placer le sprite
  coordSprite() {
    throw new Error(
      "Lae coord sprite doit être défini dans la class de l'objet",
    );
  }
}
