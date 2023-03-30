const boardSize = 10;
const minesCount = 10;

const statusValues = {
    default: "default",
    mine: "mine",
    layer: "layer",
}

function generateElements() {

    let boardElements = [];
    let layersCounter = (boardSize ** 2) - minesCount;

    for (let x = 0; x < boardSize; x++) {
        boardElements.push([]);
        for (let y = 0; y < boardSize; y++) {
            const element = {
                x,
                y,
                mine: false,
                status: statusValues.default,
            }

            boardElements[x].push(element);
        }
    }

    document.querySelector(".layersCounter").textContent = `Количество свободных клеток: ${layersCounter}`;
    document.querySelector(".minesCounter").textContent = `Количество мин: ${minesCount}`;

    generateMines(boardElements);
    generateBoard(boardElements);

}

function generateMines(boardElements) {
    for (let i = 0; i < minesCount; i++) {
        const minePosition = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}

        if (boardElements?.[minePosition.x]?.[minePosition.y]) {
            let element = boardElements[minePosition.x][minePosition.y];
            !element.mine ? element.mine = true : i--;
        }
    }
}

function generateBoard(boardElements) {
    const board = document.querySelector(".board");

    board.innerHTML = "";
    board.style.setProperty("--size", String(boardSize));

    boardElements.forEach(array => {
        array.forEach(element => {
            board.insertAdjacentHTML("beforeend", `<div class="element" data-status=${element.status} data-x=${element.x} data-y=${element.y}>${element.text || ""}</div>`);
        })
    })
}

function checkNearbyValues(currentElement) {
    const [x, y] = [currentElement.x, currentElement.y];
    let nearbyValues = [];

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (boardElements?.[x + i]?.[y + j]) nearbyValues.push(boardElements[x + i][y + j]);
        }
    }

    return nearbyValues;
}

function setValue(x, y, layersCounter) {
    const currentElement = boardElements[x][y];
    document.querySelector(".layersCounter").textContent = `Количество свободных клеток: ${layersCounter}`;

    if (currentElement.status === statusValues.default) {
        if (currentElement.mine) {
            currentElement.status = statusValues.mine;
            return generateBoard();
            // return finishGame(currentElement.status);
        } else currentElement.status = statusValues.layer;
    } else return;

    let adjacentLayers = checkNearbyValues(currentElement);
    let mines = adjacentLayers.filter(element => element.mine);

    if (mines.length === 0) {
        layersCounter--;
        adjacentLayers.forEach(elem => setValue(+elem.x, +elem.y));
    } else {
        currentElement.text = mines.length;
        layersCounter--;
        if (layersCounter === 0) return finishGame();
        return generateBoard();
    }

}

function finishGame(mine = "") {
    if (mine) {
        document.querySelector(".gameOver").textContent = "Ты нажал на мину, получается проиграл АХАХХАХАХАХАХА";
    } else {
        document.querySelector(".gameOver").textContent = "Ты выиграл, абалдеть паздравляю";
    }
    document.querySelector(".replay").style.setProperty("display", "block");
}


export {generateElements, setValue};