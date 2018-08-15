import { 
  JsonController, Authorized, CurrentUser, Post, Param, BadRequestError, HttpCode, NotFoundError, ForbiddenError, Get, 
  Body, Patch
} from 'routing-controllers'
import User from '../users/entity'
import { Game, Player, Board, XYCoordinates } from './entities'
import {IsBoard, isValidTransition, calculateWinner, finished} from './logic'
import { Validate } from 'class-validator'
import {io} from '../index'

class GameUpdate {

  @Validate(IsBoard, {
    message: 'Not a valid board'
  })
  board: Board
  coordinates_p1: XYCoordinates
  coordinates_p2: XYCoordinates
}



@JsonController()
export default class GameController {

  @Authorized()
  @Post('/games')
  @HttpCode(201)
  async createGame(
    @CurrentUser() user: User
  ) {
    const entity = await Game.create().save()

    await Player.create({
      game: entity, 
      user,
      player: 1
    }).save()

    const game = await Game.findOneById(entity.id)

    io.emit('action', {
      type: 'ADD_GAME',
      payload: game
    })

    return game
  }

  @Authorized()
  @Post('/games/:id([0-9]+)/players')
  @HttpCode(201)
  async joinGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new BadRequestError(`Game does not exist`)
    if (game.status !== 'pending') throw new BadRequestError(`Game is already started`)

    game.status = 'started'
    await game.save()

    const player = await Player.create({
      game, 
      user,
      player: 2
    }).save()

    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: await Game.findOneById(game.id)
    })

    return player
  }

  @Authorized()
  // the reason that we're using patch here is because this request is not idempotent
  // http://restcookbook.com/HTTP%20Methods/idempotency/
  // try to fire the same requests twice, see what happens
  @Patch('/games/:id([0-9]+)')
  async updateGame(
    @CurrentUser() user: User,
    @Param('id') gameId: number,
    @Body() update: GameUpdate
  ) {
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)

    const player = await Player.findOne({ user, game })

    if (!player) throw new ForbiddenError(`You are not part of this game`)
    if (game.status !== 'started') throw new BadRequestError(`The game is not started yet`)
    if (!isValidTransition(player.player, game.board, update.board)) {
      throw new BadRequestError(`Invalid move`)
    }    

    const winner = calculateWinner(update.board)
    if (winner) {
      game.winner = winner
      game.status = 'finished'
    }
    else if (finished(update.board)) {
      game.status = 'finished'
    }
    game.board = update.board
    if(game.coordinates_p1) game.coordinates_p1 = update.coordinates_p1
    if(game.coordinates_p2) game.coordinates_p2 = update.coordinates_p2
    await game.save()
    
    io.emit('action', {
      type: 'UPDATE_GAME',
      payload: game
    })

    return game
  }

  @Patch('/coordinates/:id([0-9]+)/')
  async updateCoordinates(
    @Param('id') gameId : number,
    @Body() coordinatesUpdate
  ){
    console.log(coordinatesUpdate)
    console.log("patch request recieved")
    const game = await Game.findOneById(gameId)
    if (!game) throw new NotFoundError(`Game does not exist`)
  
    // cu.coordinatesUpdate {
    //   cu.coordinatesUpdate: { player: 'p1', coordinates: { X: 5, Y: 5 } } }


    if (coordinatesUpdate.player === 'p1'){
      game.coordinates_p1 = coordinatesUpdate.coordinates
    }
    if(coordinatesUpdate.player === 'p1'){
      game.coordinates_p2 = coordinatesUpdate.coordinates
    }

    game.save()
    io.emit('syncGame', game)
    return game
  }

  @Authorized()
  @Get('/games/:id([0-9]+)')
  getGame(
    @Param('id') id: number
  ) {
    return Game.findOneById(id)
  }

  @Authorized()
  @Get('/games')
  getGames() {
    return Game.find()
  }
}

