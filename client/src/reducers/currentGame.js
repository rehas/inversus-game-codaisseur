import {SYNC_GAME} from '../actions/games'
const initialState = null

export default function(state=initialState, {type, payload}){
  switch (type) {
    case SYNC_GAME:
      return payload
    
    default:
      return state;
  }
}