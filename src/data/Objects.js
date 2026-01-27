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
  sprite() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    hitBox(ctx);
  }

  //déplacement de la hitbox
  deplacement() {
    const speed = 100; // px par seconde
    const step = speed * (16 / 1000); // px par tick

    setInterval(() => {
      this.#coordX -= step;
    }, 16);
  }

  //insertion de l'asset dans la hitbox

  inserthitbox(pathimage, ctx) {
    const coordXend = this.#coordX + this.#width;
    const coordYend = this.#coordY + this.#height;

    coordXimage = this.#coordX + coordXend / 2;
    coordYimage = this.#coordY + coordYend / 2;

    ctx.drawImage(
      pathimage,
      coordXimage,
      coordYimage,
      this.#width,
      this.#height,
    );
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
