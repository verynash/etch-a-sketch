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

drawWall.addEventListener('dragstart', (e) => {
    e.preventDefault()
})

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

let rgbColors= [];
let tmpR;
let tmpG;
let tmpB;


function convertColor(color) {  
    rgbColors = [];
    ///////////////////////////////////
    // Handle rgb(redValue, greenValue, blueValue) format
    //////////////////////////////////
    if (color[0]=='r')
    {
    // Find the index of the redValue.  Using subscring function to 
    // get rid off "rgb(" and ")" part.  
    // The indexOf function returns the index of the "(" and ")" which we 
    // then use to get inner content.  
    color=color.substring(color.indexOf('(')+1, color.indexOf(')'));
    
    // Notice here that we don't know how many digits are in each value,
    // but we know that every value is separated by a comma.
    // So split the three values using comma as the separator.
    // The split function returns an object.
    rgbColors=color.split(',', 3);

    // Convert redValue to integer
    rgbColors[0]=parseInt(rgbColors[0]);
    // Convert greenValue to integer
    rgbColors[1]=parseInt(rgbColors[1]);
    // Convert blueValue to integer
    rgbColors[2]=parseInt(rgbColors[2]);		
    }

    // Handles hex format
    else if (color.substring(0,1)=="#") {
    rgbColors[0]=color.substring(1, 3);  // redValue
    rgbColors[1]=color.substring(3, 5);  // greenValue
    rgbColors[2]=color.substring(5, 7);  // blueValue
    // parseInt's second parameter is the base (16 for hexidecimal)
    rgbColors[0]=parseInt(rgbColors[0], 16);
    rgbColors[1]=parseInt(rgbColors[1], 16);
    rgbColors[2]=parseInt(rgbColors[2], 16);
    }
    tmpR = rgbColors[0];
    tmpG = rgbColors[1];
    tmpB = rgbColors[2];
    return (rgbColors, tmpR, tmpG, tmpB);
}

function darkenColor() {
    if (tmpR <= 0 && tmpG <=0 && tmpB <=0) {
        return (tmpR, tmpG, tmpB);
    } else {
        tmpR = tmpR - 25;
        tmpG = tmpG - 25;
        tmpB = tmpB - 25;
        return (tmpR, tmpG, tmpB);
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
        if (!e.target.style.backgroundColor) {
            const randomGray = Math.floor(Math.random() * 255);
            e.target.style.backgroundColor = `rgb(${randomGray} ${randomGray} ${randomGray})`;
        } else {
            let rgbTemp = e.target.style.backgroundColor;
            convertColor(rgbTemp);
            darkenColor();
            e.target.style.backgroundColor = `rgb(${tmpR} ${tmpG} ${tmpB})`;
        }
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