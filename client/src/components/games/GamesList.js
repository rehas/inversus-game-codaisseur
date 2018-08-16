import React, {PureComponent} from 'react'
import {getGames, createGame} from '../../actions/games'
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

    return (<div key={game.id} className="game-card">
      <div>
        <p>
          This game is played by&nbsp;
          {
            game.players
              .map(player => users[player.userId].firstName)
              .join(' and ')
          }
        </p>
        <h2>Game #{game.id}</h2>
        <p>
          Status: {game.status}
        </p>
      </div>
        <button onClick={() => history.push(`/games/${game.id}`)}>
          Watch
        </button>
    </div>)
  }

  render() {
    const {games, users, authenticated, createGame} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (<div className="outer-paper">
      <button
        onClick={createGame}
        className="create-game"
      >
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

export default connect(mapStateToProps, {getGames, getUsers, createGame})(GamesList)
