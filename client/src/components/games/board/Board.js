import React from 'react'
import './Board.css'
import Row from './Row'

export default ({coordinates_p1, coordinates_p2, playerNumber}) => {

  return (
    <div className='board' >
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={0} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={1} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={2} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={3} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={4} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={5} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={6} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={7} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={8} />
      <Row playerNumber={playerNumber} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} rowIndex={9} />
    </div>
    )
}
