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

    // --- RÉGLAGES TYPE JETPACK JOYRIDE ---

    // 1. GRAVITÉ (Lourdeur)
    // Plus ce chiffre est haut, plus le perso tombe vite.
    // 0.8 est assez "lourd", ça donne un effet arcade nerveux.
    const gravity = 0.3;

    // 2. PUISSANCE (Poussée)
    // Doit être supérieure à la gravité pour monter.
    // L'astuce : Environ 2x la gravité est un bon point de départ.
    // Ici : 1.5 - 0.8 = 0.7 de force réelle vers le haut.
    const jetpackPower = 0.8;

    // 3. VITESSE MAX (Terminal Velocity)
    // On tombe plus vite qu'on ne monte (c'est souvent le cas dans les jeux).
    const maxFallSpeed = 3;
    const maxRiseSpeed = -3; // Négatif car on monte

    // --- LOGIQUE PHYSIQUE ---

    // A. On applique d'abord la gravité (Toujours active)
    this.#velocity += gravity;

    // B. On applique le Jetpack (Si on appuie)
    if (this.pressedSpace) {
      // On soustrait la puissance (pour aller vers le haut)
      this.#velocity -= jetpackPower;
    }

    // C. On borne la vitesse (Clamping) pour éviter les excès
    if (this.#velocity > maxFallSpeed) this.#velocity = maxFallSpeed;
    if (this.#velocity < maxRiseSpeed) this.#velocity = maxRiseSpeed;

    // D. On bouge
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
    console.log("Le joueur est mort !");
  }

  _initFly() {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        event.preventDefault();
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
}
