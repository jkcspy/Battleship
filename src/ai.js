const ai = {
  moveList: [],

  checkMove: (x,y) => {
    return ai.moveList.every( i => (i.x !== x) || (i.y !== y))
  },

  computerTurn: () => {
    const validMoveFound = false

    while(!validMoveFound) {
      const x = Math.round(Math.random()*10)
      const y = Math.round(Math.random()*10)

      if(ai.checkMove(x,y)) {
        ai.validMoveFound = true
        return { x, y }
      }
    }
  }
}

export default ai