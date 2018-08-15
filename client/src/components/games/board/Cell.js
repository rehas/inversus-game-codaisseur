import React from 'react'
import './Board.css'

const renderCellVisuals = (coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, playerNumber) => {
  console.log(beam_p1.includes({X: 1, Y: 0}))

  if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex){
    return <div className={'board-cell-player1'}></div>
  } else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) {
    return <div className={'board-cell-player2'}></div>
  } else if (beam_p1.includes({X: 1, Y: 0})) {
    // return <div className={`board-cell-laser-${playerNumber}`}></div>
    return console.log("yay!")
  } else return <div className={'board-cell-coordinates'}> </div>
}

export default ({playerNumber, coordinates_p1, coordinates_p2, beam_p1, beam_p2, rowIndex, cellIndex}) => {
  return (
    <div
      className="board-cell"
      key={`${rowIndex}-${cellIndex}`}
    >
      { renderCellVisuals(coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, playerNumber) }
    </div>
  )
}
