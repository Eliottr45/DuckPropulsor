export class Obstacles extends Objects {
  constructor() {
    super();
  }

  onCollide() {}

  vivant() {
    // const response = this.onCollide(...)
    if (response === true) {
      console.log("Vous avez paerdus !");
    }
  }
}
