import React, { PureComponent, Component } from 'react'
import './Board.css'
import connect from 'react-redux/lib/connect/connect';

/* const renderCellVisuals = (coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex) => {
  // console.log(typeof(beam_p1.beamArray), typeof(beam_p2.beamArray))
  console.log(beam_p1, beam_p2)
  if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex){
    return <div className={`board-cell-player1`}></div>
  } else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) {
    return <div className={'board-cell-player2'}></div>
  } else if (beam_p1.beamArray &&  beam_p1.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
    return <div className={`board-cell-laser-1 beam-cell-laser-direction-${beam_p1.direction}`}></div>
  } else if (beam_p2.beamArray && beam_p2.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
    return <div className={`board-cell-laser-2 beam-cell-laser-direction-${beam_p2.direction}`}></div>
  } else return null
} */

class Cell extends Component{

  

  shouldComponentUpdate(nextProps, nextState){
    if([nextProps.game.coordinates_p1.X, nextProps.game.coordinates_p2.X].includes(this.props.cellIndex)){
      return true
    }else if([nextProps.game.coordinates_p1.Y, nextProps.game.coordinates_p2.Y].includes(this.props.rowIndex)){
      return true
    }else if([this.props.game.coordinates_p1.X, this.props.game.coordinates_p2.X].includes(this.props.cellIndex)){
      return true
    }else if([this.props.game.coordinates_p1.Y, this.props.game.coordinates_p2.Y].includes(this.props.rowIndex)){
      return true
    }else{
      return false
    }
  }


  render(){
    const {coordinates_p1, coordinates_p2} = this.props.game
    const beams = this.props.beams
    // console.log(beams)
    const beam_p1 = beams.beam_p1
    const beam_p2 = beams.beam_p2

    const {rowIndex, cellIndex, playerNumber} = this.props
    
    const renderCellVisuals = (coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex) => {
      // console.log(typeof(beam_p1.beamArray), typeof(beam_p2.beamArray))
      // console.log(beam_p1, beam_p2)
      if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex){
        return <div className={`board-cell-player1`}></div>
      } else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) {
        return <div className={'board-cell-player2'}></div>
      } else if (beam_p1.beamArray &&  beam_p1.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
        return <div className={`board-cell-laser-1 beam-cell-laser-direction-${beam_p1.direction}`}></div>
      } else if (beam_p2.beamArray && beam_p2.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
        return <div className={`board-cell-laser-2 beam-cell-laser-direction-${beam_p2.direction}`}></div>
      } else return null
    }

    return (
      <div
      className={`board-cell`}
      key={`${rowIndex}-${cellIndex}`}
      >
      {renderCellVisuals(coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, playerNumber)}
      </div>
    )


  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
     game : state.currentGame,
     beams: state.beams
  } 

}

export default connect(mapStateToProps)(Cell)

// export default ({playerNumber, coordinates_p1, coordinates_p2, beam_p1, beam_p2, rowIndex, cellIndex}) => {
//   return (
//     <div
//       className={`board-cell`}
//       key={`${rowIndex}-${cellIndex}`}
//     >
//       { renderCellVisuals(coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex, playerNumber) }
//     </div>
//   )
// }


// const renderCellVisuals = (coordinates_p1, coordinates_p2, beam_p1, beam_p2, cellIndex, rowIndex) => {
//   // console.log(typeof(beam_p1.beamArray), typeof(beam_p2.beamArray))
//   console.log(beam_p1, beam_p2)
//   if (coordinates_p1.X === cellIndex && coordinates_p1.Y === rowIndex){
//     return <div className={`board-cell-player1`}></div>
//   } else if (coordinates_p2.X === cellIndex && coordinates_p2.Y === rowIndex) {
//     return <div className={'board-cell-player2'}></div>
//   } else if (beam_p1.beamArray &&  beam_p1.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
//     return <div className={`board-cell-laser-1 beam-cell-laser-direction-${beam_p1.direction}`}></div>
//   } else if (beam_p2.beamArray && beam_p2.beamArray.some(beam => beam.X === cellIndex && beam.Y === rowIndex)) {
//     return <div className={`board-cell-laser-2 beam-cell-laser-direction-${beam_p2.direction}`}></div>
//   } else return null
// }