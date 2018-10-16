
import React, {PureComponent, Component} from 'react'
import Board from './Board'
import connect from 'react-redux/lib/connect/connect';
import {getGames, joinGame, syncGame, updatePosition} from '../../../actions/games'
import {getUsers} from '../../../actions/users'
import {beamFired} from '../../../actions/beams'



class BoardListener extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     down: false,
  //     keyInterval: (e) => {
  //       if(this.state.down) return null
  //       this.setState({down: true})
  //       setTimeout(() => {
  //         this.props.onKeyDown(e.key, this.props.playerNumber, this.props.currentGame)
  //         this.setState({down: false})
  //       }, 150)
  //       // this.props.onKeyDown(e.key, this.props.playerNumber, this.props.game)

  //     }
  //   }
  // }

  onKeyDown = (key, player, game) => {
    console.log("player")
    console.log(player)
    const lastKnownPlayerCoordinates = game[`coordinates_p${player}`]
    let updatedPlayerCoordinates = {...lastKnownPlayerCoordinates}
    console.log(updatedPlayerCoordinates)
    const p_num = `p${player}`
    const otherPlayerCoordinates = player === 1 ? game.coordinates_p2 : game.coordinates_p1
    const bumpPlayer = (updatedPlayerCoordinates) => updatedPlayerCoordinates.Y === otherPlayerCoordinates.Y && updatedPlayerCoordinates.X === otherPlayerCoordinates.X
    const updatePosition = (coordinates, direction) => this.props.updatePosition(p_num, coordinates, game.id, direction)
    switch (key) {
      case 'ArrowLeft':
        updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X -1 < 0 ? 15 : lastKnownPlayerCoordinates.X -1
        if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowRight':
        updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X + 1 > 15 ? 0 : lastKnownPlayerCoordinates.X +1
        if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowUp':
        updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y -1 < 0 ? 9 : lastKnownPlayerCoordinates.Y -1
        if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowDown':
        updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y +1 > 9 ? 0 :  lastKnownPlayerCoordinates.Y +1
        if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'w':
        console.log(player)
        this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'up', player)
        return updatePosition(updatedPlayerCoordinates, 'up')
      case 'a':
        this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'left', player)
        return updatePosition(updatedPlayerCoordinates, 'left')
      case 's':
        this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'down', player) 
        return updatePosition(updatedPlayerCoordinates, 'down')
      case 'd':
        this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'right', player)
        return updatePosition(updatedPlayerCoordinates, 'right')
      default:
        return updatedPlayerCoordinates
    }
  }

  shouldComponentUpdate(){
    return false
  }



  componentDidMount() {
    document.addEventListener('keydown', (e) => {this.onKeyDown(e.key, this.props.playerNumber, this.props.game)}, false)
    // document.addEventListener('keyup', () => {this.setState({down: false})}, false)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {this.onKeyDown(e.key, this.props.playerNumber, this.props.game)}, false)
    // document.removeEventListener('keyup', () => {this.setState({down: false})}, false)
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
    console.log("BoardListener Props")
    console.log(this.props)  
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state)
  return {
     currentGame : state.currentGame,
     game: state.games && state.games[props.id],
  } 

}

const mapDispatchToProps = {
  getGames, getUsers, joinGame, syncGame, updatePosition, beamFired
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardListener)

/* 
coordinates_p1={this.props.coordinates_p1}
        coordinates_p2={this.props.coordinates_p2}
        beam_p1={this.getBeamCells(this.props.coordinates_p1, this.props.beam_p1)}
        beam_p2={this.getBeamCells(this.props.coordinates_p2, this.props.beam_p2)} */