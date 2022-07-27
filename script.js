const DEFAULT_SIZE = 4;
const DEFAULT_COLOR = '#5a0468';
const DEFAULT_MODE = 'color';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

const inputColor = document.getElementById('inputColor');
const colorBtn = document.getElementById('penColor');
const blackBtn = document.getElementById('penBlack');
const rainbowBtn = document.getElementById('penRainbow');
const grayscaleBtn = document.getElementById('penGrayscale');
const eraserBtn = document.getElementById('penEraser');
const clearBtn = document.getElementById('wallClear');
const gridSizeSlider = document.getElementById('gridSizeSlider')
const drawWall = document.getElementById('draw-wall');

inputColor.oninput = () => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
blackBtn.onclick = () => setCurrentMode('black');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
grayscaleBtn.onclick = () => setCurrentMode('grayScale');
eraserBtn.onclick = () => setCurrentMode('eraser');
gridSizeSlider.onchange = (e) => changeSize(e.target.value);
clearBtn.onclick = () => refreshGrid();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    refreshGrid();
}

function refreshGrid() {
    clearGrid();
    makeGrid(currentSize);
}

function clearGrid() {
    drawWall.innerHTML = '';
}

function makeGrid(size) {
    drawWall.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawWall.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size*size; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        drawWall.appendChild(gridSquare);
    }
}











window.onload = () => {
    makeGrid(DEFAULT_SIZE);
}