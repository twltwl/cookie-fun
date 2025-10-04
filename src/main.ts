import "./style.css";
import cookieUrl from "./cookie.png";

const gameWidth = 800;
const gameHeight = 600;
const cookieSize = 50;
let isLocked = false;

const gameContainer = document.querySelector("#cookie-wrapper");
const nukeBtn = document.querySelector("#nuke");
const addCookieBtn = document.querySelector("#addCookie");

let nCookies = 0;
let gameCounter = 0;

const spawnCookie = () => {
  if (nCookies > 100 || isLocked) {
    return;
  }
  const cEl = document.createElement("img");
  cEl.src = cookieUrl;
  cEl.classList.add("cookie");

  cEl.addEventListener("click", () => {
    gameCounter++;
    updateScore();
    gameContainer?.removeChild(cEl);
    nCookies -= 1;
  });

  const xRand = Math.floor(Math.random() * 800);
  cEl.style.left = `${Math.min(gameWidth - 50, xRand)}px`;

  gameContainer?.appendChild(cEl);
  nCookies += 1;
};

const updateScore = () => {
  const score = Math.max(0, gameCounter);
  document.querySelector("#score")!.textContent = `${score}`;
};

const init = () => {
  setInterval(() => {
    spawnCookie();
  }, 1000);

  setInterval(() => {
    const cookies = document.querySelectorAll<HTMLElement>(".cookie");

    cookies.forEach((cookie) => {
      const y = cookie.offsetTop;
      if (y > gameHeight - cookieSize) {
        gameCounter--;
        gameContainer?.removeChild(cookie);
        nCookies -= 1;
        updateScore();
      } else {
        cookie.style.top = y + 5 + "px";
      }
    });
  }, 200);
};

init();

nukeBtn?.addEventListener("click", () => {
  isLocked = true;
  let t: any;
  gameContainer?.classList.add("nuke");
  const cookies = document.querySelectorAll<HTMLElement>(".cookie");

  cookies.forEach((cookie) => {
    gameContainer?.removeChild(cookie);
  });

  gameCounter += cookies.length;
  updateScore();

  t = setTimeout(() => {
    gameContainer?.classList.remove("nuke");
    clearTimeout(t);
    isLocked = false;
  }, 2000);
});

addCookieBtn?.addEventListener("click", spawnCookie);
