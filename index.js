import { generateElements, setValue } from "./functions.js";

const playButton = document.querySelector(".startGame");
const board = document.querySelector(".board");
const replayButton = document.querySelector(".replay");

playButton.addEventListener("click", () => {
    return generateElements();
})

board.addEventListener("click", (e) => {
    if (e.target.className === "element") {
        setValue(+e.target.dataset.x, +e.target.dataset.y, document.querySelector(".layersCounter").textContent.slice(30));
    }
})

replayButton.addEventListener("click", () => {
    return generateElements();
})


