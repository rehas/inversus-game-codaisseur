import {ADD_GAME, UPDATE_GAME, UPDATE_GAMES, SYNC_GAME} from '../actions/games'
import {USER_LOGOUT} from '../actions/users'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {
    case USER_LOGOUT:
      return null
    
    case ADD_GAME:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_GAME:
      return {
        ...state,
        [payload.id]: payload
      }
    
    case SYNC_GAME:
    if (payload){
        // const newState = {
        //   ...state,
        // }
        // newState[payload.id] = payload
        return {
          ...state,
          [payload.id] : payload
        }
      }else{
        return state
      }

    case UPDATE_GAMES:
      return payload.reduce((games, game) => {
        games[game.id] = game
        return games
      }, {})

    default:
      return state
  }
}
