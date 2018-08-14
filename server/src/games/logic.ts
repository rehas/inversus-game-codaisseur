import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, PlayerNumber, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 1, 2, null ]
    return board.length === 10 &&
      board.every(row =>
        row.length === 16 &&
        row.every(player => symbols.includes(player))
      )
  }
}

export const isValidTransition = (player: PlayerNumber, from: Board, to: Board) => {
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

export const calculateWinner = (board: Board): PlayerNumber | null =>
  board
    .concat(
      // vertical winner
      [0, 1, 2].map(n => board.map(row => row[n])) as Row[]
    )
    .concat(
      [
        // diagonal winner ltr
        [0, 1, 2].map(n => board[n][n]),
        // diagonal winner rtl
        [0, 1, 2].map(n => board[2-n][n])
      ] as Row[]
    )
    .filter(row => row[0] && row.every(player => player === row[0]))
    .map(row => row[0])[0] || null

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Row)
    .every(player => player !== null)
