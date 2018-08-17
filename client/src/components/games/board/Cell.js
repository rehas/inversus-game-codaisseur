import React from 'react'
import './Board.css'

const renderCellVisuals = (coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, player) => {
  if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex){
    return <div className={`board-cell-player1`}></div>
  } else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) {
    return <div className={'board-cell-player2'}></div>
  } else if (beam_p1.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
    return <div className={`board-cell-laser-1 beam-cell-laser-direction-${beam_p1.direction}`}></div>
  } else if (beam_p2.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
    return <div className={`board-cell-laser-2 beam-cell-laser-direction-${beam_p2.direction}`}></div>
  } else return null
}

export default ({player, coordinates_p1, coordinates_p2, beam_p1, beam_p2, rowIndex, cellIndex}) => {
  return (
    <div
      className={`board-cell`}
      key={`${rowIndex}-${cellIndex}`}
    >
      { renderCellVisuals(coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, player) }
    </div>
  )
}
