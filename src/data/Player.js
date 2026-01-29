// création d'une classe
export class Player {
  #coordX;
  #coordY;
  #width;
  #height;
  #alive;
  #velocity;

  constructor(coordX, coordY, width, height) {
    this.#coordX = coordX;
    this.#coordY = coordY;
    this.#width = width;
    this.#height = height;
    this.pressedSpace = false;
    this.#alive = true;
    this.#velocity = 0;
    this._initFly();
  }

  getCoordX() {
    return this.#coordX;
  }

  getCoordY() {
    return this.#coordY;
  }

  getAlive() {
    return this.#alive;
  }

  // player.js
  getEndCoordX() {
    return this.#coordX + this.#width; // Calculer en direct
  }

  getEndCoordY() {
    return this.#coordY + this.#height; // Calculer en direct
  }

  update() {
    if (!this.#alive) return;

    const gravity = 0.15;

    const jetpackPower = 0.5;

    const maxFallSpeed = 2;
    const maxRiseSpeed = -3;

    this.#velocity += gravity;

    if (this.pressedSpace) {
      this.#velocity -= jetpackPower;
    }

    if (this.#velocity > maxFallSpeed) this.#velocity = maxFallSpeed;
    if (this.#velocity < maxRiseSpeed) this.#velocity = maxRiseSpeed;

    this.#coordY += this.#velocity;

    if (this.#coordY < 0) {
      this.#coordY = 0;
      this.#velocity = 0;
    }

    const gameHeight = document.getElementById("game").height;
    if (this.#coordY + this.#height > gameHeight) {
      this.#coordY = gameHeight - this.#height;
      this.#velocity = 0;
    }
  }

  // fonction qui permet de récupérer les données de player sous forme de tableau
  // Dans Player.js
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
    const dieSound = new Audio("./src/assets/dieDuck.mp3");
    dieSound.preload = "auto";
    dieSound.currentTime = 0;
    dieSound.play().catch((e) => console.error("Lecture bloquée :", e));
    console.log("Le joueur est mort !");
  }

  _initFly() {
    const flySound = new Audio("./src/assets/flySound.mp3");
    flySound.preload = "auto";

    const jumpAction = () => {
      // On récupère la page de jeu
      const playPage = document.getElementById("play-page");

      // On vérifie si la page de jeu est affichée
      // (Si elle n'est pas en "none", c'est qu'on joue)
      const isPlaying = playPage && playPage.style.display !== "none";

      if (!this.pressedSpace && isPlaying) {
        this.pressedSpace = true;
        flySound.currentTime = 0;
        flySound.play().catch((e) => console.log("Audio en attente"));
        console.log("Propulsion !");
      }
    };

    const stopAction = () => {
      this.pressedSpace = false;
    };

    // 1. CLAVIER
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        jumpAction();
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.code === "Space") stopAction();
    });

    // 2. TACTILE & SOURIS (Pointer Events)
    // 'pointerdown' détecte le clic gauche ET le premier doigt posé
    document.addEventListener("pointerdown", (e) => {
      // On vérifie que c'est bien le bouton principal (gauche ou doigt)
      if (e.isPrimary) {
        jumpAction();
      }
    });

    document.addEventListener("pointerup", (e) => {
      if (e.isPrimary) stopAction();
    });
  }

  // Dans le main.js faire en sorte de mettre des + ou - une valeurs pour Y avec de l'inertie
  isFlying() {
    return this.pressedSpace;
  }

  hitBox(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.#coordX, this.#coordY, this.#width, this.#height);
  }

  sprite() {
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    hitBox(ctx);
  }

  insertPlayerImg(pathimage, ctx) {
    ctx.drawImage(
      pathimage,
      this.#coordX,
      this.#coordY,
      this.#width,
      this.#height,
    );
  }

  reset(startX, startY) {
    this.#coordX = startX;
    this.#coordY = startY;
    this.#alive = true;
    this.#velocity = 0;
    this.pressedSpace = false;
  }
}
