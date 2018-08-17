import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, syncGame, updatePosition} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {beamFired} from '../../actions/beams'
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

  // onKeyDown = (key, player, game) => {
  //   const lastKnownPlayerCoordinates = game[`coordinates_p${player}`]
  //   let updatedPlayerCoordinates = {...lastKnownPlayerCoordinates}
  //   const p_num = `p${player}`
  //   const otherPlayerCoordinates = player === 1 ? game.coordinates_p2 : game.coordinates_p1
  //   const bumpPlayer = (updatedPlayerCoordinates) => updatedPlayerCoordinates.Y === otherPlayerCoordinates.Y && updatedPlayerCoordinates.X === otherPlayerCoordinates.X
  //   const updatePosition = (coordinates, direction) => this.props.updatePosition(p_num, coordinates, game.id, direction)
  //   switch (key) {
  //     case 'ArrowLeft':
  //       updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X -1 < 0 ? 15 : lastKnownPlayerCoordinates.X -1
  //       if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
  //       return updatePosition(updatedPlayerCoordinates)
  //     case 'ArrowRight':
  //       updatedPlayerCoordinates.X = lastKnownPlayerCoordinates.X + 1 > 15 ? 0 : lastKnownPlayerCoordinates.X +1
  //       if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
  //       return updatePosition(updatedPlayerCoordinates)
  //     case 'ArrowUp':
  //       updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y -1 < 0 ? 9 : lastKnownPlayerCoordinates.Y -1
  //       if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
  //       return updatePosition(updatedPlayerCoordinates)
  //     case 'ArrowDown':
  //       updatedPlayerCoordinates.Y = lastKnownPlayerCoordinates.Y +1 > 9 ? 0 :  lastKnownPlayerCoordinates.Y +1
  //       if(bumpPlayer(updatedPlayerCoordinates)) return updatePosition(lastKnownPlayerCoordinates)
  //       return updatePosition(updatedPlayerCoordinates)
  //     case 'w':
  //       console.log(player)
  //       this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'up', player)
  //       return updatePosition(updatedPlayerCoordinates, 'up')
  //     case 'a':
  //       this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'left', player)
  //       return updatePosition(updatedPlayerCoordinates, 'left')
  //     case 's':
  //       this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'down', player) 
  //       return updatePosition(updatedPlayerCoordinates, 'down')
  //     case 'd':
  //       this.props.beamFired(game.id, lastKnownPlayerCoordinates, 'right', player)
  //       return updatePosition(updatedPlayerCoordinates, 'right')
  //     default:
  //       return updatedPlayerCoordinates
  //   }
  // }



  render() {
    // this.props.syncGame()
    const { users, authenticated, userId} = this.props

    const PLAYERS = this.props.PLAYERS
    const ID = this.props.ID
    const STATUS = this.props.STATUS
    const WINNER = this.props.WINNER

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (ID === null || users === null) return 'Loading...'
    if (!ID) return 'Not found'

    const player = PLAYERS.find(p => p.userId === userId)
    const winner = PLAYERS
      .filter(p => p.symbol === WINNER)
      .map(p => p.userId)[0]

    return (<div className="GameDetail-div"  tabIndex="0">
      <h1>Game #{ID}</h1>

      <p>Status: {STATUS}</p>

      {
        STATUS === 'started' &&
        player &&
        <div>You're Player {player.player}!</div>
      }

      {
        STATUS === 'pending' &&
        PLAYERS.map(p => p.userId).indexOf(userId) === -1 &&
        <button onClick={this.joinGame}>Join Game</button>
      }

      {
        winner &&
        <p>Winner: {users[winner].firstName} </p>
      }

      <hr />

      {
        STATUS === 'started' &&
        <BoardWrapper
          playerNumber={player.player}
          
          // onKeyDown={this.onKeyDown}
          /* game={game} *//>
      }

      { STATUS === 'finished' &&
      <div> Player {WINNER} won! </div>}
    </div>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  // game: state.games && state.games[props.match.params.id],
  PLAYERS:  state.currentGame && state.currentGame.players,
  ID :      state.currentGame && state.currentGame.id, 
  STATUS:   state.currentGame && state.currentGame.status,
  WINNER:   state.currentGame && state.currentGame.winner,
  users: state.users,
  // currentGame : state.currentGame
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, syncGame, updatePosition, beamFired
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)

/* 
coordinates_p1={game.coordinates_p1}
          coordinates_p2={game.coordinates_p2}
          beam_p1 = {game.beam_p1}
          beam_p2 = {game.beam_p2} */