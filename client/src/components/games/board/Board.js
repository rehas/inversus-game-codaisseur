import React from 'react'
import './Board.css'

const renderCel = (playerNumber, coordinates_p1, coordinates_p2, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <div
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >
      {(coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex) ? (<div className={'board-tile-player1'}>P1</div>) : (<div className={'board-tile-coordinates'}>X: {cellIndex}, <br/> Y:{rowIndex}</div>) }
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
