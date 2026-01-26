export class Coins extends Objects {
  constructor() {
    super();
  }

  // onCollide(coinX, coinY, coinW, coinH, persoX, persoY, persoW, persoH) {
  //   const xEndPerso = persoX + persoW;
  //   const yEndPerso = persoY + persoH;
  //   const xEndCoin = coinX + coinW;
  //   const yEndCoin = coinY + coinH;
  //   if (
  //     persoX <= xEndCoin &&
  //     xEndPerso >= coinX &&
  //     yEndPerso >= coinY &&
  //     persoY <= yEndCoin
  //   ) {
  //     return true; // OUI, il y a contact
  //   }
  //   return false;
  // }

  onCollide(persoHitbox) {
    //persoHitbox = {persoX: 50, persoY: 50, endPersoX: 100 --> startX + width, endPersoY: 100 --> startY + height}
    const endX = this.coordX + this.width;
    const endY = this.coordY + this.height;
    if (
      persoHitbox.persoX < endX &&
      persoHitbox.endPersoX > this.coordX &&
      persoHitbox.endPersoY > this.coordY &&
      persoHitbox.persoY < endY
    ) {
      return true;
    }
    return false;
  }
}
