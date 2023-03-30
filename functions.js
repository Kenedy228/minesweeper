const boardSize = 10;
const minesCount = 10;

let boardElements = [];

const statusValues = {
    default: "default",
    mine: "mine",
    layer: "layer",
}

function generateElements() {

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

    document.querySelector(".minesCounter").textContent = `Количество мин: ${minesCount}`;

    generateMines();
    generateBoard();

}

function generateMines() {
    for (let i = 0; i < minesCount; i++) {
        const minePosition = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}

        if (boardElements?.[minePosition.x]?.[minePosition.y]) {
            let element = boardElements[minePosition.x][minePosition.y];
            !element.mine ? element.mine = true : i--;
        }
    }
}

function generateBoard() {
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

function setValue(x, y) {
    const currentElement = boardElements[x][y];

    console.log(boardElements);
    let filtered = [];
    
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            
            filtered.push(boardElements[i][j]);
        }
    }

    if (filtered.length === 0)

    if (currentElement.status === statusValues.default) {
        if (currentElement.mine) {
            currentElement.status = statusValues.mine;
            return generateBoard();
            // return finishGame("lose");
        } else currentElement.status = statusValues.layer;
    } else return;

    let adjacentLayers = checkNearbyValues(currentElement);
    let mines = adjacentLayers.filter(element => element.mine);

    if (mines.length === 0) {
        adjacentLayers.forEach(elem => setValue(+elem.x, +elem.y));
    } else {
        currentElement.text = mines.length;
        return generateBoard();
    }
}

function finishGame(status) {
    if (status === "lose") {
        document.querySelector(".gameOver").textContent = "Ты нажал на мину, получается проиграл АХАХХАХАХАХАХА";
    } else if (status === 'win') {
        document.querySelector(".gameOver").textContent = "Ты выиграл, абалдеть паздравляю";
    }
    document.querySelector(".replay").style.setProperty("display", "block");
    boardElements = [];
}


export {generateElements, setValue};