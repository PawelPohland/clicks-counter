"use strict";

const MAX_COLOR_VALUE = 256; // RBG values [0, ..., 255]
const MAX_NUM_OF_TILES = 5;

// returns random color value denoted as a CSS rgb function
// example: "rgb(0,0,0)"
const getRandomColor = function () {
  let colorValues = [];
  for (let i = 0; i < 3; i++) {
    colorValues.push(Math.floor(Math.random() * MAX_COLOR_VALUE));
  }

  return `rgb(${colorValues.join(",")})`;
};

const squares = document.getElementById("squares");
const totalClicksEl = document.getElementById("totalClicks");

const addTiles = function (numOfTiles = 3) {
  numOfTiles = numOfTiles ?? 3;

  const allTiles = [];

  for (let i = 0; i < numOfTiles; i++) {
    const container = document.createElement("div");

    // tile element - a div that's going to be clicked by a user
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.backgroundColor = getRandomColor();

    // how many times was this tile clicked
    tile.timesClicked = 0;

    tile.addEventListener("click", (event) => {
      let div = event.target;
      div.nextElementSibling.textContent = ++div.timesClicked;

      let totalClicks = Array.from(tiles).reduce(
        (total, elem) => total + Number(elem.timesClicked),
        0
      );

      if (totalClicksEl.hasOwnProperty("totalClicks")) {
        totalClicksEl.totalClicks++;
      } else {
        totalClicksEl.totalClicks = 1;
      }

      totalClicksEl.textContent = `${totalClicksEl.totalClicks} (${totalClicks})`;
    });

    container.appendChild(tile);
    allTiles.push(tile);

    // a paragraph to display how many times this tile was clicked
    let paragraph = document.createElement("p");
    paragraph.textContent = 0;

    container.appendChild(paragraph);

    squares.appendChild(container);
  }

  return allTiles;
};

const resetButton = document.getElementById("reset");
let tiles = addTiles(MAX_NUM_OF_TILES);

resetButton.addEventListener("click", () => {
  totalClicksEl.totalClicks = totalClicksEl.textContent = 0;

  while (squares.lastChild) {
    squares.removeChild(squares.lastChild);
  }

  tiles = addTiles(MAX_NUM_OF_TILES);
});
