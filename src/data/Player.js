// création d'une classe
export class PLayer {
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

  // fonction qui permet de récupérer les données de player sous forme de tableau
  getBounds() {
    return {
      startX: this.#coordX,
      startY: this.#coordY,
      endX: this.#coordX + this.#width,
      endY: this.#coordY + this.#height,
    };
  }

  updateY() {} //function qui update les deplacement verticale fontion appelé dans le callback du click d'espace

  hitBox(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.#coordX, this.#coordY, this.#width, this.#height);
  }
  sprite() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    hitBox(ctx);
  }
}
