let drawWall = document.getElementById('draw-wall');
console.log(drawWall);





let gridSize = document.getElementById('gridSizeSlider');

function updateSlider(slideAmount) {
    gridSize.value = slideAmount;
}

function deleteGrid() {
    document.getElementById('draw-wall').innerHTML = '';
}

function makeGrid(size) {
    size = gridSize.value;
    for (let r = 0; r < size; r++) {
        let row = document.createElement('div')
        row.className = 'row';
        for (let c = 0; c < size; c++) {
            let column = document.createElement('div');
            column.className = 'column';
            row.appendChild(column)
        }
        document.getElementById('draw-wall').appendChild(row);
    }
}
makeGrid(4);