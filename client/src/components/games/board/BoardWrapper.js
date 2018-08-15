import React, {PureComponent} from 'react'
import Board from './Board'

class BoardWrapper extends PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      this.props.onKeyPressed(e.key, this.props.playerNumber, this.props.game)
    })
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) => {}, null)
  }

  render() {
    return (
      <Board board={this.props.board} playerNumber={this.props.playerNumber} coordinates_p1={this.props.coordinates_p1} coordinates_p2={this.props.coordinates_p2}/>
    )
  }
}

export default BoardWrapper
