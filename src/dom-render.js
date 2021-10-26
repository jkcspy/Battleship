const initRenderGrid = () => {
  const gridBoxHtml = document.createElement('div')
  const grids = document.querySelectorAll('.grid')

  grids.forEach(grid => {
    for(let i = 0; i < 100; i++){
      const box = grid.appendChild(gridBoxHtml.cloneNode(true))
      box.setAttribute('data-index', i) // so that DOM grid can be linked to gameBoard array
    }
  })
}

const renderPlayerGrid = (gameBoardObject) => {
  const grid = document.querySelector('.grid-1')
  let count = 0

  gameBoardObject.gameBoard.forEach(item => {
    if(item === 'x'){
      grid.children[count].classList.add('miss')
    }
    if(typeof item === 'object'){
      grid.children[count].classList.add('ship')
      if(item.isHit === true) {
        grid.children[count].classList.add('hit')
      }
    }
    count++
  })
}

const renderOpponentGrid = (gameBoardObject) => {
  const grid = document.querySelector('.grid-2')
  let count = 0

  gameBoardObject.gameBoard.forEach(item => {
    if(item === 'x'){
      grid.children[count].classList.add('miss')
    }
    if(item.isHit === true) {
      grid.children[count].classList.add('hit')
    }
    count++
  })

}

export { initRenderGrid, renderPlayerGrid, renderOpponentGrid }