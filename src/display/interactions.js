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
  const carousel = document.createElement("div");
  carousel.classList.add("carousel");
  carousel.style.display = "none";

  const divTrack = document.createElement("div");
  divTrack.classList.add("track");

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.setAttribute("src", "./src/assets/bg.png");

  const card2 = document.createElement("div");
  card2.classList.add("card");

  const img2 = document.createElement("img");
  img2.setAttribute("src", "./src/assets/bg.png");

  card2.append(img2);
  card.append(img);
  divTrack.append(card);
  divTrack.append(card2);
  carousel.append(divTrack);
  container.append(carousel);

  // ! Création de skinPage
  const sectionSkinPage = document.createElement("section");
  sectionSkinPage.setAttribute("id", "skin-page");
  sectionSkinPage.style.display = "none";

  const titleSkinPage = document.createElement("h2");
  titleSkinPage.textContent = "Page des skins";

  sectionSkinPage.append(titleSkinPage);
  container.append(sectionSkinPage);

  // ! Création de SettingPage
  const sectionSettingPage = document.createElement("section");
  sectionSettingPage.setAttribute("id", "setting-page");
  sectionSettingPage.style.display = "none";

  const titleSettingPage = document.createElement("h2");
  titleSettingPage.textContent = "Page des settings";

  sectionSettingPage.append(titleSettingPage);
  container.append(sectionSettingPage);

  // ! Création du setInterval
  const track = document.querySelector(".track");
  track.innerHTML += track.innerHTML;

  let position = 0;
  const speed = 400;
  const step = speed * (8 / 1000);

  setInterval(() => {
    position -= step;
    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
  }, 8);
}
