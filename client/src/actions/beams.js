export const BEAM_FIRED_P1 = 'BEAM_FIRED_P1'
export const BEAM_FIRED_P2 = 'BEAM_FIRED_P2'

export const beamFired = (gameId, playerCoordinates, beamDirection, playerId) => (dispatch, getState) => {
  return dispatch( {
    type: playerId===1 ? BEAM_FIRED_P1 : BEAM_FIRED_P2,
    payload: getBeamCells(playerCoordinates, beamDirection)
  })
}



const getBeamCells = (playerCoordinates, beamDirection) => {
  const beamArray = []
  switch (beamDirection) {
    case 'left':
      for (let i=0; i < playerCoordinates.X; i++){
         beamArray.push({X: i, Y: playerCoordinates.Y})
      }
      return {beamArray: beamArray, direction: 'left'}
    case 'right':
      for (let i=15; i > playerCoordinates.X; i--){
        beamArray.push({X: i, Y: playerCoordinates.Y})
      }
      return {beamArray: beamArray, direction: 'right'}
    case 'up':
      for (let i=0; i < playerCoordinates.Y; i++){
        beamArray.push({X: playerCoordinates.X, Y: i})
      }
      return {beamArray: beamArray, direction: 'up'}
    case 'down':
      for (let i=9; i > playerCoordinates.Y; i--){
        beamArray.push({X: playerCoordinates.X, Y: i})
      }
      return {beamArray: beamArray, direction: 'down'}
    default:
      return {beamArray: beamArray, direction: 'none'}
  }
}