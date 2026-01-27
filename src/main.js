import "./style.css";

// * Création du carousel
const body = document.body;

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
