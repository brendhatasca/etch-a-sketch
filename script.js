

const gridContainer = document.querySelector('.grid-container')
const body = document.querySelector('body');
const head = document.querySelector('h1');
const clearBtn = document.querySelector('.grid-eraser');
const rainbowBtn = document.querySelector('.rainbow-pencil');
const eraserBtn = document.querySelector('.eraser');
const blackBtn = document.querySelector('.black');
const btns = document.querySelectorAll('.btn');
const colorPickerBtn = document.querySelector('.color-picker');

let currentColor = colorPickerBtn.value;
let defaultSize = 16;

//select slider
const slider = document.getElementById('grid-range');
const sliderContainer = document.getElementById('slide-container');
const gridSizeDisplay = document.getElementById('grid-size-display');

// displays size of the grid
gridSizeDisplay.innerHTML = `${slider.value} x ${slider.value}`;
slider.oninput = function () { 
    gridSizeDisplay.innerHTML = `${this.value} x ${this.value}`;
}

// resizes grid once you drag the ranger
function resizeGrid() {
    clearSquares();    
    makeGrid(slider.value);
}

// makes grid according to slider input
function makeGrid(squaresNumb) {
    gridContainer.style.gridTemplateColumns = `repeat(${squaresNumb}, 1fr)`;
    for (i = 0; i < (squaresNumb ** 2); i++) {
        const square = document.createElement('div');
        square.classList.add('grid-item');
        gridContainer.append(square);
    }
    let gridSquares = gridContainer.querySelectorAll('div');
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', colorGrid));
}



function colorGrid() {
    if (rainbowBtn.className.match('active')) {
        this.style.backgroundColor = getRandomColor();
    } else if (eraserBtn.className.match('active')) {
        this.style.backgroundColor = "#FFFFFF";
    } else if (colorPickerBtn.className.match('active')) {
        this.style.backgroundColor = currentColor;
    }
}

// generates random color
function getRandomColor() {
    let hex = '0123456789ABCDEF';
    let color = '#';
    for (i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearGrid() {
    clearSquares();
    makeGrid(slider.value);
}

function clearSquares() {
    const gridSquares = gridContainer.querySelectorAll('div');
    gridSquares.forEach(gridSquare => gridSquare.remove());
}

btns.forEach(function(btn) {
    //add listener to each btn
    btn.addEventListener('click', function(e) {
        // removes active class from each button
        btns.forEach(function(el) {
            el.classList.remove('active');
        });
        // adds active class to clicked button
        e.target.classList.add('active');
    });
});

function setCurrentColor(newColor){
    currentColor = newColor;
}

// ON PAGE LOAD
resizeGrid(defaultSize);

// listeners
slider.addEventListener('input', resizeGrid);
clearBtn.addEventListener('click', clearGrid);
colorPickerBtn.oninput = (e) => setCurrentColor(e.target.value);