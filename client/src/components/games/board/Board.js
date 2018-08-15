import React from 'react'
import './Board.css'

const renderPlayerPosition = (coordinates_p1, coordinates_p2, cellIndex, rowIndex) => {
  if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex) return <div className={'board-tile-player1'}>P1</div>
  else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) return <div className={'board-tile-player2'}>P2</div>
  else return <div className={'board-tile-coordinates'}>X: {cellIndex}, <br/> Y:{rowIndex}</div>
}

const renderCel = (playerNumber, coordinates_p1, coordinates_p2, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <div
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >
      { renderPlayerPosition(coordinates_p1, coordinates_p2, cellIndex, rowIndex) }
      </div>
  )
}

export default ({board, coordinates_p1, coordinates_p2, playerNumber}) => {

  return (
    <div className='board' >
      {board.map((cells, rowIndex) =>
      (<div key={rowIndex} className='board-row'>
        {cells.map((symbol, cellIndex) => renderCel(playerNumber, coordinates_p1, coordinates_p2, rowIndex, cellIndex,symbol,false))}
      </div>))}
    </div>)
}
