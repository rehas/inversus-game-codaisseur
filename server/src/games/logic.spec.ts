import 'mocha'
import { equal } from 'assert'
import { calculateWinner, isValidTransition } from './logic'
import { Board } from './entities'

describe('calculateWinner()', () => {

  it('should work for a horizontal winner', () => {
    const board: Board = [
      ['x', 'x', 'o'],
      ['x', 'x', 'x'],
      [null, 'o', 'o'],
    ]
    equal(calculateWinner(board), 'x')
  })

  it('should work for a vertical winner', () => {
    const board: Board = [
      ['o', 'x', 'o'],
      ['x', 'x', 'o'],
      [null, 'o', 'o'],
    ]
    equal(calculateWinner(board), 'o')
  })

  it('should work for a diagonal winner [rtl]', () => {
    const board: Board = [
      ['o', 'x', 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), 'x')
  })

  it('should work for a diagonal winner [ltr]', () => {
    const board: Board = [
      ['o', null, 'x'],
      [null, 'o', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), 'o')
  })

  it('should work when there is no winner', () => {
    const board: Board = [
      ['o', null, 'x'],
      [null, null, 'o'],
      ['x', 'o', 'o'],
    ]
    equal(calculateWinner(board), null)
  })
})

describe('isValidTransition()', () => {

  it('should allow for a move from x', () => {
    const from: Board = [
      ['o', null, 'x'],
      [null, null, 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('x', from, to), true)
  })

  it('should allow for a move from o', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, 'o'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('o', from, to), true)
  })

  it('should not allow to overwrite', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'x'],
    ]
    equal(isValidTransition('x', from, to), false)
  })

  it('should not allow to do more than 1 change', () => {
    const from: Board = [
      ['o', null, null],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    const to: Board = [
      ['o', 'x', 'x'],
      [null, 'x', 'o'],
      ['x', 'o', 'o'],
    ]
    equal(isValidTransition('x', from, to), false)
  })
})
