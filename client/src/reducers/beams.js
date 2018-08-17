import {BEAM_FIRED_P1, BEAM_FIRED_P2} from '../actions/beams'

const initialState = {
  beam_p1: {beamArray:[], direction:null},
  beam_p2: {beamArray:[], direction:null}
}

export default function(state=initialState, {type, payload}){
  switch (type) {
    case BEAM_FIRED_P1:
      return {
        ...state,
        beam_p1 : payload
      }
    case BEAM_FIRED_P2:
      return {
        ...state,
        beam_p2 : payload
      }
    default:
      return state
  }
}