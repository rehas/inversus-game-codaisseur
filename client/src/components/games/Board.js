import React from 'react'
import './Board.css'

const renderCel = (rowIndex, cellIndex, symbol, hasTurn) => {
  return (
    <div
      className="board-tile"
      disabled={hasTurn}
      key={`${rowIndex}-${cellIndex}`}
    > </div>
  )
}

export default ({board}) => {
  return (
    <div className='board' >
      {board.map((cells, rowIndex) =>
      (<div key={rowIndex} className='board-row'>
        {cells.map((symbol, cellIndex) => renderCel(rowIndex, cellIndex,symbol,false))}
      </div>))}
    </div>)
}
