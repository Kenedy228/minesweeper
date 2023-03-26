import { generateElements, checkValue } from "./functions.js";

const inputValues = document.querySelector(".inputValues");
const board = document.querySelector(".board");

inputValues.addEventListener("submit", (e) => {
    e.preventDefault();

    const boardSize = document.querySelector(".boardSize").value;
    const minesCount = document.querySelector(".minesCount").value; 

    if (+boardSize && +minesCount) {
        if (minesCount < boardSize * boardSize) {
            return generateElements(boardSize, minesCount);
        } else {
            return alert("Введите значение бомб от 0 до размера вашего поля в квадрате");
        }
    } 


    return alert("Введенные значения должны быть цифрой");
})

board.addEventListener("click", (e) => {
    if (e.target.className === "element") {
        e.target.dataset.status = checkValue(e.target.dataset.x, e.target.dataset.y)[0];
        if (checkValue(e.target.dataset.x, e.target.dataset.y)[0] === "non_empty") {
            e.target.textContent = checkValue(e.target.dataset.x, e.target.dataset.y)[1];
        }
    }
})


