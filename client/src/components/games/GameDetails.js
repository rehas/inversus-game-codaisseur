import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, syncGame, updatePosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import './GameDetails.css'
import BoardWrapper from './board/BoardWrapper'
import Typography from '../../../node_modules/material-ui/Typography/Typography'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  onKeyPressed = (key, player, game) => {
    const currentPlayerCoordinates = game[`coordinates_p${player}`]
    let updatedPlayerCoordinates = {...currentPlayerCoordinates}
    const p_num = `p${player}`
    switch (key) {
      case 'ArrowLeft':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X -1 < 0 ? 15 : currentPlayerCoordinates.X -1
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowUp':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y -1 < 0 ? 9 : currentPlayerCoordinates.Y -1
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowRight':
        updatedPlayerCoordinates.X = currentPlayerCoordinates.X + 1 > 15 ? 0 : currentPlayerCoordinates.X +1
        this.props.updatePosition(p_num, updatedPlayerCoordinates, game.id)
        break;
      case 'ArrowDown':
        updatedPlayerCoordinates.Y = currentPlayerCoordinates.Y +1 > 9 ? 0 :  currentPlayerCoordinates.Y +1
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

    return (<div className="GameDetail-div"  tabIndex="0">
      <Typography>
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
        game.status !== 'pending' &&
        <BoardWrapper board={game.board} playerNumber={player.player} coordinates_p1={game.coordinates_p1} coordinates_p2={game.coordinates_p2} onKeyPressed={this.onKeyPressed} game={game}/>
      }
      </Typography>
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
  getGames, getUsers, joinGame, updateGame, syncGame, updatePosition
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
