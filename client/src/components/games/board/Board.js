import React from 'react'
import './Board.css'

const renderCel = (playerNumber, currentPlayerCoordinates, rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <div
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    >
      {(currentPlayerCoordinates.X === cellIndex && currentPlayerCoordinates.Y === rowIndex) ? (<div className={'board-tile-player1'}>P{playerNumber}</div>) : (<div className={'board-tile-coordinates'}>X: {cellIndex}, <br/> Y:{rowIndex}</div>) }
      </div>
  )
}

export default ({board, currentPlayerCoordinates, playerNumber}) => {
  return (
    <div className='board' >
      {board.map((cells, rowIndex) =>
      (<div key={rowIndex} className='board-row'>
        {cells.map((symbol, cellIndex) => renderCel(playerNumber, currentPlayerCoordinates, rowIndex, cellIndex,symbol,false))}
      </div>))}
    </div>)
}
