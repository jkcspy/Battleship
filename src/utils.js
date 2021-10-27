const coordinateTranslate = (x, y) => { 
  const arrayIndex = ((y-1)*10) + (x-1)
  return arrayIndex
}

const arrayTranslate = (index) => {
  const adjustedIndex = index+1
  const indexString = adjustedIndex.toString()
  const x = indexString.slice(-1) === '0' ? 10 : parseInt(indexString.slice(-1)) //no
  const y = Math.ceil((adjustedIndex/10)-0.01) //yes

  return { x, y }
}

export { coordinateTranslate, arrayTranslate }