const ai = {
   moveList : [],
   computerTurn: () => {
     return {
      x: Math.random()*10,
      y: Math.random()*10
    }
   }
}

export default ai