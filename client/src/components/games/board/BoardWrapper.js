import React, {PureComponent} from 'react'
import Board from './Board'

class BoardWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      down: false,
      keyInterval: (e) => {
        if(this.state.down) return null
        this.setState({down: true})
        setTimeout(() => {
          this.props.onKeyPress(e.key, this.props.playerNumber, this.props.game)
          this.setState({down: false})
        }, 150)
        // this.props.onKeyPress(e.key, this.props.playerNumber, this.props.game)

      }
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.state.keyInterval(e)}, false)
    document.addEventListener('keyup', () => {this.setState({down: false})}, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {this.state.keyInterval(e)}, false)
    document.removeEventListener('keyup', () => {this.setState({down: false})}, false)
  }

  getBeamCells  (playerCoordinates, beamDirection)  {
    const beamArray = []
    switch (beamDirection) {
      case 'left':
        for (let i=0; i < playerCoordinates.X; i++){
           beamArray.push({X: i, Y: playerCoordinates.Y})
        }
        return {beamArray: beamArray, direction: 'left'}
      case 'right':
        for (let i=15; i > playerCoordinates.X; i--){
          beamArray.push({X: i, Y: playerCoordinates.Y})
        }
        return {beamArray: beamArray, direction: 'right'}
      case 'up':
        for (let i=0; i < playerCoordinates.Y; i++){
          beamArray.push({X: playerCoordinates.X, Y: i})
        }
        return {beamArray: beamArray, direction: 'up'}
      case 'down':
        for (let i=9; i > playerCoordinates.Y; i--){
          beamArray.push({X: playerCoordinates.X, Y: i})
        }
        return {beamArray: beamArray, direction: 'down'}
      default:
        return {beamArray: beamArray, direction: 'none'}
    }
  }

  render() {
    return (
      <Board
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
