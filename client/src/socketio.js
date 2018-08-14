import io from 'socket.io-client'
import {baseUrl} from './constants'

export default class SocketIO {
  socket = null

  connect(dispatch, jwt) {
    console.log('Connecting websocket')
    this.socket = io.connect(baseUrl, {
      query: `auth_token=${jwt}`
    });
    this.socket.on('action', payload => dispatch(payload))
    this.socket.on('syncGame', data=>{
      console.log("Game Synced")
      console.log(data)
      return dispatch({
        type: 'SYNC_GAME',
        payload : data
      })
    })
  }

  disconnect() {
    console.log('Disconnecting websocket')
    this.socket.disconnect()
  }

  sync= () => (dispatch) =>{
    this.socket.on('syncGame', data => {
      console.log("Game Synced")
      return dispatch({
        type: 'SYNC_GAME',
        payload : data.latest
      })
    })
  }
}
