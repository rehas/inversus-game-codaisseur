import io from 'socket.io-client'
import {baseUrl} from './constants'
import {syncGame} from './actions/games'

export default class SocketIO {
  socket = null

  connect(dispatch, jwt) {
    console.log('Connecting websocket')
    this.socket = io.connect(baseUrl, {
      query: `auth_token=${jwt}`
    });
    this.socket.on('action', payload => {
      return  dispatch(payload)
    })
    this.socket.on('syncGame', data=> {
       dispatch(syncGame(data))
    })
  }

  disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }
}
