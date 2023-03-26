const statusValues = {
    default: "default",
    mine: "mine",
    empty: "empty",
    non_empty: "non_empty",
}

const boardElements = [];
const board = document.querySelector(".board");

function generateElements(boardSize, minesCount) {

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

    console.log(boardElements);

    generateMines(minesCount, boardSize, boardElements);

    generateBoard(boardSize);

}

function generateMines(minesCount, boardSize, boardElements) {
    for (let i = 0; i < minesCount; i++) {
        const minePosition = {x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}

        if (boardElements?.[minePosition.x]?.[minePosition.y]) {
            if (!boardElements[minePosition.x][minePosition.y].mine) {
                boardElements[minePosition.x][minePosition.y].mine = true;
            }
        }
    }
}

function generateBoard(boardSize) {
    board.innerHTML = "";

    board.style.setProperty("--size", boardSize);

    boardElements.forEach(array => {
        array.forEach(element => {
            board.insertAdjacentHTML("beforeend", `<div class="element" data-status=${element.status} data-x=${element.x} data-y=${element.y}></div>`);
        })
    })
}

function checkValue(x, y) {
    const currentElement = boardElements[x][y];
    let counter = 0;
    
    if (currentElement.mine) {
        currentElement.status = statusValues.mine;
        return [currentElement.status];
    } else {
        let nearbyValues = checkNearbyValues(currentElement.x, currentElement.y);

        const mines = nearbyValues.filter(element => {
            return element.mine;
        })

        if (mines.length === 0) {
            currentElement.status = statusValues.empty;
            mines.forEach(elem => checkNearbyValues(elem));
            return [currentElement.status];
        } else {
            currentElement.status = statusValues.non_empty;
            return [currentElement.status, mines.length];
        }
    }
    
}

function checkNearbyValues(x, y) {
    let list = [];

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (boardElements?.[+x + i]?.[+y + j]) {
                list.push(boardElements[+x + i][+y + j]);
            }
        }
    }

    return list;
}


export {generateElements, checkValue};