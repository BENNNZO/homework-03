let gridToggle = true
let squareSize = 100

function gridGenerate() {
    const gridContainer = document.getElementById('grid-container')
    const tempColumns = Math.floor(gridContainer.clientWidth / squareSize)
    const tempRows = Math.floor(gridContainer.clientHeight / squareSize)
    
    gridContainer.style.gridTemplateColumns = `repeat(${tempColumns}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${tempRows}, 1fr)`

    for (let i = 0; i < (tempColumns * tempRows); i++) {
        const gridSquare = document.createElement('div')
        gridContainer.appendChild(gridSquare).classList.add('grid-square')
    }
    
    const squares = gridContainer.children
    
    for (let i = 0; i < squares.length; i++) { // for each square make a mousemove event listener to change the scale depending on the squares distance to the cursor
        const squareBoundingBox = squares[i].getBoundingClientRect()
        const squareX = (squareBoundingBox.left + (squareBoundingBox.width / 2))
        const squareY = (squareBoundingBox.top + (squareBoundingBox.height / 2))

        window.addEventListener('mousemove', e => {
            const distance = Math.hypot((squareX - e.clientX), (squareY - e.clientY))
            let scale = -(distance / 700) + 0.5
            const moveX = (squareX - e.clientX) / 2
            const moveY = (squareY - e.clientY) / 2
            if (scale >= 0) {
                squares[i].style.transform = `scale(${scale}) translateX(${-moveX}px) translateY(${-moveY}px)`
            } else {
                squares[i].style.transform = `scale(0)`
            }   
        })
    }

    window.addEventListener('keypress', e => { // press 'w' to toggle grid
        if (e.key === 'w' && gridToggle === true) {
            document.getElementById('grid-container').style.display = 'none'
            gridToggle = false
        } else {
            document.getElementById('grid-container').style.display = 'grid'
            gridToggle = true
        }
    })
}

window.addEventListener('resize', function() {
    gridGenerate()
})

gridGenerate()