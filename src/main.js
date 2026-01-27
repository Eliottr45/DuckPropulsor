import "./style.css";

const body = document.body;

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
body.append(sectionHomePage);

// ! Création de la page de jeu
// const carousel = document.createElement("div");
// carousel.classList.add("carousel");
// const carouselQuery = document.querySelector(".carousel");
// carouselQuery.style.display = "none";

// const divTrack = document.createElement("div");
// divTrack.classList.add("track");

// const card = document.createElement("div");
// card.classList.add("card");

// const img = document.createElement("img");
// img.setAttribute("src", "./src/assets/bg.png");

// const card2 = document.createElement("div");
// card2.classList.add("card");

// const img2 = document.createElement("img");
// img2.setAttribute("src", "./src/assets/bg.png");

// card2.append(img2);
// card.append(img);
// divTrack.append(card);
// carousel.append(divTrack);
// body.append(carousel);

// ! Création de skinPage
// const sectionSkinPage = document.createElement("section");
// sectionSkinPage.setAttribute("id", "skin-page");
// const skinPageQuery = document.getElementById("skin-page");
// skinPageQuery.style.display = "none";

// const titleSkinPage = document.createElement("h2");
// titleSkinPage.textContent = "Page des skins";

// sectionSkinPage.append(titleSkinPage);
// body.append(sectionSkinPage);

// ! Création de SettingPage
// const sectionSettingPage = document.createElement("section");
// sectionSettingPage.setAttribute("id", "setting-page");
// const settingPageQuery = document.getElementById("setting-page");
// settingPageQuery.style.display = "none";

// const titleSettingPage = document.createElement("h2");
// titleSettingPage.textContent = "Page des settings";

// sectionSettingPage.append(titleSettingPage);
// body.append(sectionSettingPage);

// * Création du setInterval
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
