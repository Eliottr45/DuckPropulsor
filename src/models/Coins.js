export class Coins {
  constructor() {
    super();
  }

  getCanvas(){
    const canvas = document.getElementById("game");
    if (!canvas){
      throw new Error ("Canvas introuvable")
    }
    return canvas
  }

  getContext(){
    // const ctx 
  }
}
