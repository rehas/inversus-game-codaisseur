import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, syncGame, updatePosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import './GameDetails.css'
import BoardWrapper from './board/BoardWrapper'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  onKeyPress = (key, player, game) => {
    const currentPlayerCoordinates = game[`coordinates_p${player}`]
    let updatedPlayerCoordinates = {...currentPlayerCoordinates}
    const p_num = `p${player}`
    const otherPlayerCoordinates = player ===1 ? this.props.game.coordinates_p2 : this.props.game.coordinates_p1
    const bumpPlayer = (updatedPlayerCoordinates) => updatedPlayerCoordinates.Y === otherPlayerCoordinates.Y && updatedPlayerCoordinates.X === otherPlayerCoordinates.X
    const updatePosition = (direction) => this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id, direction)
    switch (key) {
      case 'ArrowLeft':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X -1 < 0 ? 15 : currentPlayerCoordinates.X -1
        if(bumpPlayer(updatedPlayerCoordinates)) return
        return updatePosition(undefined)
      case 'ArrowRight':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X + 1 > 15 ? 0 : currentPlayerCoordinates.X +1
        if(bumpPlayer(updatedPlayerCoordinates)) return
        return updatePosition(undefined)
      case 'ArrowUp':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y -1 < 0 ? 9 : currentPlayerCoordinates.Y -1
        if(bumpPlayer(updatedPlayerCoordinates)) return
        return updatePosition(undefined)
      case 'ArrowDown':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y +1 > 9 ? 0 :  currentPlayerCoordinates.Y +1
        if(bumpPlayer(updatedPlayerCoordinates)) return
        return updatePosition(undefined)
      case 'w':
        return updatePosition('up')
      case 'a':
        return updatePosition('left')
      case 's':
        return updatePosition('down')
      case 'd':
        return updatePosition('right')
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
    const winner = game.players
      .filter(p => p.symbol === game.winner)
      .map(p => p.userId)[0]

    return (<div className="GameDetail-div"  tabIndex="0">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player &&
        <div>You're Player {player.player}!</div>
      }

      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName} </p>
      }

      <hr />

      {
        game.status === 'started' &&
        <BoardWrapper
          playerNumber={player.player}
          coordinates_p1={game.coordinates_p1}
          coordinates_p2={game.coordinates_p2}
          beam_p1 = {game.beam_p1}
          beam_p2 = {game.beam_p2}
          onKeyPress={this.onKeyPress}
          game={game}/>
      }

      { game.status === 'finished' &&
      <div> Player {game.winner} won! </div>}
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
