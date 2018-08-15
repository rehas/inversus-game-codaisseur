import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, syncGame, updatePosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Board from './board/Board'
import './GameDetails.css'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  onKeyPressed = (key, player, game) => {
    const currentPlayerCoordinates = game[`coordinates_p${player.player}`]
    let updatedPlayerCoordinates = {...currentPlayerCoordinates}
    const p_num = `p${player.player}`
    console.log(key)
    switch (key) {
      case 'ArrowLeft':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X -1
        updatedPlayerCoordinates.X < 0 ? updatedPlayerCoordinates.X = 15 : updatedPlayerCoordinates.X
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowUp':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y -1
        updatedPlayerCoordinates.Y < 0 ? updatedPlayerCoordinates.Y = 9 : updatedPlayerCoordinates.Y
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowRight':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X + 1
        updatedPlayerCoordinates.X > 15 ? updatedPlayerCoordinates.X = 0: updatedPlayerCoordinates.X
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowDown':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y +1
        updatedPlayerCoordinates.Y > 9 ? updatedPlayerCoordinates.Y = 0 : updatedPlayerCoordinates.Y
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'w':
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id, 'up')
        break;
      case 'a':
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id, 'left')
        break;
      case 's':
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id, 'down')
        break;
      case 'd':
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id, 'right')
        break;
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

    return (<Paper className="outer-paper" onKeyDown={(e) => this.onKeyPressed(e.key, player, game)} tabIndex="0">
      <h1>Game #{game.id}</h1>

      <p>Status: {game.status}</p>

      {
        game.status === 'started' &&
        player &&
        <div>You're Player {player.player}! coordinates: {game.coordinates_p1.X}</div>
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
        game.status !== 'pending' &&
        <Board board={game.board} playerNumber={player.player} coordinates_p1={game.coordinates_p1} coordinates_p2={game.coordinates_p2}/>
      }
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, syncGame, updatePosition
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
