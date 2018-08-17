import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, syncGame, updatePosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import './GameDetails.css'
import BoardWrapper from './board/BoardWrapper'

class GameDetails extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  onKeyDown = (key, player, game) => {
    const lastKnownPlayerCoordinates = game[`coordinates_p${player}`]
    let updatedPlayerCoordinates = {...lastKnownPlayerCoordinates}
    const p_num = `p${player}`
    const otherPlayerCoordinates = player === 1 ? game.coordinates_p2 : game.coordinates_p1
    const bumpPlayer = (updatedPlayerCoordinates) => updatedPlayerCoordinates.Y === otherPlayerCoordinates.Y && updatedPlayerCoordinates.X === otherPlayerCoordinates.X
    const updatePosition = (coordinates, direction) => this.props.updatePosition(p_num, coordinates, game.id, direction)
    switch (key) {
      case 'ArrowLeft':
        updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X - 1 < 0 ? 15 : lastKnownPlayerCoordinates.X - 1
        if (bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowRight':
        updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X + 1 > 15 ? 0 : lastKnownPlayerCoordinates.X + 1
        if (bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowUp':
        updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y - 1 < 0 ? 9 : lastKnownPlayerCoordinates.Y - 1
        if (bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'ArrowDown':
        updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y + 1 > 9 ? 0 : lastKnownPlayerCoordinates.Y + 1
        if (bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
        return updatePosition(updatedPlayerCoordinates)
      case 'w':
        return updatePosition(updatedPlayerCoordinates, 'up')
      case 'a':
        return updatePosition(updatedPlayerCoordinates, 'left')
      case 's':
        return updatePosition(updatedPlayerCoordinates, 'down')
      case 'd':
        return updatePosition(updatedPlayerCoordinates, 'right')
      default:
        return updatedPlayerCoordinates
    }
  }



  render() {
    // this.props.syncGame()
    const {game, users, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player = game.players.find(p => p.userId === userId)

    return (<div className="GameDetail-div"  tabIndex="0">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player &&
        <div>You're Player {player.player}!</div>
      }


      <hr />

      {
        game.status === 'pending' &&
        <div className={'GameDetail-div-pending'}>
          {game.players.map(p => p.userId === userId) ?  <div className={'GameDetail-div-waiting'}><h2>Waiting for Player 2...</h2></div> : <button onClick={this.joinGame}>Join Game</button>}
        </div>
      }

      {
        game.status === 'started' &&
        <BoardWrapper
          player={player.player}
          coordinates_p1={game.coordinates_p1}
          coordinates_p2={game.coordinates_p2}
          beam_p1 = {game.beam_p1}
          beam_p2 = {game.beam_p2}
          onKeyDown={this.onKeyDown}
          game={game}/>
      }

      {
        game.status === 'finished' &&
        <div className={'GameDetail-div-result'}>
          {parseInt(game.winner) === player.player ? <h1>Game Over... Winner!</h1> : <h1>Game Over... Loser!</h1>}
        </div>
      }
    </div>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, syncGame, updatePosition
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
