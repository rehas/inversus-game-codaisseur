import React, {PureComponent} from 'react'
import Board from './Board'

class BoardWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      handleKeyPress: (e) => this.props.onKeyPressed(e.key, this.props.playerNumber, this.props.game)
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.state.handleKeyPress(e)}, true)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {this.state.handleKeyPress(e)}, true)
  }

  getBeamCells  (playerCoordinates, beamDirection)  {
    const beamArray = []
    switch (beamDirection) {
      case 'left':
        for (let i=0; i < playerCoordinates.X; i++){
           beamArray.push({X: i, Y: playerCoordinates.Y})
        }
        return beamArray
      case 'right':
        for (let i=15; i > playerCoordinates.X; i--){
          beamArray.push({X: i, Y: playerCoordinates.Y})
        }
        return beamArray
      case 'up':
        for (let i=0; i < playerCoordinates.Y; i++){
          beamArray.push({X: playerCoordinates.X, Y: i})
        }
        return beamArray
      case 'down':
        for (let i=9; i > playerCoordinates.Y; i--){
          beamArray.push({X: playerCoordinates.X, Y: i})
        }
        return beamArray
      default:
        return beamArray
    }
  /* get the beam direction
  if left get current current player's X position and from X -> 0 make an array of each cell and Y for row
  Then we're going to pass this down to cell component where we do an includes method on the array and then we will use a class to colour it in
   */
  }

  render() {
    {console.log(this.getBeamCells(this.props.coordinates_p1, this.props.beam_p1))}
    return (
      <Board
        board={this.props.board}
        playerNumber={this.props.playerNumber}
        coordinates_p1={this.props.coordinates_p1}
        coordinates_p2={this.props.coordinates_p2}
        beam_p1={this.getBeamCells(this.props.coordinates_p1, this.props.beam_p1)}
        beam_p2={this.getBeamCells(this.props.coordinates_p2, this.props.beam_p2)}
      />
    )
  }
}

export default BoardWrapper
