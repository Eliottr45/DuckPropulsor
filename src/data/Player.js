// création d'une classe
export class PLayer {
  #coordX;
  #coordY;
  #width;
  #height;
  #alive;

  constructor(coordX, coordY, width, height) {
    this.#coordX = coordX;
    this.#coordY = coordY;
    this.#width = width;
    this.#height = height;
    this.pressedSpace = false;
    this.#alive = true;
    this._initFly();
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

  getAlive() {
    return this.#alive;
  }

  die() {
    this.#alive = false;
    console.log("Le joueur est mort !");
  }

  _initFly() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.pressedSpace = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
        this.pressedSpace = false;
      }
    });
  }

  // Dans le main.js faire en sorte de mettre des + ou - une valeurs pour Y avec de l'inertie
  isFlying() {
    return this.pressedSpace;
  }

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
