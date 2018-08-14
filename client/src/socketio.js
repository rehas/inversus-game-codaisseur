import io from 'socket.io-client'
import {baseUrl} from './constants'
import {syncGame, SYNC_GAME} from './actions/games'

export default class SocketIO {
  socket = null

  connect(dispatch, jwt) {
    console.log('Connecting websocket')
    this.socket = io.connect(baseUrl, {
      query: `auth_token=${jwt}`
    });
    this.socket.on('action', payload => dispatch(payload))
    this.socket.on('syncGame', data=> {
      console.log("SyncGame emission recieved")
      return dispatch(syncGame(data))
    })
  }

  disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }
}