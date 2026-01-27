import "./style.css";

// * Création du body
const body = document.body;

const sectionHomePage = document.createElement("section");
sectionHomePage.setAttribute("id", "home-page");

const title = document.createElement("h1");
title.textContent("DuckPropulsor");

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
sectionHomePage.append(title, divFlex);
body.append(sectionHomePage);

// * Création du carousel
// const carousel = document.createElement("div");
// carousel.classList.add("carousel");

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
