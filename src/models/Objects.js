export class Objects {
  constructor() {}

  // paramètres coord X et une coord Y
  hitBox() {
    throw new Error("La hitbox doit être défini dans la class de l'objet");
    //calcule du canvas pour faire la hitbox
  }

  // paramètres coord perso et coord de l'objet
  onCollide() {
    throw new Error(
      "La collision doit se calculer dans la fonciton affilé à l'objet",
    );

    // si le X du player === le X de l'object et le Y du player === le Y de l'object alors actions
    // définitions des zones de contact de bases dans le onCollides dans Objects et cas par cas dans les différentes class
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
