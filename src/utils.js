const coordinateTranslate = (x, y) => { 
  const arrayIndex = ((y-1)*10) + (x-1)
  return arrayIndex
}

export default coordinateTranslate