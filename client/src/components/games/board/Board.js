import React from 'react'
import './Board.css'
import Row from './Cell'

export default ({board, coordinates_p1, coordinates_p2, playerNumber}) => {

  return (
    <div className='board' >
      {board.map((cells, rowIndex) =>
      (<div key={rowIndex} className='board-row'>
        {cells.map((cellIndex) => {
          return <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2}
                      rowIndex={rowIndex} cellIndex={cellIndex}/>})}
      </div>))}
    </div>
    )
}
