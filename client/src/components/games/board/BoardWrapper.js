import React, {PureComponent} from 'react'
import Board from './Board'

class BoardWrapper extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      down: false,
      keysPressed: [],
      keyInterval: (e) => {
        if(this.state.down) return null
        this.setState({down: true})
        if (!this.state.keysPressed.includes(e.key)) this.setState({...this.state, keysPressed: [...this.state.keysPressed, e.key]})
        setTimeout(() => {
          this.props.onKeyDown(this.state.keysPressed, this.props.player, this.props.game)
          this.setState({...this.state, down: false})
        }, 150)
      },
      onKeyUp: (e) => {
        const newKeysPressed = [...this.state.keysPressed].filter(key => key !== e.key)
        this.setState({down: false, keysPressed: newKeysPressed})
      }
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.state.keyInterval(e)}, false)
    document.addEventListener('keyup', (e) => {this.state.onKeyUp(e)}, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {this.state.keyInterval(e)}, false)
    document.removeEventListener('keyup', (e) => {this.state.onKeyUp(e)}, false)
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
        player={this.props.player}
        coordinates_p1={this.props.coordinates_p1}
        coordinates_p2={this.props.coordinates_p2}
        beam_p1={this.getBeamCells(this.props.coordinates_p1, this.props.beam_p1)}
        beam_p2={this.getBeamCells(this.props.coordinates_p2, this.props.beam_p2)}
      />
    )
  }
}

export default BoardWrapper
