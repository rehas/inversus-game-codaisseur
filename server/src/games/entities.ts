import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Index, OneToMany, ManyToOne } from 'typeorm'
import User from '../users/entity'

export type PlayerNumber = 1 | 2
export type RowValue = PlayerNumber | null
export type Row = [ RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue, RowValue , RowValue , RowValue , RowValue , RowValue , RowValue  ]
export type Board = [ Row, Row, Row, Row, Row, Row, Row, Row, Row, Row]
export type XCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
export type YCoordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type XYCoordinates = { X: XCoordinate,  Y: YCoordinate }

type Status = 'pending' | 'started' | 'finished'

const emptyRow: Row = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
const emptyBoard: Board = [ emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow, emptyRow]
const player1Start: XYCoordinates = {X: 0, Y: 0}
const player2Start: XYCoordinates = {X: 15, Y: 9}

@Entity()
export class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('json', {default: emptyBoard})
  board: Board

  @Column('char', {length:1, nullable: true})
  winner: PlayerNumber

  @Column('text', {default: 'pending'})
  status: Status

  @Column('json', {default: player1Start})
  coordinates_p1: XYCoordinates

  @Column('json', {default: player2Start})
  coordinates_p2: XYCoordinates

  @Column('json', {default: null, nullable: true})
  beam_p1: String

  @Column('json', {default: null, nullable: true})
  beam_p2: {}

  // this is a relation, read more about them here:
  // http://typeorm.io/#/many-to-one-one-to-many-relations
  @OneToMany(_ => Player, player => player.game, {eager:true})
  players: Player[]
}

@Entity()
@Index(['game', 'user', 'player'], {unique:true})
export class Player extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(_ => User, user => user.players)
  user: User

  @ManyToOne(_ => Game, game => game.players)
  game: Game

  @Column()
  userId: number

  @Column()
  player: PlayerNumber
}
