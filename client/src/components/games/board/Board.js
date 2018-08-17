import React from 'react'
import './Board.css'
import Row from './Row'

export default ({coordinates_p1, coordinates_p2, player, beam_p1, beam_p2}) => {

  return (
    <div className='board' >
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={0} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={1} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={2} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={3} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={4} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={5} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={6} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={7} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={8} />
      <Row player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={9} />
    </div>
    )
}
