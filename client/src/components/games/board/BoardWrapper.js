import React, {PureComponent} from 'react'
import Board from './Board'

class BoardWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      keysPressed: [],
      keydownDirection: false,
      keydownBeam: false,
      keydownEvent: (e) => {this.state.keyInterval(e)},
      keyupEvent: (e) => {this.state.onKeyUp(e)},
      keyInterval: (e) => {
        const beams = ['w','a','s','d']
        const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        if (!this.state.keysPressed.includes(e.key)) this.setState({...this.state, keysPressed: [...this.state.keysPressed, e.key]})
        return this.state.keysPressed.forEach(key => {
          if (directions.includes(key)) {
            if (this.state.keydownDirection) return null
            this.setState({...this.state, keydownDirection: true})
            setTimeout(() => {
              this.props.onKeyDown(key, this.props.player, this.props.game)
              this.setState({...this.state, keydownDirection: false})
            }, 100)
          } else if (beams.includes(key)){
            if (this.state.keydownBeam) return null
            this.setState({...this.state, keydownBeam: true})
            setTimeout(() => {
              this.props.onKeyDown(key, this.props.player, this.props.game)
              this.setState({...this.state, keydownBeam: false})
            }, 1000)
          }
        })
      },
      onKeyUp: (e) => {
        const beams = ['w','a','s','d']
        const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        const newKeysPressed = [...this.state.keysPressed].filter(key => key !== e.key)
        if(beams.includes(e.key)){
          this.setState({...this.state, keydownBeam: false, keysPressed: newKeysPressed})
        } else if(directions.includes(e.key)){
          this.setState({...this.state, keydownDirection: false, keysPressed: newKeysPressed})
        }
      }
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.state.keydownEvent, false)
    document.addEventListener('keyup', this.state.keyupEvent, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.state.keydownEvent, false)
    document.removeEventListener('keyup', this.state.keyupEvent, false)
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
