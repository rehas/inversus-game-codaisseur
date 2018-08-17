import React from 'react'
import './Board.css'
import Cell from './Cell'

export default ({player, coordinates_p1, coordinates_p2, beam_p1, beam_p2, rowIndex}) => {

  return (
    <div className={'board-row'}>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={0}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={1}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={2}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={3}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={4}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={5}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={6}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={7}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={8}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={9}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={10}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={11}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={12}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={13}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={14}/>
      <Cell player={player} coordinates_p1={coordinates_p1} coordinates_p2={coordinates_p2} beam_p1={beam_p1} beam_p2={beam_p2} rowIndex={rowIndex} cellIndex={15}/>
    </div>
    )
}
