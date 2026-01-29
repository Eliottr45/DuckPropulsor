export function init(container) {
  createElements(container);
  attachEvent();
}

function createElements(container) {
  // ! Création du homePage
  const sectionHomePage = document.createElement("section");
  sectionHomePage.setAttribute("id", "home-page");

  const titleHomePage = document.createElement("h1");
  titleHomePage.textContent = "DuckPropulsor";

  const divFlex = document.createElement("div");
  divFlex.classList.add("flex");

  const buttonPlay = document.createElement("button");
  buttonPlay.setAttribute("id", "play");
  buttonPlay.textContent = "Jouer";

  const buttonSkin = document.createElement("button");
  buttonSkin.setAttribute("id", "skin");
  buttonSkin.textContent = "Skins";

  const buttonSetting = document.createElement("button");
  buttonSetting.setAttribute("id", "setting");
  buttonSetting.textContent = "Paramètres";

  divFlex.append(buttonPlay, buttonSkin, buttonSetting);
  sectionHomePage.append(titleHomePage, divFlex);
  container.append(sectionHomePage);

  // ! Création de la page de jeu
  const homePage = document.createElement("section");
  homePage.setAttribute("id", "play-page");
  homePage.style.display = "none";

  const compteurdiv = document.createElement("div");
  compteurdiv.classList.add("counter");
  const compteurp = document.createElement("p");
  compteurp.setAttribute("id", "compteur-coins");

  const scoreDiv = document.createElement("div");
  scoreDiv.classList.add("score");
  const scorep = document.createElement("p");
  scorep.setAttribute("id", "score-coins");

  const divTrack = document.createElement("div");
  divTrack.classList.add("track");

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", "./src/assets/test.jpg");

  const card2 = document.createElement("div");
  card2.classList.add("card");

  const img2 = document.createElement("img");
  img2.setAttribute("src", "./src/assets/test.jpg");

  card2.append(img2);
  card.append(img);
  divTrack.append(card);
  divTrack.append(card2);
  compteurdiv.append(compteurp);
  scoreDiv.append(scorep);
  homePage.append(compteurdiv, scoreDiv, divTrack);
  container.append(homePage);

  // ! Création de skinPage
  const btnBackSkin = document.createElement("button");
  btnBackSkin.setAttribute("id", "btn-back-skin");
  btnBackSkin.textContent = "Back";

  const sectionSkinPage = document.createElement("section");
  sectionSkinPage.setAttribute("id", "skin-page");
  sectionSkinPage.style.display = "none";

  const titleSkinPage = document.createElement("h2");
  titleSkinPage.textContent = "Page des skins";

  sectionSkinPage.append(btnBackSkin, titleSkinPage);
  container.append(sectionSkinPage);

  // ! Création de SettingPage
  const btnBackSetting = document.createElement("button");
  btnBackSetting.setAttribute("id", "btn-back-setting");
  btnBackSetting.textContent = "Back";

  const sectionSettingPage = document.createElement("section");
  sectionSettingPage.setAttribute("id", "setting-page");
  sectionSettingPage.style.display = "none";

  const titleSettingPage = document.createElement("h2");
  titleSettingPage.textContent = "Page des settings";

  sectionSettingPage.append(btnBackSetting, titleSettingPage);
  container.append(sectionSettingPage);

  // ! Création du setInterval
  const track = document.querySelector(".track");
  track.innerHTML += track.innerHTML;

  let position = 0;
  const speed = 285; // Pixels par seconde
  let lastTimestamp = 0;

  function animate(timestamp) {
    // Calcul du temps écoulé entre deux frames (delta time)
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = (timestamp - lastTimestamp) / 1000; // en secondes
    lastTimestamp = timestamp;
    // Mise à jour de la position basée sur le temps réel
    position -= speed * deltaTime;
    // Réinitialisation si on a défilé la moitié du contenu
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    // On demande la frame suivante
    requestAnimationFrame(animate);
  }
  // Lancement de l'animation
  requestAnimationFrame(animate);
}

//créer une div et un p dans le body
//append  div et p
//créer la variable compteur en la faisant commencer par 0
//insérer un texte initial dans le p avec compteur en variable pour le score
//faire en sorte qu'à la collision entre player et la pièce ça ajoute 1 au compteur

function attachEvent() {
  const buttonPlay = document.getElementById("play");
  const homePage = document.getElementById("home-page");
  const play = document.getElementById("play-page");
  const canva = document.getElementById("game");
  buttonPlay.addEventListener("click", () => {
    homePage.style.display = "none";
    play.style.display = "block";
    game.style.display = "block";
  });

  const buttonSkin = document.getElementById("skin");
  const skin = document.getElementById("skin-page");
  buttonSkin.addEventListener("click", () => {
    homePage.style.display = "none";
    skin.style.display = "block";
  });

  const buttonSetting = document.getElementById("setting");
  const setting = document.getElementById("setting-page");
  buttonSetting.addEventListener("click", () => {
    homePage.style.display = "none";
    setting.style.display = "block";
  });

  const buttonBackSkin = document.getElementById("btn-back-skin");
  buttonBackSkin.addEventListener("click", () => {
    homePage.style.display = "block";
    skin.style.display = "none";
  });

  const buttonBackSetting = document.getElementById("btn-back-setting");
  buttonBackSetting.addEventListener("click", () => {
    homePage.style.display = "block";
    setting.style.display = "none";
  });
}
