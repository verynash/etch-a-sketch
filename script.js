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

inputColor.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
blackBtn.onclick = () => setCurrentMode('black');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
grayscaleBtn.onclick = () => setCurrentMode('grayscale');
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
        gridSquare.addEventListener('mouseover', changeColor);
        gridSquare.addEventListener('mousedown', changeColor);
        drawWall.appendChild(gridSquare);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'black') {
        e.target.style.backgroundColor = '#070D0D';
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 255);
        const randomG = Math.floor(Math.random() * 255);
        const randomB = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${randomR} ${randomG} ${randomB})`;
    } else if (currentMode === 'grayscale') {
        const randomGray = Math.floor(Math.random() * 255);
        e.target.style.backgroundColor = `rgb(${randomGray} ${randomGray} ${randomGray})`;
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'rgb(240 255 240)';
    }
}

function activateButton(newMode) {
    if (currentMode === 'color') {
        colorBtn.classList.remove('active');
    } else if (currentMode === 'black') {
        blackBtn.classList.remove('active');
    } else if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (currentMode === 'grayscale') {
        grayscaleBtn.classList.remove('active');
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'black') {
        blackBtn.classList.add('active');
    } else if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'grayscale') {
        grayscaleBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }


}


window.onload = () => {
    makeGrid(DEFAULT_SIZE);
    activateButton(DEFAULT_MODE);
}