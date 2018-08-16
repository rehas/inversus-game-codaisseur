import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import {  PlayerNumber } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board) {
    const symbols = [ 1, 2, null ]
    return board.length === 10 &&
      board.every(row =>
        row.length === 16 &&
        row.every(player => symbols.includes(player))
      )
  }
}

export const isValidTransition = (player: PlayerNumber, from, to) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((player, columnIndex) => ({
        from: player,
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1 &&
    changes[0].to === player &&
    changes[0].from === null
}

export const calculateWinner = (board): PlayerNumber | null =>
  board
    .concat(
      // vertical winner
      [0, 1, 2].map(n => board.map(row => row[n])) 
    )
    .concat(
      [
        // diagonal winner ltr
        [0, 1, 2].map(n => board[n][n]),
        // diagonal winner rtl
        [0, 1, 2].map(n => board[2-n][n])
      ] 
    )
    .filter(row => row[0] && row.every(player => player === row[0]))
    .map(row => row[0])[0] || null

export const finished = (board): boolean =>
  board
    .reduce((a,b) => a.concat(b) )
    .every(player => player !== null)
