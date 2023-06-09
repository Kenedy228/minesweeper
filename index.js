import { generateElements, setValue } from "./functions.js";

const playButton = document.querySelector(".startGame");
const board = document.querySelector(".board");
const replayButton = document.querySelector(".replay");

playButton.addEventListener("click", () => {
    document.querySelector(".startGame").style.display = "none";
    return generateElements();
})

board.addEventListener("click", (e) => {
    if (e.target.className === "element") {
        setValue(+e.target.dataset.x, +e.target.dataset.y);
    }
})

replayButton.addEventListener("click", () => {
    document.querySelector(".gameOver").style.display = "none";
    document.querySelector(".replay").style.display = "none";
    return generateElements();
})


