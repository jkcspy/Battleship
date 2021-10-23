const ai = {
  moveList: [],



  computerTurn : () => {
    const x = Math.round(Math.random()*10)
    const y = Math.round(Math.random()*10)

    return { x, y }
  }


}

export default ai