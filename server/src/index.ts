import 'reflect-metadata'
import { Action, BadRequestError, useKoaServer } from 'routing-controllers'
import setupDb from './db'
import UserController from './users/controller'
import LoginController from './logins/controller'
import GameController from './games/controller'
import { verify } from './jwt'
import User from './users/entity'
import * as Koa from 'koa'
import {Server} from 'http'
import * as IO from 'socket.io'
import * as socketIoJwtAuth from 'socketio-jwt-auth'
import {secret} from './jwt'
import { Player, Game } from './games/entities';

const app = new Koa()
const server = new Server(app.callback())
export const io = IO(server)
const port = process.env.PORT || 4000

useKoaServer(app, {
  cors: true,
  controllers: [
    UserController,
    LoginController,
    GameController
  ],
  authorizationChecker: (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')

      try {
        return !!(token && verify(token))
      }
      catch (e) {
        throw new BadRequestError(e)
      }
    }

    return false
  },
  currentUserChecker: async (action: Action) => {
    const header: string = action.request.headers.authorization
    if (header && header.startsWith('Bearer ')) {
      const [ , token ] = header.split(' ')
      
      if (token) {
        const {id} = verify(token)
        return User.findOneById(id)
      }
    }
    return undefined
  }
})

io.use(socketIoJwtAuth.authenticate({ secret }, async (payload, done) => {
  const user = await User.findOneById(payload.id)
  if (user) done(null, user)
  else done(null, false, `Invalid JWT user ID`)
}))

io.on('connect',  async socket => {
  const name = socket.request.user.firstName
  console.log(`game id`)
  
  console.log(`User ${name} just connected`)
  
  let gameId = 0;
  let game: {} | undefined

  setInterval(async function(){
    console.log("Gane id", gameId)
    if (gameId === 0){
      console.log("finding game")
      gameId = parseInt( socket.request.headers.referer.slice(-1))
      game = await Game.findOneById(gameId)
      // console.log(game)
    }
    // console.log(socket.request.headers.referer.slice(-1));
    // console.log("emitted sync", socket.request.user)
    // console.log(game)
    socket.broadcast.emit('syncGame', {name:'hello', gameUpdate: game})
  }, 500)

  socket.on('disconnect', () => {
    console.log(`User ${name} just disconnected`)
    clearInterval()
  })

})

setupDb()
  .then(_ => {
    server.listen(port)
    console.log(`Listening on port ${port}`)
  })
  .catch(err => console.error(err))
