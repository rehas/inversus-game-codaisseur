import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './GamesList.css'
import {userId} from '../../jwt'

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }


  renderGame = (game) => {
    const {users, history, userId} = this.props

    const joinGame = () => {
      this.props.joinGame(game.id)
      goToGame()
    }
    const goToGame = () => {history.push(`/games/${game.id}`)}

    const winnerId = game.players
      .filter(p => p.player === parseInt(game.winner))
      .map(p => p.userId)[0]

    const winnerName = Object.keys(users).map(u=> u.id === parseInt(winnerId))

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
            {game.players.map(p => (p.userId === userId) ? <button onClick={()=> goToGame()} >Return to Game!</button> : <button onClick={() => joinGame()}>I'll be Player 2!</button>)}
          </div>
          )
        }
        {game.status === 'started' &&
        <div>
          <p>Status: In progress</p>
          {game.players.map(p => (p.userId === userId) ? <button onClick={()=> goToGame()} >Return to Game!</button> : null)}
        </div>
          }
        {game.status === 'finished' && <p>Status: Finished <br/> Player {console.log(winnerName)} was the winner! </p>}


          </div>
      </div>
    </div>)
  }

  render() {
    const {games, users, authenticated, createGame, history} = this.props
    const newGame = () => {
      createGame()
      const gameIds = games.map(game => parseInt(game.id))
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
  userId: state.currentUser && userId(state.currentUser.jwt),
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)
