/*
etch a sketch

1. use javascript to build an 16 by 16 grid of div squares (class: "square")
2. for each square in the grid, add an event listener for the hover effect with a callback function of highlight
3. the highlight function adds a class "highlight" that changes the background color of the square
4. create a reset button that removes the "highlight" class for each block
*/

let gridSize = 16;
function buildInterface() {
    //creates a button that allows the user to reset the grid when the button is clicked
    const resetButton = document.querySelector('#reset');
    resetButton.addEventListener('click', resetGrid);

    //creates a button that allows the user to change the grid size based on the user's input
    const changeButton = document.querySelector('#change');
    changeButton.addEventListener('click', changeGridSize);
}

function buildGrid(numberOfBlocks) {
    gridSize = numberOfBlocks;
    //sets up the grid dimensions based on the number of blocks
    const container = document.querySelector(".container");
    container.setAttribute('style', `grid-template-columns: repeat(${numberOfBlocks}, 1fr);`);
    let blocks = [];
    for (let i = 0; i < Math.pow(numberOfBlocks,2); i++) {
        blocks[i] = document.createElement('div');
        blocks[i].setAttribute('class', 'square');
        blocks[i].setAttribute('style', `width: ${container.width / numberOfBlocks}px; height: ${container.width / numberOfBlocks}px; background-color: white`);
    }
    for (let block of blocks) {
        container.appendChild(block);
    }
    for (let block of blocks) {
        block.addEventListener('mouseover', () => {
            let blockStyle = block.getAttribute('style');
            if (blockStyle.includes("background-color: white")) {
                block.setAttribute('style', `background-color: ${randomHSL()}`);
            }
            else {
                block.setAttribute('style', darkerHSL(blockStyle));
            }
        });
    }
}

function deleteGrid() {
    const container = document.querySelector('.container');
    const blocks = document.querySelectorAll('.square');
    blocks.forEach( (block) => {
        block.remove();
    });
}

function resetGrid() {
    deleteGrid();
    buildGrid(gridSize);
}

function changeGridSize() {
    let newGridSize = prompt("Enter your new grid size: ");
    deleteGrid();
    buildGrid(newGridSize);
}
buildInterface();
buildGrid(gridSize);

function randomHSL() {
    const h = randomBetween(0, 360);
    const s = randomBetween(0, 100);
    const l = randomBetween(0, 100);
    return `hsl(${h},${s}%,${l}%)`;
}

/* this is probably the trickiest function
need to be able to take in a string value that contains the style like this:
"background-color: hsl(200,50%,4%)"
i then need to yank out the 4 and replace it with a value that is 4 - 10 (min 0)
i need to find index of second comma (","). then i need to find the index of the end parenthesis ")"
use String.substring(comma index, parenthesis index)
modify the return value to be - 10
and then use String.slice to add that value back at the comma index and String.slice to add the value back at the parenthesis index
*/
function darkerHSL(styleAttribute) {
    let color = styleAttribute;
    let firstIndex = styleAttribute.indexOf(",") + 1;
    let secondIndex = firstIndex + styleAttribute.slice(firstIndex).indexOf(",") + 1;
    let thirdIndex = secondIndex + styleAttribute.slice(secondIndex).indexOf("%");
    return styleAttribute.slice(0, secondIndex) + Math.max(styleAttribute.slice(secondIndex, thirdIndex) - 10, 0) + styleAttribute.slice(thirdIndex);
}

function randomBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}