const ai = {
   moveList : [],
   computerTurn: () => {
     const xFloat = Math.random()*10
     const yFloat = Math.random()*10
     return {
      x: Math.round(xFloat),
      y: Math.round(yFloat)
    }
   }
}

export default ai