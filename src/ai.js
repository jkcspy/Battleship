const ai = {
  moveList: [],

  clearMoveList: () => {
    ai.moveList.splice(0, ai.moveList.length) // Clears the actual array rather than new array or leaving in memory
  },

  checkMove: (x,y) => {
    return ai.moveList.every( i => (i.x !== x) || (i.y !== y))
  },

  computerTurn: () => { // pushes 2 objects to moveList but why?
    const validMoveFound = false

    while(!validMoveFound) {
      const x = Math.round(Math.random()*10)
      const y = Math.round(Math.random()*10)

      if(ai.checkMove(x,y)) {
        ai.validMoveFound = true
        ai.moveList.push({ x, y })
        return { x, y }
      }
    }
  }
}

export default ai