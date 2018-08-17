import React from 'react'
import './Board.css'
import Row from './Row'

export default ({coordinates_p1, coordinates_p2, playerNumber, beam_p1, beam_p2}) => {

  return (
    <div className='board' >
      <Row playerNumber={playerNumber}  rowIndex={0} />
      <Row playerNumber={playerNumber}  rowIndex={1} />
      <Row playerNumber={playerNumber}  rowIndex={2} />
      <Row playerNumber={playerNumber}  rowIndex={3} />
      <Row playerNumber={playerNumber}  rowIndex={4} />
      <Row playerNumber={playerNumber}  rowIndex={5} />
      <Row playerNumber={playerNumber}  rowIndex={6} />
      <Row playerNumber={playerNumber}  rowIndex={7} />
      <Row playerNumber={playerNumber}  rowIndex={8} />
      <Row playerNumber={playerNumber}  rowIndex={9} />
    </div>
    )
}

/* 
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2}
coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} */