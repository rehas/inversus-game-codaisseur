import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './GamesList.css'

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }


  renderGame = (game) => {
    const {users, history} = this.props

    const joinGame = () => {
      this.props.joinGame(game.id)
      history.push(`/games/${game.id}`)
    }

    return (<div key={game.id} className="game-card">
      <div>
        <h2>Game #{game.id}</h2>
          <div className={'game-card-pending'}>
            <p>
              This game is being played by: <br/>
              {
                game.players
                  .map(player => users[player.userId].username)
                  .join(' and ')
              }
            </p>
        {game.status === 'pending' && (
          <div>
            <p>Status: Waiting for Player 2...</p>
            <button onClick={joinGame}>I'm Player 2!</button>
          </div>
          )
        }
        {game.status === 'started' && <p>Status: In progress</p>}
        {game.status === 'finished' && <p>Status: Finished <br/> Player {game.winner} was the winner! </p>}


          </div>
      </div>
    </div>)
  }

  render() {
    const {games, users, authenticated, createGame, history} = this.props
    const newGame = () => {
      createGame()
      const gameIds = Object.keys(games).map(gameId => parseInt(gameId))
      const gameId = Math.max(...gameIds)
      history.push(`/games/${gameId}`)
    }
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (<div className="game-list">
      <button onClick={newGame} className={"game-list-create-game-button"}>
        Create Game
      </button>

      <div>
        {games.map(game => this.renderGame(game))}
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)
